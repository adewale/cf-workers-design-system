// Validate the built manifest.json and agent-index.json against the JSON
// Schemas this site publishes (schema/*.schema.json). Agents fetch these
// documents and are pointed at the schemas as their contract, so a deploy must
// not ship a document that breaks it. Run after `npm run build`; exits
// non-zero on any violation.
import { existsSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import Ajv2020 from 'ajv/dist/2020.js'

const scriptDir = dirname(fileURLToPath(import.meta.url))
const rootDir = join(scriptDir, '..')
const distDir = join(rootDir, 'dist')
const schemaDir = join(rootDir, 'schema')

const targets = [
  { document: 'manifest.json', schema: 'manifest.schema.json' },
  { document: 'agent-index.json', schema: 'agent-index.schema.json' }
]

const ajv = new Ajv2020({ allErrors: true, strict: true })
let failures = 0

for (const target of targets) {
  const documentPath = join(distDir, target.document)
  if (!existsSync(documentPath)) {
    console.error(`✗ dist/${target.document} is missing. Run \`npm run build\` first.`)
    failures += 1
    continue
  }

  const schema = readJson(join(schemaDir, target.schema))
  const validate = ajv.compile(schema)
  if (validate(readJson(documentPath))) {
    console.log(`✓ dist/${target.document} matches schema/${target.schema}`)
    continue
  }

  failures += 1
  console.error(`✗ dist/${target.document} does not match schema/${target.schema}:`)
  for (const error of validate.errors) {
    console.error(`  ${error.instancePath || '(root)'} ${error.message}`)
  }
}

process.exit(failures === 0 ? 0 : 1)

function readJson(filePath) {
  return JSON.parse(readFileSync(filePath, 'utf8'))
}

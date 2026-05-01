import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDir = join(dirname(fileURLToPath(import.meta.url)), '..')
const filePath = join(rootDir, 'DESIGN.md')

const SPEC_SECTION_ORDER = [
  'Overview',
  'Colors',
  'Typography',
  'Layout',
  'Elevation & Depth',
  'Shapes',
  'Components',
  "Do's and Don'ts",
]

const SECTION_ALIASES = {
  'Brand & Style': 'Overview',
  'Layout & Spacing': 'Layout',
  'Elevation': 'Elevation & Depth',
}

// design.md spec: Color must be #hex in sRGB (3, 6, or 8 hex digits)
const HEX_RE = /^#[0-9a-fA-F]{3}(?:[0-9a-fA-F]{3})?(?:[0-9a-fA-F]{2})?$/
// design.md spec: Dimension must have px, em, or rem suffix
const DIMENSION_RE = /^-?\d+(?:\.\d+)?(?:px|em|rem)$/
const KNOWN_TOKEN_GROUPS = ['colors', 'typography', 'rounded', 'spacing']

let content
try {
  content = readFileSync(filePath, 'utf8')
} catch {
  fail('DESIGN.md not found at project root')
}

const errors = []
const warnings = []

// --- Frontmatter ---

const fmMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---/)
if (!fmMatch) fail('missing or malformed YAML frontmatter (expected --- delimiters)')
const fm = fmMatch[1]

if (!/^name:\s*\S/m.test(fm)) errors.push('frontmatter missing required field: name')

// Extract a top-level YAML block by key (returns the indented body lines as a string)
function extractBlock(yaml, key) {
  const re = new RegExp(`^${key}:\\s*\\n((?:[ \\t]+[^\\n]*\\n?)*)`, 'm')
  const m = yaml.match(re)
  return m ? m[1] : null
}

// Validate color token values — must be valid #hex
const colorsBlock = extractBlock(fm, 'colors')
if (colorsBlock) {
  for (const line of colorsBlock.split('\n')) {
    // Match lines like:   token-name: "#FF4801" or   token-name: '#FF4801'
    const m = line.match(/^\s+[\w-]+:\s*["']?(#[^"'\s]*)["']?/)
    if (!m) continue
    if (!HEX_RE.test(m[1])) {
      errors.push(`colors: \`${m[1]}\` is not a valid hex color (must be #RGB, #RRGGBB, or #RRGGBBAA)`)
    }
  }
}

// Validate rounded and spacing — must be Dimension (px/em/rem) or unitless number
for (const blockName of ['rounded', 'spacing']) {
  const block = extractBlock(fm, blockName)
  if (!block) continue
  for (const line of block.split('\n')) {
    const m = line.match(/^\s+["']?[\w-]+"?:\s*["']?([^"'\s#{}][^"'\s]*)["']?/)
    if (!m) continue
    const val = m[1]
    if (/^-?\d+(?:\.\d+)?$/.test(val)) continue // unitless number, valid for spacing
    if (!DIMENSION_RE.test(val)) {
      errors.push(`${blockName}: \`${val}\` is not a valid dimension (must end in px, em, or rem, or be a unitless number)`)
    }
  }
}

// Validate token references in components — must use dot-path syntax, known root group
const compBlock = extractBlock(fm, 'components')
if (compBlock) {
  for (const [, ref] of compBlock.matchAll(/\{([^}]+)\}/g)) {
    const parts = ref.split('.')
    if (parts.length < 2) {
      warnings.push(`components: token reference \`{${ref}}\` must use dot-path syntax, e.g. {colors.primary}`)
      continue
    }
    if (!KNOWN_TOKEN_GROUPS.includes(parts[0])) {
      warnings.push(`components: token reference \`{${ref}}\` references unknown group \`${parts[0]}\``)
    }
  }
}

// --- Markdown body sections ---

const bodyStart = content.indexOf('---', 3) + 3
const body = content.slice(bodyStart)
const h2s = [...body.matchAll(/^## (.+)$/gm)].map(m => m[1].trim())

// Duplicate section headings are an error per spec
const seen = new Set()
for (const h of h2s) {
  const canonical = SECTION_ALIASES[h] ?? h
  if (seen.has(canonical)) errors.push(`duplicate section heading: ## ${h}`)
  seen.add(canonical)
}

// Sections that appear must follow spec ordering
const specIdx = Object.fromEntries(SPEC_SECTION_ORDER.map((s, i) => [s, i]))
let lastPos = -1
for (const h of h2s) {
  const canonical = SECTION_ALIASES[h] ?? h
  const pos = specIdx[canonical]
  if (pos === undefined) continue // unknown sections are accepted per spec
  if (pos < lastPos) {
    errors.push(`section out of order: ## ${h} (see design.md spec section ordering)`)
  } else {
    lastPos = pos
  }
}

// --- Report ---

for (const w of warnings) console.warn(`[design.md] warning: ${w}`)

if (errors.length) {
  console.error('[design.md] validation failed:')
  for (const e of errors) console.error(`  ${e}`)
  process.exit(1)
}

console.log('[design.md] valid')

function fail(msg) {
  console.error(`[design.md] validation failed: ${msg}`)
  process.exit(1)
}

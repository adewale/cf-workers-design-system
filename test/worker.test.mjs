// Runs the built site through the real Worker (src/worker.js) and the real
// Workers Static Assets layer (_redirects, _headers) in workerd via
// wrangler's unstable_startWorker. Run `npm run build` first.
import { after, before, test } from 'node:test'
import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { existsSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { unstable_startWorker } from 'wrangler'

const rootDir = join(dirname(fileURLToPath(import.meta.url)), '..')
const origin = 'http://design.test'

let worker

before(async () => {
  assert.ok(existsSync(join(rootDir, 'dist', 'manifest.json')), 'dist/ is missing: run `npm run build` first')
  worker = await unstable_startWorker({
    config: join(rootDir, 'wrangler.json'),
    dev: { server: { port: 0 }, inspector: false, persist: false, logLevel: 'none' }
  })
})

after(async () => {
  await worker?.dispose()
})

// Redirects are not followed: an advertised route must answer 200 itself.
async function get(path, headers = {}) {
  const response = await worker.fetch(`${origin}${path}`, { headers, redirect: 'manual' })
  const body = await response.text()
  return { response, body }
}

async function getJson(path) {
  const { response, body } = await get(path)
  assert.equal(response.status, 200, `${path} returned ${response.status}`)
  return JSON.parse(body)
}

test('every route the site advertises to agents is served', async () => {
  const manifest = await getJson('/manifest.json')
  const agentIndex = await getJson('/agent-index.json')
  const examples = await getJson('/examples.json')

  const discoveryPaths = Object.values(manifest.discovery)
    .flatMap(value => (typeof value === 'string' ? [value] : typeof value === 'object' && !Array.isArray(value) ? Object.values(value) : value))
    .filter(value => typeof value === 'string' && value.startsWith('/'))

  const advertised = new Set([
    ...manifest.preferred_entrypoints,
    ...manifest.resources.flatMap(resource => [resource.path, resource.canonical_path].filter(Boolean)),
    ...discoveryPaths,
    ...agentIndex.entries.map(entry => entry.path),
    ...examples.examples.flatMap(example => example.fetch)
  ])

  // Guard against a vacuous pass if the documents are emptied.
  assert.ok(agentIndex.entries.length > 0, 'agent-index.json has no entries')
  assert.ok(manifest.resources.length > 0, 'manifest.json has no resources')

  const missing = []
  for (const path of advertised) {
    const { response } = await get(path)
    if (response.status !== 200) missing.push(`${path} -> ${response.status}`)
  }
  assert.deepEqual(missing, [], `advertised routes not served (checked ${advertised.size})`)
})

test('short routes serve the same bytes as their canonical files', async () => {
  const manifest = await getJson('/manifest.json')
  const aliased = manifest.resources.filter(resource => resource.canonical_path)
  assert.ok(aliased.length > 0)

  for (const { path, canonical_path: canonicalPath } of aliased) {
    const source = readFileSync(join(rootDir, canonicalPath))
    const { body } = await get(path)
    assert.equal(body, source.toString('utf8'), `${path} does not serve ${canonicalPath}`)
  }
})

test('unknown routes return the 404 page', async () => {
  const { response, body } = await get('/no-such-page')
  assert.equal(response.status, 404)
  assert.equal(body, readFileSync(join(rootDir, '404.html'), 'utf8'))
})

test('the root negotiates Markdown for agents that ask for it', async () => {
  const siteMarkdown = readFileSync(join(rootDir, 'site.md'), 'utf8')

  for (const path of ['/', '/index.html']) {
    for (const accept of ['text/markdown', 'text/markdown, text/html;q=0.9', 'TEXT/MARKDOWN']) {
      const { response, body } = await get(path, { Accept: accept })
      assert.equal(response.status, 200)
      assert.equal(body, siteMarkdown, `${path} with Accept: ${accept}`)
      assert.match(response.headers.get('content-type'), /^text\/markdown/)
      assert.equal(response.headers.get('x-agent-markdown'), 'negotiated')
      assert.equal(response.headers.get('content-signal'), 'ai-train=yes, search=yes, ai-input=yes')
      assert.ok(Number(response.headers.get('x-markdown-tokens')) > 0)
      assert.ok(varyIncludes(response, 'Accept'))
    }
  }
})

test('the root serves HTML to browsers and still varies on Accept', async () => {
  const indexHtml = readFileSync(join(rootDir, 'index.html'), 'utf8')

  for (const headers of [{ Accept: 'text/html,application/xhtml+xml' }, {}]) {
    const { response, body } = await get('/', headers)
    assert.equal(response.status, 200)
    assert.equal(body, indexHtml)
    assert.match(response.headers.get('content-type'), /^text\/html/)
    assert.equal(response.headers.get('x-agent-markdown'), null)
    assert.equal(response.headers.get('x-markdown-tokens'), null)
    assert.ok(varyIncludes(response, 'Accept'))
  }
})

test('Markdown is only negotiated at the root', async () => {
  const { response, body } = await get('/tokens.json', { Accept: 'text/markdown' })
  assert.equal(response.status, 200)
  assert.deepEqual(JSON.parse(body), JSON.parse(readFileSync(join(rootDir, 'tokens', 'tokens.json'), 'utf8')))
  assert.equal(response.headers.get('x-agent-markdown'), null)
  assert.ok(!varyIncludes(response, 'Accept'))
})

test('raw Markdown routes carry the content signal without negotiation', async () => {
  const { response } = await get('/skill.md')
  assert.match(response.headers.get('content-type'), /^text\/markdown/)
  assert.equal(response.headers.get('content-signal'), 'ai-train=yes, search=yes, ai-input=yes')
  assert.ok(Number(response.headers.get('x-markdown-tokens')) > 0)
  assert.equal(response.headers.get('x-agent-markdown'), null)

  const head = await worker.fetch(`${origin}/skill.md`, { method: 'HEAD' })
  assert.equal(head.status, 200)
  assert.equal(head.headers.get('content-signal'), 'ai-train=yes, search=yes, ai-input=yes')
})

test('every response links discovery documents on its own origin', async () => {
  for (const path of ['/', '/skill.md', '/no-such-page']) {
    const { response } = await get(path)
    const links = parseLinks(response.headers.get('link'))
    assert.deepEqual(
      links.map(link => link.url).sort(),
      ['/agent-index.json', '/examples.json', '/llms.txt', '/manifest.json', '/site.md'].map(p => `${origin}${p}`).sort()
    )
    for (const link of links) {
      const { response: linked } = await get(new URL(link.url).pathname)
      assert.equal(linked.status, 200, `Link target ${link.url}`)
      assert.equal(linked.headers.get('content-type').split(';')[0], link.type, `Link type for ${link.url}`)
    }
  }
})

test('the agent-skills index digest matches the skill it points to', async () => {
  const index = await getJson('/.well-known/agent-skills/index.json')
  assert.ok(index.skills.length > 0)

  for (const skill of index.skills) {
    const { response, body } = await get(skill.url)
    assert.equal(response.status, 200, skill.url)
    const digest = `sha256:${createHash('sha256').update(body).digest('hex')}`
    assert.equal(skill.digest, digest, `${skill.name} digest does not match ${skill.url}`)
  }
})

function varyIncludes(response, value) {
  return (response.headers.get('vary') || '')
    .split(',')
    .map(part => part.trim().toLowerCase())
    .includes(value.toLowerCase())
}

function parseLinks(header) {
  assert.ok(header, 'missing Link header')
  return header.split(/,\s*(?=<)/).map(part => {
    const url = part.match(/^<([^>]+)>/)[1]
    const type = part.match(/type="([^"]+)"/)?.[1]
    return { url, type }
  })
}

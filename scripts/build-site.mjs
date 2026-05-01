import { cpSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const scriptDir = dirname(fileURLToPath(import.meta.url))
const rootDir = join(scriptDir, '..')
const distDir = join(rootDir, 'dist')

const fileEntries = ['404.html', '_headers', '_redirects', 'index.html', 'llms.txt', 'manifest.json', 'site.md', 'DESIGN.md']
const directoryEntries = ['docs', 'tokens', 'skills', 'schema']

const sourceManifest = JSON.parse(readFileSync(join(rootDir, 'manifest.json'), 'utf8'))
const siteConfig = JSON.parse(readFileSync(join(rootDir, 'site.config.json'), 'utf8'))
const normalizedSiteUrl = normalizeUrl(process.env.SITE_URL || siteConfig.siteUrl || '')

const searchIndexEntries = [
  {
    path: '/site.md',
    title: 'Markdown Site Index',
    kind: 'index',
    summary: 'Markdown landing page with the primary routes, fetch order, and skill installation instructions.',
    keywords: ['markdown', 'index', 'agent', 'site']
  },
  {
    path: '/design.md',
    title: 'DESIGN.md',
    kind: 'design-tokens',
    summary: 'Self-contained design system definition in the design.md format — YAML token frontmatter plus structured brand rationale readable by humans and agents.',
    keywords: ['design.md', 'tokens', 'brand', 'colors', 'typography', 'components', 'interoperable']
  },
  {
    path: '/skill.md',
    title: 'CF Workers Design Skill',
    kind: 'skill',
    summary: 'Primary skill definition for agent consumption and design-rule routing.',
    keywords: ['cloudflare', 'workers', 'design', 'skill', 'agent', 'ui']
  },
  {
    path: '/tokens.json',
    title: 'Design Tokens JSON',
    kind: 'design-tokens',
    summary: 'Machine-friendly colors, typography, spacing, radius, motion, and container values.',
    keywords: ['tokens', 'json', 'colors', 'spacing', 'radius', 'motion']
  },
  {
    path: '/tokens.css',
    title: 'Design Tokens CSS',
    kind: 'design-tokens',
    summary: 'CSS custom properties and minimal utility classes for Cloudflare Workers-style UI.',
    keywords: ['tokens', 'css', 'variables', 'utilities']
  },
  {
    path: '/design-system.md',
    title: 'Design System Reference',
    kind: 'reference',
    summary: 'Brand principles, palette, typography, spacing, motion, and accessibility rules.',
    keywords: ['reference', 'brand', 'typography', 'palette', 'accessibility']
  },
  {
    path: '/components.md',
    title: 'Component Patterns',
    kind: 'reference',
    summary: 'Buttons, cards, inputs, comparison rows, hero patterns, and calculator layout snippets.',
    keywords: ['components', 'buttons', 'cards', 'forms', 'calculator']
  },
  {
    path: '/prompting.md',
    title: 'Prompting Guide',
    kind: 'reference',
    summary: 'Prompt templates and quality checks for generating Cloudflare Workers-style UI.',
    keywords: ['prompting', 'ai', 'instructions', 'templates']
  },
  {
    path: '/templates.md',
    title: 'Page Templates',
    kind: 'reference',
    summary: 'Starting-point structures for landing pages, calculators, docs, configurators, and dashboards.',
    keywords: ['templates', 'landing page', 'docs', 'dashboard', 'configurator']
  },
  {
    path: '/product-pages.md',
    title: 'Product Page Patterns',
    kind: 'reference',
    summary: 'workers.cloudflare.com-style product-page composition rules and section sequencing.',
    keywords: ['product pages', 'workers.cloudflare.com', 'composition', 'sections']
  },
  {
    path: '/examples.json',
    title: 'Task Examples',
    kind: 'examples',
    summary: 'Task-oriented fetch bundles for landing pages, calculators, product pages, docs, and skill installation.',
    keywords: ['examples', 'tasks', 'routing', 'agent']
  },
  {
    path: '/manifest.schema.json',
    title: 'Manifest JSON Schema',
    kind: 'schema',
    summary: 'JSON Schema contract for manifest.json.',
    keywords: ['schema', 'manifest', 'json']
  },
  {
    path: '/agent-index.schema.json',
    title: 'Agent Index JSON Schema',
    kind: 'schema',
    summary: 'JSON Schema contract for agent-index.json.',
    keywords: ['schema', 'agent index', 'json']
  },
  {
    path: '/skill/design-tokens.md',
    title: 'Skill Reference: Design Tokens',
    kind: 'skill-reference',
    summary: 'Condensed token rules for agents using the CF Workers design skill.',
    keywords: ['skill reference', 'tokens', 'agent']
  },
  {
    path: '/skill/components.md',
    title: 'Skill Reference: Components',
    kind: 'skill-reference',
    summary: 'Condensed component rules for agent-driven UI generation.',
    keywords: ['skill reference', 'components', 'agent']
  },
  {
    path: '/skill/prompting-guide.md',
    title: 'Skill Reference: Prompting Guide',
    kind: 'skill-reference',
    summary: 'Short prompting patterns to keep generated UI aligned to the design system.',
    keywords: ['skill reference', 'prompting', 'agent']
  },
  {
    path: '/skill/product-pages.md',
    title: 'Skill Reference: Product Pages',
    kind: 'skill-reference',
    summary: 'Short rules for workers-style product pages and technical landing pages.',
    keywords: ['skill reference', 'product page', 'workers']
  }
]

const taskExamples = [
  {
    id: 'landing-page',
    title: 'Workers-style landing page',
    goal: 'Build a Cloudflare Workers-style marketing landing page with warm cream surfaces, orange CTA accents, and wrapper-based borders.',
    fetch: ['/skill.md', '/tokens.json', '/components.md', '/product-pages.md'],
    recommended_output: 'Responsive landing page implementation',
    notes: ['Use cream surfaces after the hero.', 'Use pill buttons and corner-bracket wrapper details.']
  },
  {
    id: 'pricing-calculator',
    title: 'R2-style pricing calculator',
    goal: 'Build a pricing calculator with a two-column input grid, comparison rows, and practical technical copy.',
    fetch: ['/skill.md', '/tokens.json', '/components.md', '/prompting.md'],
    recommended_output: 'Interactive calculator UI',
    notes: ['Prefer right-aligned numeric inputs.', 'Use restrained motion and direct labels.']
  },
  {
    id: 'product-page',
    title: 'Workers product page',
    goal: 'Build a workers.cloudflare.com-style product page with a benefits strip, explainer sections, and strong CTA.',
    fetch: ['/skill.md', '/tokens.json', '/product-pages.md', '/components.md'],
    recommended_output: 'Product marketing page',
    notes: ['Use one bordered wrapper around the benefits strip.', 'Use section rhythm from parent gaps.']
  },
  {
    id: 'docs-page',
    title: 'Docs or reference page',
    goal: 'Build a documentation-oriented page or technical reference shell in the same visual language.',
    fetch: ['/skill.md', '/tokens.json', '/templates.md', '/components.md'],
    recommended_output: 'Documentation page shell',
    notes: ['Prefer practical labels and a subdued visual hierarchy.', 'Use dashed dividers between sections.']
  },
  {
    id: 'install-skill',
    title: 'Install the skill locally',
    goal: 'Install the design skill into a supported coding agent skill directory.',
    fetch: ['/manifest.json', '/skill.md', '/skill/design-tokens.md', '/skill/components.md', '/skill/prompting-guide.md', '/skill/product-pages.md'],
    recommended_output: 'Local skill installation',
    notes: ['Choose the right TARGET_DIR for Claude Code, OpenCode, or Codex.']
  }
]

const sourceSkillContent = readFileSync(join(rootDir, 'skills', 'cf-workers-design', 'SKILL.md'), 'utf8')
const sourceSkillDigest = `sha256:${createHash('sha256').update(sourceSkillContent).digest('hex')}`

rmSync(distDir, { recursive: true, force: true })
mkdirSync(distDir, { recursive: true })

for (const fileName of fileEntries) {
  cpSync(join(rootDir, fileName), join(distDir, fileName))
}

for (const dirName of directoryEntries) {
  cpSync(join(rootDir, dirName), join(distDir, dirName), { recursive: true })
}

const outputManifest = {
  $schema: normalizedSiteUrl ? `${normalizedSiteUrl}/manifest.schema.json` : '/manifest.schema.json',
  ...sourceManifest,
  site: {
    name: siteConfig.siteName,
    description: siteConfig.siteDescription,
    url: normalizedSiteUrl || null,
    repository_url: siteConfig.repositoryUrl || null,
    custom_domain_configured: Boolean(normalizedSiteUrl)
  },
  discovery: {
    search_index: '/agent-index.json',
    examples: '/examples.json',
    markdown_index: '/site.md',
    markdown_support: {
      published_raw_markdown: true,
      root_negotiation_path: '/',
      accept: 'text/markdown',
      primary_markdown_routes: ['/site.md', '/skill.md', '/design.md', '/components.md', '/prompting.md', '/product-pages.md']
    },
    markdown_negotiation: {
      path: '/',
      accept: 'text/markdown, text/html',
      target: '/site.md'
    },
    link_header_resources: ['/manifest.json', '/llms.txt', '/agent-index.json', '/examples.json', '/site.md'],
    agent_skills_index: '/.well-known/agent-skills/index.json',
    content_signal: 'ai-train=yes, search=yes, ai-input=yes',
    webmanifest: '/site.webmanifest',
    robots: '/robots.txt',
    sitemap: '/sitemap.xml',
    schemas: {
      manifest: '/manifest.schema.json',
      agent_index: '/agent-index.schema.json'
    }
  }
}

writeJsonFile(join(distDir, 'manifest.json'), outputManifest)
writeJsonFile(join(distDir, 'agent-index.json'), {
  $schema: normalizedSiteUrl ? `${normalizedSiteUrl}/agent-index.schema.json` : '/agent-index.schema.json',
  name: siteConfig.siteName,
  generated_at: new Date().toISOString(),
  site_url: normalizedSiteUrl || null,
  entries: searchIndexEntries
})

writeJsonFile(join(distDir, 'examples.json'), {
  name: `${siteConfig.siteName} Examples`,
  generated_at: new Date().toISOString(),
  site_url: normalizedSiteUrl || null,
  examples: taskExamples
})

mkdirSync(join(distDir, '.well-known', 'agent-skills'), { recursive: true })
writeJsonFile(join(distDir, '.well-known', 'agent-skills', 'index.json'), {
  $schema: 'https://schemas.agentskills.io/discovery/0.2.0/schema.json',
  skills: [
    {
      name: 'cf-workers-design',
      type: 'skill-md',
      description:
        'Cloudflare Workers-style design-system skill for landing pages, calculators, docs, and product pages. Use when building warm cream, orange-accented technical UI.',
      url: '/.well-known/agent-skills/cf-workers-design/SKILL.md',
      digest: sourceSkillDigest
    }
  ]
})

writeJsonFile(join(distDir, 'site.webmanifest'), {
  name: siteConfig.siteName,
  short_name: 'CF Workers Design',
  description: siteConfig.siteDescription,
  start_url: '/',
  display: 'standalone',
  background_color: '#FFFBF5',
  theme_color: '#FF4801'
})

writeFileSync(join(distDir, 'robots.txt'), buildRobotsTxt(normalizedSiteUrl), 'utf8')
writeFileSync(join(distDir, 'sitemap.xml'), buildSitemapXml(normalizedSiteUrl, searchIndexEntries), 'utf8')

console.log(`Built static site into ${distDir}`)

function normalizeUrl(value) {
  return String(value).trim().replace(/\/$/, '')
}

function writeJsonFile(filePath, value) {
  writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, 'utf8')
}

function buildRobotsTxt(siteUrl) {
  const lines = [
    'User-agent: *',
    'Allow: /',
    'Content-Signal: ai-train=yes, search=yes, ai-input=yes',
    '',
    'User-agent: GPTBot',
    'Allow: /',
    'Content-Signal: ai-train=yes, search=yes, ai-input=yes',
    '',
    'User-agent: ChatGPT-User',
    'Allow: /',
    'Content-Signal: ai-train=yes, search=yes, ai-input=yes',
    '',
    'User-agent: OAI-SearchBot',
    'Allow: /',
    'Content-Signal: ai-train=yes, search=yes, ai-input=yes',
    '',
    'User-agent: ClaudeBot',
    'Allow: /',
    'Content-Signal: ai-train=yes, search=yes, ai-input=yes',
    '',
    'User-agent: PerplexityBot',
    'Allow: /',
    'Content-Signal: ai-train=yes, search=yes, ai-input=yes',
    '',
    'User-agent: Google-Extended',
    'Allow: /',
    'Content-Signal: ai-train=yes, search=yes, ai-input=yes'
  ]

  if (siteUrl) {
    lines.push('', `Sitemap: ${siteUrl}/sitemap.xml`)
  } else {
    lines.push('', '# Set SITE_URL or site.config.json siteUrl to emit canonical sitemap URLs.')
  }

  return `${lines.join('\n')}\n`
}

function buildSitemapXml(siteUrl, entries) {
  const safeUrls = ['/', '/manifest.json', '/llms.txt', ...entries.map(entry => entry.path)]

  if (!siteUrl) {
    return `<?xml version="1.0" encoding="UTF-8"?>\n<!-- Set SITE_URL or site.config.json siteUrl to generate absolute sitemap URLs. -->\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>\n`
  }

  const uniqueUrls = [...new Set(safeUrls)]
  const body = uniqueUrls
    .map(path => `  <url><loc>${escapeXml(`${siteUrl}${path}`)}</loc></url>`)
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`
}

function escapeXml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

# CF Workers Design System

An agent-first static website for Cloudflare Workers-style design tokens, implementation docs, and a reusable UI skill.

It is designed so both humans and coding agents can consume the same source of truth, but the delivery shape favors agents first: plain files, stable URLs, machine-readable discovery, and minimal crawling.

Derived from the original reference site: `https://cf-workers-design.nireka-96.workers.dev/`

## Why This Exists

Most design-system sites are optimized for humans clicking through navigation. Agents usually have to scrape rendered pages, infer structure, and read too much before they find the one file they actually need.

This project takes the opposite approach:

- humans get a small index page they can browse
- agents get canonical entrypoints like `manifest.json`, `llms.txt`, `agent-index.json`, and `skill.md`
- the core resources are plain `json`, `md`, and `css`
- short aliases reduce fetch overhead and prompt bloat

## What You Get

- Cloudflare Workers-style design tokens in `JSON`, `CSS`, and Tailwind preset form
- compact reference docs for components, prompting, templates, and product-page patterns
- a standalone skill for agent-guided UI generation
- a static site that can be served by Cloudflare Workers Static Assets

## Attribution

This project is derived from the original CF Workers design reference site and its companion markdown resources:

- `https://cf-workers-design.nireka-96.workers.dev/`
- `DESIGN-SYSTEM.md`
- `COMPONENTS.md`
- `PROMPTING.md`
- `TEMPLATES.md`
- `PRODUCT-PAGES.md`
- `SKILLS.md`

## Quick Start

### Local preview

```bash
npm install
npm run dev
```

### Build the static site

```bash
npm install
npm run build
```

### Deploy to Cloudflare Workers Static Assets

```bash
npm install
npm run deploy
```

## How To Use It

### For humans

Open the homepage and use it as a resource index.

Primary routes:

- `/`
- `/site.md`
- `/manifest.json`
- `/llms.txt`
- `/skill.md`
- `/tokens.json`
- `/agent-index.json`
- `/examples.json`

Markdown negotiation is also supported on `/`.

```bash
curl https://cf-workers-design-system.adewale-883.workers.dev/ \
  -H "Accept: text/markdown, text/html"
```

### For agents

Recommended fetch order:

```text
GET /manifest.json
GET /skill.md
GET /agent-index.json
GET /tokens.json
GET /examples.json
```

Then fetch only the task-specific files you need:

- landing page work: `/components.md`, `/product-pages.md`
- calculator/tool work: `/components.md`, `/prompting.md`
- raw token ingestion: `/tokens.json` or `/tokens.css`

Task bundles are also available in `/examples.json`.

## Install The Skill

The deployed skill entrypoint is:

- `https://cf-workers-design-system.adewale-883.workers.dev/skill.md`

Download the skill and references into your agent's skills directory.

```bash
TARGET_DIR="$HOME/.claude/skills/cf-workers-design"
mkdir -p "$TARGET_DIR/references"

curl -fsSL https://cf-workers-design-system.adewale-883.workers.dev/skill.md \
  -o "$TARGET_DIR/SKILL.md"
curl -fsSL https://cf-workers-design-system.adewale-883.workers.dev/skill/design-tokens.md \
  -o "$TARGET_DIR/references/design-tokens.md"
curl -fsSL https://cf-workers-design-system.adewale-883.workers.dev/skill/components.md \
  -o "$TARGET_DIR/references/components.md"
curl -fsSL https://cf-workers-design-system.adewale-883.workers.dev/skill/prompting-guide.md \
  -o "$TARGET_DIR/references/prompting-guide.md"
curl -fsSL https://cf-workers-design-system.adewale-883.workers.dev/skill/product-pages.md \
  -o "$TARGET_DIR/references/product-pages.md"
```

Common target directories:

- Claude Code: `~/.claude/skills/cf-workers-design`
- OpenCode: `~/.config/opencode/skills/cf-workers-design`
- Codex: `~/.codex/skills/cf-workers-design`

## Why This Is Agent-Ready

This project is agent-ready because it gives automated clients a reliable, low-friction way to discover and consume the system.

- `manifest.json` provides a canonical machine-readable index
- `llms.txt` provides a plain-text fetch strategy
- `agent-index.json` gives a small searchable list of resources
- `examples.json` gives task-oriented file bundles for common jobs
- `skill.md` exposes the design skill directly as a first-class artifact
- `tokens.json` gives structured values without requiring code parsing
- `_redirects` creates stable short aliases like `/skill.md` and `/components.md`
- `_headers` enables CORS and predictable cache behavior for direct fetching
- `/` supports markdown negotiation via `Accept: text/markdown`
- the site works without a client-side JavaScript app shell

## Why This Is Agent-First

Agent-ready means agents can use it. Agent-first means the site is shaped around agent needs from the start.

This project is agent-first because:

- the primary entrypoint is `manifest.json`, not the homepage
- discovery is duplicated in both `JSON` and plain text
- a dedicated Markdown index exists at `/site.md`
- the root URL can negotiate to Markdown for agents
- important files are exposed directly instead of being buried behind navigation
- the homepage explains the fetch order instead of only marketing the project
- the deploy output keeps docs, skill files, and tokens as raw files at stable URLs

## Example Resource Map

| Path | Purpose |
| --- | --- |
| `/manifest.json` | Canonical machine-readable discovery file |
| `/llms.txt` | Plain-text instructions for agents |
| `/agent-index.json` | Small searchable resource index |
| `/examples.json` | Task-oriented fetch bundles |
| `/site.md` | Markdown index |
| `/.well-known/agent-skills/index.json` | Agent Skills discovery index |
| `/skill.md` | Main design skill |
| `/tokens.json` | Machine-readable design tokens |
| `/tokens.css` | CSS variables and utilities |
| `/components.md` | Reusable UI patterns |
| `/prompting.md` | Prompting patterns for agent workflows |
| `/product-pages.md` | workers.cloudflare.com-style composition guidance |
| `/manifest.schema.json` | JSON Schema for manifest.json |
| `/agent-index.schema.json` | JSON Schema for agent-index.json |

## Project Structure

```text
design-system/
├── 404.html
├── _headers
├── _redirects
├── index.html
├── llms.txt
├── manifest.json
├── site.config.json
├── docs/
├── skills/
├── tokens/
├── scripts/
│   └── build-site.mjs
├── dist/                    # generated deploy output
├── package.json
└── wrangler.json
```

## Build Output

`npm run build` copies deployable files into `dist/` and generates additional discovery assets:

- `dist/manifest.json`
- `dist/agent-index.json`
- `dist/examples.json`
- `dist/site.md`
- `dist/site.webmanifest`
- `dist/robots.txt`
- `dist/sitemap.xml`

## Design References

- `docs/DESIGN-SYSTEM.md`
- `docs/COMPONENTS.md`
- `docs/PROMPTING.md`
- `docs/TEMPLATES.md`
- `docs/PRODUCT-PAGES.md`

## Skill Files

- `skills/cf-workers-design/SKILL.md`
- `skills/cf-workers-design/references/design-tokens.md`
- `skills/cf-workers-design/references/components.md`
- `skills/cf-workers-design/references/prompting-guide.md`
- `skills/cf-workers-design/references/product-pages.md`

## Configuration

`site.config.json` holds site metadata used during builds.

Current fields:

- `siteName`
- `siteDescription`
- `siteUrl`
- `repositoryUrl`
- `defaultBranch`

You can also provide `SITE_URL` at build time to generate canonical sitemap and manifest metadata.

## Current Status

The local preview is intended to be the main feedback loop while shaping the site. The homepage has been updated to explain the agent-first model directly and to expose the primary machine-consumable routes.

## Contributing

If you change the docs, tokens, or skill files, rebuild the site before deploying:

```bash
npm run build
```

Keep additions agent-friendly:

- prefer plain files over hidden app state
- keep canonical paths stable
- add new resources to `manifest.json` and `agent-index.json` generation where appropriate
- avoid making the homepage the only place where information can be discovered

## License

No license file has been added to this project yet.

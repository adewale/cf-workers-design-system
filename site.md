# CF Workers Design System

Agent-first static site for Cloudflare Workers-style design tokens, docs, and a reusable skill.

Start here:

- `/manifest.json`
- `/skill.md`
- `/agent-index.json`
- `/tokens.json`
- `/examples.json`

You can also request the homepage with markdown negotiation:

```bash
curl https://cf-workers-design-system.adewale-883.workers.dev/ \
  -H "Accept: text/markdown, text/html"
```

## Recommended Agent Fetch Order

```text
GET /manifest.json
GET /skill.md
GET /agent-index.json
GET /tokens.json
GET /examples.json
```

Then fetch only the task-specific files you need.

## Useful Routes

- `/site.md`: markdown index for agents and humans
- `/design-system.md`
- `/components.md`
- `/prompting.md`
- `/product-pages.md`
- `/tokens.css`
- `/manifest.schema.json`
- `/agent-index.schema.json`

## Install The Skill

The skill name is `cf-workers-design`.

This repo is published on GitHub as `adewale/cf-workers-design-system`.

### Direct download

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

Common skill directories:

- Claude Code: `~/.claude/skills/cf-workers-design`
- OpenCode: `~/.config/opencode/skills/cf-workers-design`
- Codex: `~/.codex/skills/cf-workers-design`

### GitHub CLI (`gh skill`)

```bash
gh skill preview adewale/cf-workers-design-system cf-workers-design
gh skill install adewale/cf-workers-design-system cf-workers-design
gh skill install adewale/cf-workers-design-system cf-workers-design --agent claude-code --scope user
```

### `skills.sh` CLI

```bash
npx skills add adewale/cf-workers-design-system
```

## Attribution

Derived from the original reference site:

- `https://cf-workers-design.nireka-96.workers.dev/`

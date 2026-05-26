# Skills

Installable AI agent skills for Flutter and Odoo. Each skill is published as an individual npm package.

## Installation

Install only the skills you need:

### Flutter

```bash
# Clean Architecture design and scaffolding
npm install -g flutter-clean-arch-architect-skill

# Project bootstrap with Clean Architecture, Riverpod, GoRouter, Material 3
npm install -g flutter-init-project-skill

# Material Design 3 UI implementation
npm install -g flutter-material3-uiux-expert-skill

# Riverpod state management expert
npm install -g flutter-riverpod-expert-skill
```

### Odoo

```bash
# Odoo 18 addon creation and extension
npm install -g odoo-modules-creator-skill
```

### Symlink Installation

Use symlinks so updates reflect immediately without reinstalling:

```bash
# Linux/macOS
SKILL_SYMLINK=1 npm install -g flutter-clean-arch-architect-skill

# Windows (PowerShell)
$env:SKILL_SYMLINK="1"; npm install -g flutter-clean-arch-architect-skill
```

> **Note:** Windows symlinks require administrator privileges or Developer Mode. Falls back to copy if symlinks fail.

## Multi-Agent Support

Skills install automatically to detected agent directories:

| Agent | Local Path | Global Path |
|-------|-----------|-------------|
| **OpenCode** | `.opencode/skills/` | `~/.config/opencode/skills/` |
| **Claude Code** | `.claude/skills/` | `~/.claude/skills/` |
| **Codex/Agents** | `.agents/skills/` | `~/.agents/skills/` |

## Usage

After installation, restart your AI agent. Skills are available immediately:

```
> skill flutter-clean-arch-architect
```

Or ask the agent directly:

```
Create a new authentication module using the flutter-clean-arch-architect skill
```

## Included Skills

### Flutter

- **[flutter-clean-arch-architect-skill](https://www.npmjs.com/package/flutter-clean-arch-architect-skill)**
  Design, scaffold, refactor, or audit Flutter code using Clean Architecture with `domain`, `infrastructure`, and `presentation` layers, manual Riverpod dependency injection, and Isar-friendly entities.

- **[flutter-init-project-skill](https://www.npmjs.com/package/flutter-init-project-skill)**
  Bootstrap a Flutter project into a production-ready baseline with Clean Architecture scaffolding, manual Riverpod, GoRouter, Material 3, and reusable bootstrap assets.

- **[flutter-material3-uiux-expert-skill](https://www.npmjs.com/package/flutter-material3-uiux-expert-skill)**
  Design and implement Flutter interfaces using Material Design 3 with token-driven styling, responsive layouts, accessibility constraints, and UI auditing support.

- **[flutter-riverpod-expert-skill](https://www.npmjs.com/package/flutter-riverpod-expert-skill)**
  Modern Riverpod state management, migration from legacy patterns, notifier-based state, dependency injection, rebuild optimization, and advanced features.

### Odoo

- **[odoo-modules-creator-skill](https://www.npmjs.com/package/odoo-modules-creator-skill)**
  Create and extend Odoo 18 addons using the ORM, XML views, manifests, security, controllers, wizards, reports, and modular extension patterns.

## Skill Structure

Each skill follows the standard layout:

```text
skill-name/
├── SKILL.md              # Main skill definition with YAML frontmatter
├── package.json          # npm package configuration
├── agents/               # Agent-specific configurations
│   └── openai.yaml
├── references/           # Detailed reference documentation
│   ├── core/             # Core architecture rules and constraints
│   └── examples/         # Example implementations
├── assets/               # Templates and boilerplate (optional)
└── scripts/              # Helper scripts and installer
```

## Publishing

Each skill is published independently. To publish updates:

```bash
cd flutter-clean-arch-architect
npm version patch
npm publish
```

## License

MIT

---

## ❤️ Support

If you find these skills useful, consider supporting their maintenance:

<div align="center">
  <a href="https://sink.gamas.workers.dev/buymeacoffee" style="margin: 0 15px;">
    <img src="https://raw.githubusercontent.com/LuisGamas/buttons-design/main/buy_me_a_coffe/buy_me_a_coffe_fill.png" width="220" alt="Buy Me a Coffee" />
  </a>
  <a href="https://sink.gamas.workers.dev/paypal-donations" style="margin: 0 15px;">
    <img src="https://raw.githubusercontent.com/LuisGamas/buttons-design/main/paypal/paypal_fill.png" width="220" alt="Donate via PayPal" />
  </a>
  <a href="https://sink.gamas.workers.dev/github-sponsor" style="margin: 0 15px;">
    <img src="https://raw.githubusercontent.com/LuisGamas/buttons-design/main/github_sponsor/github_sponsor_fill.png" width="220" alt="Sponsor on GitHub" />
  </a>
</div>

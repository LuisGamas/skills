# OpenCode Skills: Flutter & Odoo

Installable OpenCode skills for Flutter (Clean Architecture, Riverpod, Material 3, Project Init) and Odoo 18 module creation.

## Installation

### Global Installation (Recommended)

Install once and use across all projects:

```bash
npm install -g opencode-skills-flutter-odoo
```

Skills are automatically installed to your global OpenCode skills directory.

### Symlink Installation

Use symlinks so updates to the package reflect immediately without reinstalling:

```bash
# Linux/macOS
OPENCODE_SKILLS_SYMLINK=1 npm install -g opencode-skills-flutter-odoo

# Windows (PowerShell)
$env:OPENCODE_SKILLS_SYMLINK="1"; npm install -g opencode-skills-flutter-odoo
```

> **Note:** Windows symlinks require administrator privileges or Developer Mode enabled. If symlinks fail, the installer falls back to copying.

### Project-Local Installation

Install skills for a specific project only:

```bash
npm install --save-dev opencode-skills-flutter-odoo
```

## Manual Installation

For more control over where skills are installed:

```bash
# Global (OpenCode only)
npx opencode-skills-install --global

# Global with symlinks
npx opencode-skills-install --global --symlink

# Local project (OpenCode only)
npx opencode-skills-install --local

# Install to all detected agent directories
npx opencode-skills-install --all

# Install to specific agents
npx opencode-skills-install --global --agents opencode,claude

# Install locally to multiple agents
npx opencode-skills-install --local --agents opencode,claude,agents
```

## Multi-Agent Support

Skills are compatible with multiple AI agents. The installer can deploy to:

| Agent | Local Path | Global Path |
|-------|-----------|-------------|
| **OpenCode** | `.opencode/skills/` | `~/.config/opencode/skills/` |
| **Claude Code** | `.claude/skills/` | `~/.claude/skills/` |
| **Codex/Agents** | `.agents/skills/` | `~/.agents/skills/` |

Use `--all` to install to all detected agent directories, or specify with `--agents`:

```bash
# Install to OpenCode and Claude Code globally
npx opencode-skills-install --global --agents opencode,claude

# Install to all detected directories
npx opencode-skills-install --all --symlink
```

## Included Skills

### Flutter

- **`flutter-clean-arch-architect`**
  Design, scaffold, refactor, or audit Flutter code using Clean Architecture with `domain`, `infrastructure`, and `presentation` layers, manual Riverpod dependency injection, and Isar-friendly entities.

- **`flutter-init-project`**
  Bootstrap a Flutter project into a production-ready baseline with Clean Architecture scaffolding, manual Riverpod, GoRouter, Material 3, and reusable bootstrap assets.

- **`flutter-material3-uiux-expert`**
  Design and implement Flutter interfaces using Material Design 3 with token-driven styling, responsive layouts, accessibility constraints, and UI auditing support.

- **`flutter-riverpod-expert`**
  Modern Riverpod state management, migration from legacy patterns, notifier-based state, dependency injection, rebuild optimization, and advanced features.

### Odoo

- **`odoo-modules-creator`**
  Create and extend Odoo 18 addons using the ORM, XML views, manifests, security, controllers, wizards, reports, and modular extension patterns.

## Usage

After installation, restart your AI agent. The skills will be automatically available:

```
/opencode
> skill flutter-clean-arch-architect
```

Or ask the agent to use a skill directly:

```
Create a new authentication module using the flutter-clean-arch-architect skill
```

## CLI Reference

```
npx opencode-skills-install [options]

Options:
  --global          Install to global directories
  --local           Install to current project directory
  --symlink         Use symlinks instead of copying
  --copy            Force copy mode (default)
  --all             Install to all detected agent directories
  --agents <list>   Comma-separated: opencode,claude,agents
  --help            Show help

Examples:
  npx opencode-skills-install --global --symlink
  npx opencode-skills-install --local --agents opencode,claude
  npx opencode-skills-install --all --copy
```

## Repository Structure

Each skill follows the OpenCode skill specification:

```text
skill-name/
├── SKILL.md              # Main skill definition with YAML frontmatter
├── agents/               # Agent-specific configurations
│   └── openai.yaml
├── references/           # Detailed reference documentation
│   ├── core/             # Core architecture rules and constraints
│   └── examples/         # Example implementations
├── assets/               # Templates and boilerplate (optional)
└── scripts/              # Helper scripts (optional)
```

## Design Principles

- Preserve high-signal technical guidance
- Prefer explicit workflows over vague prompting
- Keep architecture and implementation rules enforceable
- Separate core instructions from detailed references
- Keep reusable templates and scripts close to the skill
- Optimize for real execution, not just description

## Publishing to npm

To publish a new version:

```bash
# Update version
npm version patch  # or minor, major

# Publish
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

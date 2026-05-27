<div align="center">

# Skills

[![License](https://img.shields.io/badge/LICENSE-MPL_2.0-blue?style=for-the-badge)](./LICENSE)
[![Flutter](https://img.shields.io/badge/FLUTTER-02569B?style=for-the-badge&logo=flutter&logoColor=white)](https://flutter.dev)
[![Odoo](https://img.shields.io/badge/ODOO_18-714B67?style=for-the-badge&logo=odoo&logoColor=white)](https://www.odoo.com)
[![Skills](https://img.shields.io/badge/SKILLS-5-green?style=for-the-badge)](#available-skills)

Curated AI agent skills for **Flutter** and **Odoo** development. Each skill provides deep domain expertise, architectural patterns, reference documentation, and real-world examples that turn your AI coding agent into a specialized assistant.

</div>

---

## Installation

Install skills directly from this repository using [`npx skills`](https://skills.sh):

### All Skills (Interactive)

Browse and select which skills to install:

```bash
npx skills add https://github.com/LuisGamas/skills
```

### Individual Skill

Install a specific skill by pointing to its directory:

```bash
npx skills add https://github.com/LuisGamas/skills/tree/main/flutter-clean-arch-architect
```

```bash
npx skills add https://github.com/LuisGamas/skills/tree/main/flutter-init-project
```

```bash
npx skills add https://github.com/LuisGamas/skills/tree/main/flutter-material3-uiux-expert
```

```bash
npx skills add https://github.com/LuisGamas/skills/tree/main/flutter-riverpod-expert
```

```bash
npx skills add https://github.com/LuisGamas/skills/tree/main/odoo-modules-creator
```

## Available Skills

### Flutter

| Skill | Description |
|-------|-------------|
| **flutter-clean-arch-architect** | Design, scaffold, refactor, or audit Flutter code using Clean Architecture with `domain`, `infrastructure`, and `presentation` layers, manual Riverpod dependency injection, and Isar-friendly entities. |
| **flutter-init-project** | Bootstrap a Flutter project into a production-ready baseline with Clean Architecture scaffolding, manual Riverpod, GoRouter, Material 3, and reusable bootstrap assets. |
| **flutter-material3-uiux-expert** | Design and implement Flutter interfaces using Material Design 3 with token-driven styling, responsive layouts, accessibility constraints, and UI auditing support. |
| **flutter-riverpod-expert** | Modern Riverpod state management, migration from legacy patterns, notifier-based state, dependency injection, rebuild optimization, and advanced features. |

### Odoo

| Skill | Description |
|-------|-------------|
| **odoo-modules-creator** | Create and extend Odoo 18 addons using the ORM, XML views, manifests, security, controllers, wizards, reports, and modular extension patterns. |

## Usage

After installation, restart your AI agent. Skills are invoked automatically based on context, or you can reference them directly:

```
Create a new authentication module using clean architecture
```

```
Bootstrap a new Flutter project with Riverpod and Material 3
```

```
Create an Odoo 18 module for inventory management
```

## Skill Structure

Each skill follows a standard layout:

```
skill-name/
├── SKILL.md              # Skill definition with YAML frontmatter
├── agents/               # Agent-specific configurations
│   └── openai.yaml
├── references/           # Detailed reference documentation
│   ├── core/             # Architecture rules and constraints
│   └── examples/         # Example implementations
├── assets/               # Templates and boilerplate (optional)
└── scripts/              # Helper scripts (optional)
```

## License

This project is licensed under the [Mozilla Public License 2.0](./LICENSE).

---

<div align="center">

### Support

If you find these skills useful, consider supporting their development:

<a href="https://sink.gamas.workers.dev/buymeacoffee">
  <img src="https://raw.githubusercontent.com/LuisGamas/buttons-design/main/buy_me_a_coffe/buy_me_a_coffe_fill.png" width="220" alt="Buy Me a Coffee" />
</a>
&nbsp;&nbsp;
<a href="https://sink.gamas.workers.dev/paypal-donations">
  <img src="https://raw.githubusercontent.com/LuisGamas/buttons-design/main/paypal/paypal_fill.png" width="220" alt="Donate via PayPal" />
</a>
&nbsp;&nbsp;
<a href="https://sink.gamas.workers.dev/github-sponsor">
  <img src="https://raw.githubusercontent.com/LuisGamas/buttons-design/main/github_sponsor/github_sponsor_fill.png" width="220" alt="Sponsor on GitHub" />
</a>

</div>

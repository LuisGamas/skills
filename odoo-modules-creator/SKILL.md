---
name: odoo-modules-creator
description: Create, extend, scaffold, or review Odoo 18 addons using the official ORM, XML views, manifest files, access control, controllers, wizards, reports, and modular extension patterns. Use when building a new Odoo module, inheriting existing models or views, defining business logic and security, wiring menus and actions, or validating whether an addon follows safe and installable Odoo 18 conventions.
---

# Odoo Modules Creator

Generate Odoo addons that are installable, structured, and anchored in the official Odoo 18 model.

## Skill Profile

- Target platform: Odoo `18.0`
- Python target preserved from previous iteration: `3.10+`
- Database target preserved from previous iteration: PostgreSQL
- Naming conventions preserved from previous iteration:
  - model names: `module_prefix.entity_name`
  - module directories: `snake_case`
  - XML ids: `module_name.record_id`
  - Python filenames: `snake_case.py`
  - view filenames: `model_name_view.xml`
- Language policy: write code, comments, and docs in English
- Skill version preserved from previous iteration: `1.0.0`
- Official source anchors preserved from previous iteration:
  - [General Developer Docs](https://www.odoo.com/documentation/18.0/developer.html)
  - [Server Framework Tutorial](https://www.odoo.com/documentation/18.0/developer/tutorials/server_framework_101.html)
  - [ORM Reference](https://www.odoo.com/documentation/18.0/developer/reference/backend/orm.html)
  - [View Architectures](https://www.odoo.com/documentation/18.0/developer/reference/user_interface/view_architectures.html)

## Required Resource Map

Read these reference files before generating an addon:

1. [`references/core/core-logic.md`](references/core/core-logic.md)
   Use for creation order, module structure, manifest conventions, model patterns, view patterns, wizard/controller/report patterns, and common ORM operations.
2. [`references/core/data-schema.md`](references/core/data-schema.md)
   Use for the formal shapes of manifests, models, fields, access rows, views, actions, menus, routes, and wizards.
3. [`references/core/constraints.md`](references/core/constraints.md)
   Use for security rules, anti-patterns, deprecated patterns, SQL safety, and hallucination prevention.
4. [`references/examples/few-shot-examples.md`](references/examples/few-shot-examples.md)
   Use for end-to-end examples of a new module and a pure `_inherit` extension.

Use this script for structure checks when auditing a generated addon:

- [`scripts/audit_module.py`](scripts/audit_module.py)

## Operating Procedure

1. Analyze the business request.
   Decide whether the work is a new addon, a new model, or an extension of an existing model/view.
2. Determine dependencies.
   List all required Odoo modules up front for the manifest.
3. Plan the addon surface.
   Identify models, views, security files, data files, menus, actions, controllers, wizards, and reports.
4. Generate in the defined order.
   Follow the creation order in [`references/core/core-logic.md`](references/core/core-logic.md).
5. Apply security and manifest validation.
   Ensure model access, file ordering, and dependency declarations are correct.
6. Guard against unsupported assumptions.
   If a field, decorator, or API is not anchored in the skill references or official docs, state that clearly rather than guessing.

## Non-Negotiable Rules

- Do not bypass the ORM for normal CRUD.
- Do not invent model fields, XML attributes, or undocumented APIs.
- Do not omit access control for new `models.Model` records.
- Do not mix module extension logic with direct core modifications.
- Do not use unsafe `sudo()` or unsafe raw SQL.
- Do not leave manifest `data` lists out of sync with actual files.

## Output Expectations

When completing Odoo work with this skill:

- Produce a module that is coherent and installable.
- Keep naming and file order predictable.
- Separate business logic, security, views, controllers, and reports cleanly.
- Keep implementation aligned with Odoo 18 expectations and explicit about uncertainties.

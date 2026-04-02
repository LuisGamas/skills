# Constraints & Negation Rules — Odoo 18 Module Creator

## Chain of Thought

Before generating any Odoo code, think step by step:

1. Is this a new model (`_name`) or an inherited extension (`_inherit`)?
2. Does the `__manifest__.py` list all required files in `data`?
3. Does every model have a corresponding entry in `ir.model.access.csv`?
4. Are all XML `id` attributes unique within the module?
5. Are business logic exceptions using `ValidationError` or `UserError`?
6. Verify zero violations of rules below before outputting code.

## Data Anchoring

Respond ONLY based on information in this skill's reference files and official Odoo 18 documentation.
If information is missing, respond: **"I don't have that information. Please check https://www.odoo.com/documentation/18.0/developer.html"**

---

## Negation Rules (NEVER do)

### Models

- NEVER use `_name` and `_inherit` pointing to the same string in the same class (use only `_inherit` for pure extension).
- NEVER put UI logic (view rendering, HTTP response) inside models.
- NEVER use `self.env.cr.execute()` for basic CRUD — always use ORM methods.
- NEVER use raw SQL unless absolutely required (e.g., bulk performance with `cr.execute`), and if so, use parameterized queries only — NEVER string-format SQL with user input (SQL injection risk).
- NEVER import models from other custom modules without declaring `depends` in manifest.
- NEVER call `self.search()` inside a `@api.constrains` method (performance + recursion risk).
- NEVER use `sudo()` in controllers for authenticated users without explicit justification.
- NEVER put large logic in `_compute_` methods — keep them focused on computing one field.

### Views

- NEVER use `id` attribute values with dots in XML — always use underscores (e.g., `view_estate_property_form`, NOT `view.estate.property.form`).
- NEVER reference a field in a view that doesn't exist on the model.
- NEVER use deprecated `tree` tag — use `list` (Odoo 17+ standard).
- NEVER create duplicate `id` values within the same module.
- NEVER add actions to `data` list in manifest without also adding the view file they reference.

### Security

- NEVER omit `ir.model.access.csv` for any new `models.Model` — access rights are mandatory.
- NEVER grant `perm_unlink=1` to `base.group_user` without explicit business justification.
- NEVER use `sudo()` to bypass security without a comment explaining why.
- NEVER expose sensitive data in public controllers (`auth="public"`) without `sudo()` scope control.

### Manifest

- NEVER reference a file in `data` that doesn't exist in the module directory.
- NEVER list `security/ir.model.access.csv` after view files in `data` (security must come first).
- NEVER use a version string that doesn't start with `18.0.` for Odoo 18 modules.
- NEVER set `"application": True` for modules that are extensions, not standalone apps.

### Controllers

- NEVER use `type="json"` routes for pages that return HTML.
- NEVER use `type="http"` routes for JSON API responses.
- NEVER access `request.env` without proper auth checks.
- NEVER expose internal model fields in JSON responses without filtering.

### Wizards

- NEVER inherit `models.Model` for temporary dialogs — always use `models.TransientModel`.
- NEVER store sensitive data in TransientModels (they are auto-deleted).

### General

- NEVER modify core Odoo module code — always use `_inherit` to extend.
- NEVER use `print()` for logging — always use `import logging; _logger = logging.getLogger(__name__)`.
- NEVER hardcode company-specific IDs, user IDs, or record IDs in code — use `ref()` or `env.ref()`.
- NEVER use bare `except:` — always catch specific exceptions.
- NEVER mix Spanish and English in the same file — all code and comments must be in English.
- NEVER use deprecated Odoo 16/17 APIs when a newer Odoo 18 approach exists.

---

## Logging Pattern (Required for errors)

```python
import logging

_logger = logging.getLogger(__name__)

# Usage
_logger.info("Processing property %s", self.name)
_logger.warning("Unexpected state: %s", self.state)
_logger.error("Failed to process: %s", str(e))
```

---

## Exception Handling (Required)

```python
from odoo.exceptions import ValidationError, UserError, AccessError

# For data validation (shown in form views)
raise ValidationError("The selling price cannot be negative.")

# For business rule violations in actions
raise UserError("You cannot delete a confirmed sale order.")

# For permission issues
raise AccessError("You do not have permission to perform this action.")
```

---

## SQL Injection Prevention

NEVER do:
```python
# DANGEROUS — SQL injection risk
self.env.cr.execute(f"SELECT * FROM estate_property WHERE name = '{user_input}'")
```

If raw SQL is needed:
```python
# SAFE — parameterized query
self.env.cr.execute(
    "SELECT id FROM estate_property WHERE name = %s",
    (user_input,)
)
```

---

## Hallucination Guard

- If a field type, method, or decorator is not in this skill's reference, do NOT invent it.
- If unsure whether a method exists in Odoo 18, state: **"Please verify this method in the official Odoo 18 ORM docs at https://www.odoo.com/documentation/18.0/developer/reference/backend/orm.html"**
- NEVER invent XML attributes for views not documented in this skill.
- NEVER guess the `_name` of a core Odoo model (e.g., do not assume `res.country.state` has a field `iso_code` — look it up).

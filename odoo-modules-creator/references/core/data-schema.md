# Data Schemas — Odoo 18 Module Creator

All schemas use TypeScript-style interfaces for clarity. They define the expected structure of each Odoo artifact.

---

## Manifest Schema

```typescript
interface OdooManifest {
  name: string;                    // Human-readable module name
  version: string;                 // Format: "18.0.{major}.{minor}.{patch}"
  summary: string;                 // One-line description (max 140 chars)
  description?: string;            // Long description (plain text or RST)
  author?: string;
  website?: string;
  category?: string;               // e.g., "Sales", "Accounting/Accounting"
  license?: "LGPL-3" | "OPL-1" | "AGPL-3";
  depends: string[];               // Required Odoo module names
  data?: string[];                 // XML/CSV files loaded in order
  demo?: string[];                 // Demo data files
  assets?: Record<string, string[]>; // Frontend asset bundles
  installable?: boolean;           // Default: true
  application?: boolean;           // Default: false — true only for standalone apps
  auto_install?: boolean;          // Default: false
}
```

---

## Model Schema

```typescript
interface OdooModel {
  _name: string;           // New model: "module.entity" (e.g., "estate.property")
  _inherit?: string | string[]; // Extend existing: "res.partner" — omit _name if pure extension
  _description: string;    // Human-readable description
  _order?: string;         // Default sort: "name" | "id desc" | "date_availability desc"
  _rec_name?: string;      // Field used as display name (default: "name")
  _sql_constraints?: Array<[constraintId: string, sql: string, message: string]>;
}

type FieldDefinition =
  | SimpleField
  | RelationalField
  | ComputedField
  | SelectionField;

interface SimpleField {
  type: "Char" | "Text" | "Integer" | "Float" | "Boolean" | "Date" | "Datetime" | "Binary" | "Html";
  string?: string;        // UI label
  required?: boolean;
  readonly?: boolean;
  default?: any;
  copy?: boolean;         // Whether field is copied on duplicate (default: true)
  index?: boolean;
  help?: string;
}

interface SelectionField {
  type: "Selection";
  selection: Array<[value: string, label: string]>;
  string?: string;
  required?: boolean;
  default?: string;
}

interface RelationalField {
  type: "Many2one" | "One2many" | "Many2many";
  comodel: string;         // Target model _name
  string?: string;
  // Many2one only:
  ondelete?: "restrict" | "cascade" | "set null";
  // One2many only:
  inverse_name?: string;   // Field name on the comodel pointing back
  // Many2many only:
  relation?: string;       // Optional: custom junction table name
}

interface ComputedField {
  type: string;            // Any field type
  compute: string;         // Method name: "_compute_field_name"
  store?: boolean;         // Default: false (non-stored)
  depends?: string[];      // @api.depends fields (declared as decorator in Python)
  inverse?: string;        // Method name for inverse (makes field writable)
  readonly?: boolean;      // Default: true for computed
}
```

---

## Security Access CSV Schema

```typescript
interface IrModelAccessRow {
  id: string;                // Unique XML id — no dots, use underscores
  name: string;              // Human description (can include spaces)
  model_id_id: string;       // "model_" + _name with dots→underscores
                             // e.g., estate.property → model_estate_property
  group_id_id?: string;      // res.groups XML id (e.g., "base.group_user")
                             // empty = applies to all users
  perm_read: 0 | 1;
  perm_write: 0 | 1;
  perm_create: 0 | 1;
  perm_unlink: 0 | 1;
}

// CSV Header:
// id,name,model_id:id,group_id:id,perm_read,perm_write,perm_create,perm_unlink
```

---

## View Record Schema

```typescript
interface IrUiView {
  id: string;              // XML id: "view_{model_snake}_{type}"
  model: "ir.ui.view";
  fields: {
    name: string;          // Convention: "{model._name}.{type}" e.g., "estate.property.form"
    model: string;         // Model _name this view belongs to
    arch_type: "xml";
    // arch content: one of form | list | kanban | search | calendar | graph | pivot
    inherit_id?: string;   // XML id of parent view (for view inheritance)
    priority?: number;     // Lower = higher priority (default: 16)
  };
}
```

---

## Window Action Schema

```typescript
interface IrActionsActWindow {
  id: string;              // XML id: "action_{model_snake}"
  model: "ir.actions.act_window";
  fields: {
    name: string;                        // Button/menu label
    res_model: string;                   // Model _name
    view_mode: string;                   // "list,form" | "form" | "list,kanban,form"
    domain?: string;                     // Filter: "[('active', '=', True)]"
    context?: string;                    // Default values or search filters
    target?: "current" | "new" | "inline" | "fullscreen";
  };
}
```

---

## Menu Item Schema

```typescript
interface IrUiMenu {
  id: string;              // XML id: "menu_{module}_{name}"
  name: string;            // Displayed label
  parent?: string;         // Parent menu XML id (omit for top-level)
  action?: string;         // Window action XML id
  sequence?: number;       // Order within parent (lower = first)
  groups?: string;         // Comma-separated group XML ids
}
```

---

## Controller Route Schema

```typescript
interface OdooRoute {
  path: string;            // URL pattern: "/module/resource/<int:record_id>"
  auth: "public" | "user" | "none";
  type: "http" | "json";
  methods?: ("GET" | "POST")[];
  website?: boolean;       // true = route available in website module
  csrf?: boolean;          // Default: true for POST
}
```

---

## Wizard (TransientModel) Schema

```typescript
interface OdooWizard {
  _name: string;           // Convention: "module.action.wizard"
  _description: string;
  baseClass: "models.TransientModel";  // ALWAYS TransientModel, never Model
  fields: Record<string, FieldDefinition>;
  // Required method:
  action_confirm(): void;  // Returns ir.actions or window close dict
}
```

---

## ORM Method Reference

```typescript
// CRUD
interface OdooRecordSet {
  // Search
  search(domain: Domain, opts?: { limit?: number; order?: string; offset?: number }): RecordSet;
  search_count(domain: Domain): number;
  browse(ids: number | number[]): RecordSet;

  // Write
  create(values: Record<string, any>): RecordSet;
  write(values: Record<string, any>): boolean;
  unlink(): boolean;
  copy(default?: Record<string, any>): RecordSet;

  // Single record
  ensure_one(): void;  // raises if not exactly 1 record

  // Recordset operations
  mapped(field: string): any[];
  filtered(fn: (record: any) => boolean): RecordSet;
  sorted(key?: string | ((r: any) => any), reverse?: boolean): RecordSet;

  // Environment
  sudo(): RecordSet;
  with_context(context: Record<string, any>): RecordSet;
}

// Domain filter tuple
type DomainTuple = [fieldName: string, operator: string, value: any];
type Domain = Array<DomainTuple | "&" | "|" | "!">;
```

---

## Field Decorators Reference

```typescript
// Triggers recompute when listed fields change
@api.depends("field1", "field2.subfield")

// Triggers when field changes in UI (does NOT run on write)
@api.onchange("field_name")

// Validates after save (raises ValidationError if invalid)
@api.constrains("field1", "field2")

// Receives a list of ids to process in batch
@api.model
def method_name(cls, values): ...  // class-level method, no self record

// Single-record assertion helper
self.ensure_one()
```

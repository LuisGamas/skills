# Few-Shot Examples — Odoo 18 Module Creator

Two complete, diverse examples demonstrating core patterns.

---

## Example 1 — New Module from Scratch (Simple Model)

**Request:** "Create a simple `library_management` module to manage books, with title, author, ISBN, and availability."

### File: `__manifest__.py`

```python
{
    "name": "Library Management",
    "version": "18.0.1.0.0",
    "summary": "Manage library books and their availability.",
    "author": "Your Company",
    "category": "Services",
    "license": "LGPL-3",
    "depends": ["base"],
    "data": [
        "security/ir.model.access.csv",
        "views/library_book_view.xml",
        "views/menu.xml",
    ],
    "installable": True,
    "application": True,
}
```

### File: `__init__.py` (root)

```python
from . import models
```

### File: `models/__init__.py`

```python
from . import library_book
```

### File: `models/library_book.py`

```python
import logging
from odoo import models, fields, api
from odoo.exceptions import ValidationError

_logger = logging.getLogger(__name__)


class LibraryBook(models.Model):
    _name = "library.book"
    _description = "Library Book"
    _order = "title"

    title = fields.Char(string="Title", required=True)
    author = fields.Char(string="Author", required=True)
    isbn = fields.Char(string="ISBN", size=13)
    date_published = fields.Date(string="Publication Date")
    available = fields.Boolean(string="Available", default=True)
    notes = fields.Text(string="Notes")

    _sql_constraints = [
        (
            "unique_isbn",
            "UNIQUE(isbn)",
            "A book with this ISBN already exists.",
        ),
    ]

    @api.constrains("isbn")
    def _check_isbn(self):
        for record in self:
            if record.isbn and len(record.isbn) not in (10, 13):
                raise ValidationError("ISBN must be 10 or 13 characters long.")

    def action_borrow(self):
        for record in self:
            if not record.available:
                raise ValidationError(f"'{record.title}' is not available for borrowing.")
            record.available = False
            _logger.info("Book '%s' has been borrowed.", record.title)

    def action_return(self):
        for record in self:
            record.available = True
            _logger.info("Book '%s' has been returned.", record.title)
```

### File: `security/ir.model.access.csv`

```csv
id,name,model_id:id,group_id:id,perm_read,perm_write,perm_create,perm_unlink
access_library_book_user,library.book user,model_library_book,base.group_user,1,1,1,0
access_library_book_manager,library.book manager,model_library_book,base.group_system,1,1,1,1
```

### File: `views/library_book_view.xml`

```xml
<?xml version="1.0" encoding="utf-8"?>
<odoo>

    <!-- Form View -->
    <record id="view_library_book_form" model="ir.ui.view">
        <field name="name">library.book.form</field>
        <field name="model">library.book</field>
        <field name="arch" type="xml">
            <form string="Book">
                <header>
                    <button name="action_borrow" type="object" string="Borrow"
                            attrs="{'invisible': [('available', '=', False)]}"
                            class="btn-primary"/>
                    <button name="action_return" type="object" string="Return"
                            attrs="{'invisible': [('available', '=', True)]}"/>
                </header>
                <sheet>
                    <group>
                        <group>
                            <field name="title"/>
                            <field name="author"/>
                            <field name="isbn"/>
                        </group>
                        <group>
                            <field name="date_published"/>
                            <field name="available"/>
                        </group>
                    </group>
                    <group string="Notes">
                        <field name="notes" nolabel="1"/>
                    </group>
                </sheet>
            </form>
        </field>
    </record>

    <!-- List View -->
    <record id="view_library_book_list" model="ir.ui.view">
        <field name="name">library.book.list</field>
        <field name="model">library.book</field>
        <field name="arch" type="xml">
            <list string="Books"
                  decoration-success="available == True"
                  decoration-muted="available == False">
                <field name="title"/>
                <field name="author"/>
                <field name="isbn"/>
                <field name="date_published"/>
                <field name="available"/>
            </list>
        </field>
    </record>

    <!-- Search View -->
    <record id="view_library_book_search" model="ir.ui.view">
        <field name="name">library.book.search</field>
        <field name="model">library.book</field>
        <field name="arch" type="xml">
            <search string="Book">
                <field name="title"/>
                <field name="author"/>
                <field name="isbn"/>
                <filter string="Available" name="available"
                        domain="[('available', '=', True)]"/>
                <filter string="Borrowed" name="borrowed"
                        domain="[('available', '=', False)]"/>
                <group expand="0" string="Group By">
                    <filter string="Author" name="group_author"
                            context="{'group_by': 'author'}"/>
                </group>
            </search>
        </field>
    </record>

    <!-- Window Action -->
    <record id="action_library_book" model="ir.actions.act_window">
        <field name="name">Books</field>
        <field name="res_model">library.book</field>
        <field name="view_mode">list,form</field>
        <field name="context">{'search_default_available': 1}</field>
    </record>

</odoo>
```

### File: `views/menu.xml`

```xml
<?xml version="1.0" encoding="utf-8"?>
<odoo>
    <menuitem id="menu_library_root" name="Library" sequence="50"/>
    <menuitem id="menu_library_books" name="Books"
              parent="menu_library_root"
              action="action_library_book"
              sequence="10"/>
</odoo>
```

---

## Example 2 — Extending an Existing Model (Inherited Extension)

**Request:** "Add a `preferred_delivery_method` selection field and a `membership_level` field to `res.partner`, in a module called `partner_extension`."

### File: `__manifest__.py`

```python
{
    "name": "Partner Extension",
    "version": "18.0.1.0.0",
    "summary": "Adds delivery preferences and membership level to contacts.",
    "author": "Your Company",
    "category": "Sales",
    "license": "LGPL-3",
    "depends": ["base", "contacts"],
    "data": [
        "security/ir.model.access.csv",
        "views/res_partner_view.xml",
    ],
    "installable": True,
    "application": False,
}
```

### File: `__init__.py` (root)

```python
from . import models
```

### File: `models/__init__.py`

```python
from . import res_partner
```

### File: `models/res_partner.py`

```python
from odoo import models, fields


class ResPartner(models.Model):
    _inherit = "res.partner"
    # No _name — pure extension of existing model

    preferred_delivery_method = fields.Selection(
        [
            ("standard", "Standard Delivery"),
            ("express", "Express Delivery"),
            ("pickup", "Store Pickup"),
        ],
        string="Preferred Delivery Method",
        default="standard",
    )
    membership_level = fields.Selection(
        [
            ("none", "No Membership"),
            ("silver", "Silver"),
            ("gold", "Gold"),
            ("platinum", "Platinum"),
        ],
        string="Membership Level",
        default="none",
    )
    membership_since = fields.Date(string="Member Since")
```

### File: `security/ir.model.access.csv`

```csv
id,name,model_id:id,group_id:id,perm_read,perm_write,perm_create,perm_unlink
```

> Note: `res.partner` already has access rules in the `base` module.
> Only add entries here if you create entirely NEW models. For pure `_inherit` extensions, this file can be empty (but must still exist and be listed in manifest).

### File: `views/res_partner_view.xml`

```xml
<?xml version="1.0" encoding="utf-8"?>
<odoo>

    <!-- Inherit and extend the existing res.partner form view -->
    <record id="view_res_partner_form_extension" model="ir.ui.view">
        <field name="name">res.partner.form.extension</field>
        <field name="model">res.partner</field>
        <field name="inherit_id" ref="base.view_partner_form"/>
        <field name="arch" type="xml">

            <!-- Add a new page to the existing notebook -->
            <notebook position="inside">
                <page string="Membership &amp; Delivery" name="membership_delivery">
                    <group>
                        <group string="Delivery">
                            <field name="preferred_delivery_method"/>
                        </group>
                        <group string="Membership">
                            <field name="membership_level"/>
                            <field name="membership_since"
                                   attrs="{'invisible': [('membership_level', '=', 'none')]}"/>
                        </group>
                    </group>
                </page>
            </notebook>

        </field>
    </record>

</odoo>
```

> Key pattern for view inheritance:
> - Use `<field name="inherit_id" ref="base.view_partner_form"/>` to target the parent view.
> - Use XPath positional attributes: `position="inside"`, `position="after"`, `position="before"`, `position="replace"`, `position="attributes"`.
> - Target existing elements using their `name` attribute or an XPath expression.

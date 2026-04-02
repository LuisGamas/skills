import os
import sys

def audit_odoo_module(module_path):
    print(f"Auditing Odoo module at: {module_path}")
    
    # Mandatory files
    manifest_path = os.path.join(module_path, "__manifest__.py")
    security_path = os.path.join(module_path, "security", "ir.model.access.csv")
    
    errors = []
    
    if not os.path.exists(manifest_path):
        errors.append("MISSING: __manifest__.py (Mandatory for all modules)")
    
    # Check if security file is needed (if models are present)
    models_dir = os.path.join(module_path, "models")
    if os.path.exists(models_dir) and any(f.endswith(".py") and f != "__init__.py" for f in os.listdir(models_dir)):
        if not os.path.exists(security_path):
            errors.append("MISSING: security/ir.model.access.csv (Mandatory for new models)")
    
    if errors:
        print("\nAudit FAILED with the following errors:")
        for error in errors:
            print(f"  - {error}")
        return False
    else:
        print("\nAudit PASSED! Basic structure looks good.")
        return True

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python audit_module.py <module_path>")
    else:
        audit_odoo_module(sys.argv[1])

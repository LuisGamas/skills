import re
import sys
import os

M2_WIDGETS = [
    'BottomNavigationBar', 'Drawer', 'ToggleButtons', 'DropdownButton', 
    'RaisedButton', 'FlatButton', 'OutlineButton'
]

def audit_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
        found = []
        for widget in M2_WIDGETS:
            if re.search(r'\b' + widget + r'\b', content):
                found.append(widget)
        return found

if __name__ == "__main__":
    target = sys.argv[1] if len(sys.argv) > 1 else "."
    for root, _, files in os.walk(target):
        for file in files:
            if file.endswith(".dart"):
                path = os.path.join(root, file)
                issues = audit_file(path)
                if issues:
                    print(f"❌ {path}: Found M2 widgets {issues}")

#!/usr/bin/env python3
"""Validate HTML script loading conventions for module vs classic scripts."""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CONFIG_PATH = ROOT / "config" / "page-script-conventions.json"

SCRIPT_TAG_RE = re.compile(r"<script\b[^>]*\bsrc=\"([^\"]+)\"[^>]*>", re.IGNORECASE)
MODULE_TYPE_RE = re.compile(r"\btype\s*=\s*\"module\"", re.IGNORECASE)
IMPORT_RE = re.compile(r"^\s*import\b", re.MULTILINE)


def load_conventions() -> dict:
    return json.loads(CONFIG_PATH.read_text(encoding="utf-8"))


def parse_script_tags(html_text: str) -> list[tuple[str, bool]]:
    tags: list[tuple[str, bool]] = []
    for match in SCRIPT_TAG_RE.finditer(html_text):
        tag = match.group(0)
        src = match.group(1)
        tags.append((src, bool(MODULE_TYPE_RE.search(tag))))
    return tags


def js_uses_import(js_path: Path) -> bool:
    if not js_path.exists():
        return False
    return bool(IMPORT_RE.search(js_path.read_text(encoding="utf-8")))


def main() -> int:
    conventions = load_conventions()
    errors: list[str] = []

    module_page_scripts: dict[str, str] = conventions["module_page_scripts"]

    # Source-of-truth validation: these files must exist and use imports.
    for html_file, js_file in module_page_scripts.items():
        js_path = ROOT / js_file
        if not js_path.exists():
            errors.append(f"Missing declared module page script: {js_file} (from {html_file})")
            continue
        if not js_uses_import(js_path):
            errors.append(f"Declared module page script has no import statement: {js_file}")

    # Validate script tag conventions in every root-level page.
    for html_path in sorted(ROOT.glob("*.html")):
        html_text = html_path.read_text(encoding="utf-8")
        tags = parse_script_tags(html_text)

        for src, has_module_type in tags:
            if not src.startswith("assets/js/"):
                continue
            js_path = ROOT / src
            if not js_path.exists():
                errors.append(f"{html_path.name}: referenced JS file does not exist: {src}")
                continue

            imports_used = js_uses_import(js_path)
            if imports_used and not has_module_type:
                errors.append(f"{html_path.name}: {src} uses import and must be loaded with type=\"module\".")
            if not imports_used and has_module_type:
                errors.append(f"{html_path.name}: {src} has no imports and must remain a classic script.")

        expected_page_script = module_page_scripts.get(html_path.name)
        if expected_page_script:
            if not any(src == expected_page_script for src, _ in tags):
                errors.append(f"{html_path.name}: missing expected page script {expected_page_script}.")

    if errors:
        print("Script module convention check failed:\n")
        for issue in errors:
            print(f"- {issue}")
        return 1

    print("Script module convention check passed.")
    return 0


if __name__ == "__main__":
    sys.exit(main())

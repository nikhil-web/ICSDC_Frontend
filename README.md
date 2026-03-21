# ICSDC_Frontend

## Script loading conventions

- Source-of-truth module page scripts are maintained in `config/page-script-conventions.json`.
- Run the regression check before committing HTML/JS changes:

```bash
python3 scripts/check-page-script-modules.py
```

The check enforces:
- JS files that use `import` are loaded with `type="module"`.
- Legacy JS files without `import` stay as classic scripts.
- Each page in the source-of-truth map includes its expected page-specific module script.

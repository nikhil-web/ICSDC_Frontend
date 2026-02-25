# ICSDC Frontend (React)

This repository now uses **React + Vite** so you can convert your existing HTML/CSS/JS project step-by-step instead of rewriting everything at once.

## Run locally

```bash
npm install
npm run dev
```

## Suggested migration flow

1. **Create one React component per old HTML section**
   - Example: `header`, `hero`, `about`, `faq`, `footer`.
   - Place them in `src/components/`.

2. **Copy CSS with minimal edits first**
   - Reuse your class names.
   - Replace `class` with `className` in JSX.

3. **Move JavaScript behavior into state + handlers**
   - `document.querySelector(...)` → component state/props.
   - `addEventListener('click', ...)` → `onClick`.
   - `innerHTML` updates → render from arrays/state.

4. **Compose everything in `src/App.jsx`**
   - Import each converted component.
   - Pass data via props.

## Included example in this repo

- `src/App.jsx` includes a converted FAQ section where adding entries is managed by React state.
- `src/components/LegacySection.jsx` is a reusable section wrapper you can keep using during migration.

If you want, I can next convert one of your real HTML pages into React component files directly.

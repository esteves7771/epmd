# EPMD Demo Prototype

EPMD is a mobile first React demo for a serious life operating system inspired by RPG logic.

## Stack

- React + TypeScript + Vite
- Tailwind CSS
- Zustand
- Framer Motion
- Recharts
- Lucide React
- localStorage persistence

## Run locally

```bash
npm install
npm run dev
```

Open the local Vite URL in your browser.

## Build

```bash
npm run build
npm run preview
```

## Notes

- Local persistence key: `epmd_app_v1`
- Seed demo data loads on first run
- No backend required
- Architecture is modular and ready to migrate later to Firebase or Supabase

## Main folders

- `src/components` reusable UI
- `src/pages` route-like screens
- `src/store` app state and actions
- `src/types` data model
- `src/utils` scoring, level, streak, and storage helpers
- `src/data` demo seed data

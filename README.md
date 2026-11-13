# Mealio

Mealio is an AI-powered cooking assistant. Tell it what ingredients you have and it
suggests personalized recipes that respect your allergies, with step-by-step
instructions you can have read aloud while you cook.

This repository is the **frontend** (React + Vite). It talks to a separate Mealio
backend API.

## Features

- **Recipe generation**: generate a meal from a dish name or from the ingredients you
  already have, with an optional quick-meal mode.
- **Allergen-aware**: pick common allergens or add your own during setup. They're
  excluded from generated recipes, and you can manage them later from your profile.
- **Recipe view**: ingredients, nutrition info, a checkable shopping list for missing
  ingredients, and ordered instructions.
- **Read-aloud instructions**: steps are narrated with the browser's Web Speech API,
  with play, pause, resume and stop controls, and the current step is highlighted.
- **History**: browse and reopen previously generated recipes.
- **Accounts**: sign in, with protected app pages and an account menu.

## Tech stack

- [React 19](https://react.dev) + TypeScript
- [Vite](https://vite.dev)
- [React Router 7](https://reactrouter.com)
- [Tailwind CSS 4](https://tailwindcss.com)
- [Oxlint](https://oxc.rs) for linting

## Getting started

### Prerequisites

- Node.js 20 or later
- A running Mealio backend API (by default on `http://localhost:3000`)

### Setup

```bash
git clone https://github.com/soomto12/Mealio_UI.git
cd Mealio_UI
npm install
```

Create a `.env` file in the project root that points at the backend:

```env
VITE_API_BASE=http://localhost:3000
```

Then start the dev server:

```bash
npm run dev
```

## Scripts

| Command             | Description                               |
| ------------------- | ----------------------------------------- |
| `npm run dev`       | Start the Vite dev server with HMR        |
| `npm run build`     | Type-check and build for production       |
| `npm run preview`   | Preview the production build locally      |
| `npm run lint`      | Lint the project with Oxlint              |
| `npm run typecheck` | Run the TypeScript compiler without build |

## Routes

| Path                 | Page                                      |
| -------------------- | ----------------------------------------- |
| `/`                  | Landing page                              |
| `/login`             | Sign in                                   |
| `/app`               | Home dashboard                            |
| `/generate`          | Generate a recipe                         |
| `/recipes`           | Generated recipe and suggestions          |
| `/recipes/view`      | Full view of a single recipe              |
| `/history`           | Previously generated recipes              |
| `/allergens`         | Allergen setup                            |
| `/profile`           | Profile                                   |
| `/profile/allergens` | Manage saved allergens                    |

## Project structure

```
src/
├── components/   UI components, grouped by feature (generate, recipe, history, allergens…)
├── context/      RecipeContext: shared recipe and suggestion state
├── hooks/        useAllergens, useRecipeById, useStepNarrator
├── pages/        Route-level pages
├── assets/       Images and logo
└── main.tsx      App entry and routes
```

See [STATE_NOTES.md](STATE_NOTES.md) for how state is managed across pages.

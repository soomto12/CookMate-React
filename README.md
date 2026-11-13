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
- **Accounts**: sign up or sign in, with protected app pages and an account menu.
  New accounts go straight to allergen setup.

## Tech stack

- [React 19](https://react.dev) + TypeScript
- [Vite](https://vite.dev)
- [React Router 7](https://reactrouter.com)
- [Tailwind CSS 4](https://tailwindcss.com)
- [Oxlint](https://oxc.rs) for linting

## Getting started

### Prerequisites

- Node.js 20 or later
- A running Mealio backend API (see [Backend API](#backend-api))

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

`VITE_API_BASE` is required. The app has no fallback, so requests fail if it isn't
set. Vite reads it at startup, so restart the dev server after changing it.

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

## Backend API

All paths are relative to `VITE_API_BASE`. Every request except sign-up and login
sends `Authorization: Bearer <token>`.

| Method   | Path                   | Used for                                        |
| -------- | ---------------------- | ----------------------------------------------- |
| `POST`   | `/auth/signup`         | Create an account (`name`, `email`, `password`) |
| `POST`   | `/auth/login`          | Sign in (`email`, `password`)                   |
| `GET`    | `/recipes`             | Recipe history                                  |
| `GET`    | `/recipes/latest`      | Most recently generated recipe                  |
| `GET`    | `/recipes/find?id=…`   | A single recipe by id                           |
| `POST`   | `/recipes/generate`    | Generate a recipe from a dish name              |
| `POST`   | `/recipes/suggest`     | Suggest meals from ingredients you have         |
| `POST`   | `/recipes/ingredients` | Fetch ingredients for a suggested meal          |
| `GET`    | `/allergens`           | List saved allergens                            |
| `POST`   | `/allergens`           | Save allergens                                  |
| `DELETE` | `/allergens/:key`      | Remove an allergen                              |

## Authentication

After login or sign-up, the token and user are stored in `localStorage`
(`mealio_token`, `mealio_user`). All API calls go through `authFetch` in
[`src/session.ts`](src/session.ts), which attaches the token. If the server responds
with `401` or `403`, the session is cleared and the user is sent back to `/login`
with a "session expired" message. The route guards (`RequireAuth`,
`RedirectIfAuthed`) only control what the UI shows. The backend is what actually
enforces access.

## Project structure

```
src/
├── components/   UI components, grouped by feature (generate, recipe, history, allergens…)
├── context/      RecipeContext: shared recipe and suggestion state
├── hooks/        useAllergens, useRecipeById, useStepNarrator
├── pages/        Route-level pages
├── assets/       Images and logo
├── session.ts    Token storage and authFetch
├── types.ts      Shared types
└── main.tsx      App entry and routes
```

See [STATE_NOTES.md](STATE_NOTES.md) for how state is managed across pages.

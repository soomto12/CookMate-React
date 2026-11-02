# State management notes

State uses plain React `useState`, no store library.

## Current setup

- `pages/Generate.tsx`: form state (`meal`, `quickMeal`, `ingredients`,
  `justIngredients`, `excludeAllergens`) is local `useState`, so it resets on
  navigation. It navigates to `/recipes` itself after a successful submit.
- `hooks/useAllergens.ts`: fetches the saved allergens with loading and error
  state. Returns `{ allergens, loading, error, reload }`.
- `context/RecipeContext.tsx`: the only context, because results are shared
  with the Recipes page. Holds `recipe`, `suggestions`, `suggestLoading`,
  `suggestError`, `submit(input)` and `clear`. `submit` takes all form values as
  an argument and returns `true` on success. It does not touch the router.
  Results persist to `localStorage` under `cookmate_recipe`. The context value
  is memoized.

## When to reconsider

If the app grows to many recipe pages, accounts and shopping lists, a store or
data-fetching library (for example TanStack Query for allergens) could pay off.

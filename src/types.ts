/** User: the logged-in user saved in localStorage (cookmate_user). */
export interface CookMateUser {
  id?: string
  name: string
  email?: string
}

/** Recipe data: one ingredient line in a recipe. */
export interface RecipeIngredient {
  id?: string
  name: string
  quantity: number | null
  unit: string | null
}

/** Recipe data: one cooking step in a recipe. */
export interface RecipeStep {
  id?: string
  order: number
  instruction: string
}

/** Recipe data: one item in a shopping list. */
/** Recipe data: a shopping list attached to a recipe. */
export interface ShoppingListItem {
  id?: string
  name: string
  quantity: number | null
  unit: string | null
}

export interface ShoppingList {
  id?: string
  items: ShoppingListItem[]
}

/** Recipe data: nutrition summary per serving. */
export interface RecipeNutrition {
  calories?: number | null
  proteinGrams?: number | null
  carbsGrams?: number | null
  fatGrams?: number | null
}

/** Recipe data: a full recipe returned by the API. */
export interface Recipe {
  id: string
  title: string
  description?: string | null
  cuisine?: string | null
  servings?: number | null
  cookTimeMinutes?: number | null
  prepTimeMinutes?: number | null
  tags?: string[]
  nutrition?: RecipeNutrition | null
  difficulty?: 'EASY' | 'MEDIUM' | 'HARD' | null
  imageUrl?: string | null
  imageCredit?: string | null
  imageCreditUrl?: string | null
  ingredients: RecipeIngredient[]
  steps: RecipeStep[]
  shoppingLists?: ShoppingList[]
}

/** Component props: Icon component. */
export interface IconProps {
  d: string
  className: string
}

/** Component props: Toggle component. */
export interface ToggleProps {
  name: string
  label: string
  defaultChecked?: boolean
  checked?: boolean
  onChange?: (checked: boolean) => void
  describedBy?: string
  /** Names the switch when the visible label text sits outside the Toggle. */
  ariaLabel?: string
}

// Helper: turns an unknown caught error into a message string.
export const getErrorMessage = (err: unknown): string =>
  err instanceof Error ? err.message : String(err)

/** Component props: AppSidebar component. */
export interface AppSidebarProps {
  current: string
  open: boolean
  onClose: () => void
}

/** Component props: SiteHeader component. */
export interface SiteHeaderProps {
  active: 'home' | 'history'
}

/** Auth form: which tab the login/signup form is showing. */
export type FormMode = 'login' | 'signup'

/** Auth form: values typed into the login/signup form. */
export interface FormValues {
  name: string
  email: string
  password: string
}

/** Auth form: validation error message per field. */
export type FormErrors = Partial<Record<'name' | 'email' | 'password', string>>

/** Component props: FormComponent (login/signup form). */
export interface FormComponentProps {
  initialMode?: FormMode
  loading?: boolean
  error?: string
  onSubmit?: (mode: FormMode, values: FormValues) => void | Promise<void>
}

/** API response: login/signup response from the auth endpoint. */
export interface AuthResponse {
  token?: string
  user?: CookMateUser
  error?: string
  message?: string
}

/** Generate page: values passed to RecipeContext.submit. */
export interface GenerateInput {
  meal: string
  ingredients: string
  justIngredients: boolean
  quickMeal: boolean
  excludeAllergens: boolean
}

/** Meal suggestion: one entry returned by POST /recipes/suggest. */
export interface MealSuggestion {
  name: string
  imageUrl: string | null
  imageCredit: string | null
  imageCreditUrl: string | null
}

/** Recipe context: the shape of the value RecipeContext provides. */
export interface RecipeContextValue {
  // generate request
  suggestLoading: boolean
  suggestError: string
  submit: (input: GenerateInput) => Promise<boolean>

  // results
  recipe: Recipe | null
  suggestions: MealSuggestion[]
  clear: () => void

  // latest recipe (GET /recipes/latest)
  recipeLoading: boolean
  recipeError: string
  loadLatestRecipe: () => Promise<void>
}

/** Popular recipes: one static card in the home page Popular Recipes grid. */
export interface PopularRecipe {
  name: string
  tags: string
  time: string
  image: string
}

/** API response: raw /ingredient payload for one meal. */
export interface IngredientResponse {
  mealname?: string | null
  mealName?: string | null
  title?: string | null
  image?: string | null
  imageUrl?: string | null
  description?: string | null
  servings?: number | null
  difficulty?: Recipe['difficulty']
  prepTimeMinutes?: number | null
  cookTimeMinutes?: number | null
  ingredients?: unknown
  error?: string
  message?: string
}

/** Recipe modal: /ingredient data after normalising, ready to render. */
export interface MealDetails {
  name: string
  image: string | null
  description: string
  ingredients: RecipeIngredient[]
  servings: number | null
  difficulty: Recipe['difficulty']
  prepTimeMinutes: number | null
  cookTimeMinutes: number | null
}

/** Component props: RecipeDetailsModal component. */
export interface RecipeDetailsModalProps {
  recipe: PopularRecipe
  onClose: () => void
}

/** Component props: MealSuggestionModal component. */
export interface MealSuggestionModalProps {
  suggestions: MealSuggestion[]
  quickMeal: boolean
  excludeAllergens: boolean
  loading: boolean
  onClose: () => void
  onGenerate: (input: { meal: string; quickMeal: boolean; excludeAllergens: boolean }) => void
}

// Helper: renders one ingredient line as "Name (2 cups)".
export const formatIngredient = ({ name, quantity, unit }: RecipeIngredient): string => {
  const amount = [quantity, unit].filter((v) => v != null).join(' ')
  return amount ? `${name} (${amount})` : name
}

/** History page: one generated recipe in the user's history. */
export interface HistoryEntry {
  id: string
  title: string
  image: string
  generatedAt: string
  minutes: number
}

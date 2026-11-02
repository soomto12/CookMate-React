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

/** Recipe data: a full recipe returned by the API. */
export interface Recipe {
  id: string
  title: string
  description?: string | null
  cuisine?: string | null
  servings?: number | null
  cookTimeMinutes?: number | null
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
  allergens: string[]
  excludeAllergens: boolean
}

/** Recipe context: the shape of the value RecipeContext provides. */
export interface RecipeContextValue {
  // generate request
  suggestLoading: boolean
  suggestError: string
  submit: (input: GenerateInput) => Promise<boolean>

  // results
  recipe: Recipe | null
  suggestions: string[]
  clear: () => void
}

/** Recipe context: what is saved to localStorage (cookmate_recipe). */
export interface SavedRecipeState {
  recipe: Recipe | null
  suggestions: string[]
}

export interface CookMateUser {
  id?: string
  name: string
  email?: string
}

export interface RecipeIngredient {
  id?: string
  name: string
  quantity: number | null
  unit: string | null
}

export interface RecipeStep {
  id?: string
  order: number
  instruction: string
}

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

export interface IconProps {
  d: string
  className: string
}

export interface ToggleProps {
  name: string
  label: string
  defaultChecked?: boolean
  checked?: boolean
  onChange?: (checked: boolean) => void
  describedBy?: string
}

export const getErrorMessage = (err: unknown): string =>
  err instanceof Error ? err.message : String(err)

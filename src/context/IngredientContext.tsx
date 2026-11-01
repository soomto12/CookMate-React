import { createContext, useContext, useState, type ReactNode } from 'react'

interface IngredientContextValue {
  ingredients: string
  setIngredients: (v: string) => void
  justIngredients: boolean
  setJustIngredients: (v: boolean) => void
}

const IngredientContext = createContext<IngredientContextValue | null>(null)

export function IngredientProvider({ children }: { children: ReactNode }) {
  const [ingredients, setIngredients] = useState('')
  const [justIngredients, setJustIngredients] = useState(false)

  return (
    <IngredientContext.Provider
      value={{ ingredients, setIngredients, justIngredients, setJustIngredients }}
    >
      {children}
    </IngredientContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useIngredients(): IngredientContextValue {
  const ctx = useContext(IngredientContext)
  if (!ctx) throw new Error('useIngredients must be used inside <IngredientProvider>')
  return ctx
}

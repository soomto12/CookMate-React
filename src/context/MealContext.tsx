import { createContext, useContext, useState, type ReactNode } from 'react'

interface MealContextValue {
  meal: string
  setMeal: (v: string) => void
  quickMeal: boolean
  setQuickMeal: (v: boolean) => void
}

const MealContext = createContext<MealContextValue | null>(null)

export function MealProvider({ children }: { children: ReactNode }) {
  const [meal, setMeal] = useState('')
  const [quickMeal, setQuickMeal] = useState(false)

  return (
    <MealContext.Provider value={{ meal, setMeal, quickMeal, setQuickMeal }}>
      {children}
    </MealContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useMeal(): MealContextValue {
  const ctx = useContext(MealContext)
  if (!ctx) throw new Error('useMeal must be used inside <MealProvider>')
  return ctx
}

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import Login from './pages/Login.tsx'
import Home from './pages/Home.tsx'
import Dashboard from './pages/Dashboard.tsx'
import Allergens from './pages/Allergens.tsx'
import Generate from './pages/Generate.tsx'
import Recipes from './pages/Recipes.tsx'
import { RecipeProvider } from './context/RecipeContext.tsx'
import { MealProvider } from './context/MealContext.tsx'
import { IngredientProvider } from './context/IngredientContext.tsx'
import { AllergenProvider } from './context/AllergenContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <MealProvider>
      <IngredientProvider>
      <AllergenProvider>
      <RecipeProvider>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/app" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/allergens" element={<Allergens />} />
        <Route path="/generate" element={<Generate />} />
        <Route path="/recipes" element={<Recipes />} />
      </Routes>
      </RecipeProvider>
      </AllergenProvider>
      </IngredientProvider>
      </MealProvider>
    </BrowserRouter>
  </StrictMode>,
)

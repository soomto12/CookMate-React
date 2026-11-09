import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import Login from './pages/Login.tsx'
import Home from './pages/Home.tsx'
import History from './pages/History.tsx'
import Allergens from './pages/Allergens.tsx'
import Generate from './pages/Generate.tsx'
import Recipes from './pages/Recipes.tsx'
import Profile from './pages/Profile.tsx'
import RequireAuth from './components/RequireAuth.tsx'
import RedirectIfAuthed from './components/RedirectIfAuthed.tsx'
import { RecipeProvider } from './context/RecipeContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <RecipeProvider>
        <Routes>
          {/* Public */}
          <Route element={<RedirectIfAuthed />}>
            <Route path="/" element={<App />} />
          </Route>
          <Route path="/login" element={<Login />} />

          {/* Signed-in only */}
          <Route element={<RequireAuth />}>
            <Route path="/app" element={<Home />} />
            <Route path="/history" element={<History />} />
            <Route path="/allergens" element={<Allergens />} />
            <Route path="/generate" element={<Generate />} />
            <Route path="/recipes" element={<Recipes />} />
            <Route path="/profile" element={<Profile />} />
          </Route>

          {/* Unknown URLs */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </RecipeProvider>
    </BrowserRouter>
  </StrictMode>,
)

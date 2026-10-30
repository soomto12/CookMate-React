import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import Login from './pages/Login.tsx'
import Home from './pages/Home.tsx'
import Dashboard from './pages/Dashboard.tsx'
import Allergens from './pages/Allergens.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/app" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/allergens" element={<Allergens />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)

export const ALLERGENS_URL = 'http://localhost:3000/api/allergens'
export const API_URL = 'http://localhost:3000/api'

export const icons = {
  home: 'M3 11l9-8 9 8M5 10v10h14V10M10 20v-6h4v6',
  sparkles:
    'M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z',
  recipes: 'M6 3h12a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V5a2 2 0 012-2zM12 8v8M9 11h6',
  cart: 'M3 4h2l2.4 10.4a1 1 0 001 .6h8.2a1 1 0 001-.8L19 8H6M9 20h.01M17 20h.01',
  user: 'M12 12a4 4 0 100-8 4 4 0 000 8zM4 21c0-4 3.6-6 8-6s8 2 8 6',
  bag: 'M6 8h12l1 12H5L6 8zM9 8a3 3 0 016 0M10 13c.5 1 1 1.5 2 1.5s1.5-.5 2-1.5',
  bolt: 'M13 2L4 14h7l-1 8 9-12h-7l1-8z',
  shield: 'M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3zM8.5 12l2.5 2.5 4.5-5',
  pot: 'M4 11h16v6a3 3 0 01-3 3H7a3 3 0 01-3-3v-6zM2 11h20M8 7c0-1 1-1 1-2s-1-1-1-2M13 7c0-1 1-1 1-2s-1-1-1-2',
}

export const navItems = [
  { href: '/app', label: 'Home', icon: icons.home },
  { href: '/generate', label: 'Generate Recipe', icon: icons.sparkles },
  { href: '/recipes', label: 'My Recipes', icon: icons.recipes },
  { href: '/shopping-list', label: 'Shopping List', icon: icons.cart },
  { href: '/profile', label: 'Profile', icon: icons.user },
]

export const steps = [
  'Enter your ingredients or the meal you have in mind.',
  'Set your preferences (quick meal, allergies).',
  'Click “Generate Recipe” and get delicious meal ideas!',
]

export const fieldsetClass = 'relative min-w-0 pl-11 sm:pl-14'
export const legendClass = 'p-0 text-base font-bold text-green-950'
export const hintClass = 'mt-1 text-sm text-slate-500'
export const sectionIconClass = 'absolute left-0 top-0 h-7 w-7 text-green-700 sm:h-8 sm:w-8'
export const inputClass =
  'mt-3 w-full rounded-xl border border-emerald-100 bg-white px-4 py-3.5 text-sm text-stone-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-green-600 focus:ring-2 focus:ring-green-600/20'

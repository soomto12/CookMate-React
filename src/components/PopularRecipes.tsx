import { useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from './Icon'
import RecipeDetailsModal from './RecipeDetailsModal'
import type { PopularRecipe } from '../types'
import friedRice from '../assets/Fried rice and peppered chicken.jpg'
import bolognese from '../assets/Spaghetti Bolognaise _ Un Plat Réconfortant inoubliable pour les Yummy Foodies.jpg'
import stirFry from '../assets/Easy Vegetable Stir Fry_ Step-by-Step Healthy Stir Fry Recipes - Dinnerecipes_com.jpg'
import chickenSalad from '../assets/Grilled Chicken Salad.jpg'
import jollof from '../assets/Jollof for breakfast.jpg'
import creamyPasta from '../assets/Creamy Pasta Dishes_ Rich and Satisfying Meals.jpg'

const icons = {
  flame:
    'M12 3c1 3 4 5 4 9a4 4 0 01-8 0c0-1.5.5-2.5 1.2-3.4.3 1 .8 1.4 1.3 1.4C10.5 8 11 5.5 12 3z',
  clock: 'M12 7v5l3 2M12 3a9 9 0 100 18 9 9 0 000-18z',
  arrow: 'M5 12h14M13 6l6 6-6 6',
  // Ingredients list — opens the recipe details modal
  ingredients: 'M9 6h10M9 12h10M9 18h10M4.6 6h.01M4.6 12h.01M4.6 18h.01',
}

const popularRecipes: PopularRecipe[] = [
  { name: 'Chicken Fried Rice', tags: 'Simple • Tasty', time: '25 min', image: friedRice },
  { name: 'Spaghetti Bolognese', tags: 'Classic • Healthy', time: '30 min', image: bolognese },
  { name: 'Vegetable Stir-Fry', tags: 'Fresh • Nutritious', time: '20 min', image: stirFry },
  { name: 'Grilled Chicken Salad', tags: 'Light • Protein-Rich', time: '35 min', image: chickenSalad },
  { name: 'Jollof Rice', tags: 'Nigerian Delight', time: '40 min', image: jollof },
  { name: 'Creamy Pasta', tags: 'Rich • Delicious', time: '30 min', image: creamyPasta },
]

function PopularRecipes() {
  const [selected, setSelected] = useState<PopularRecipe | null>(null)

  return (
    <section aria-labelledby="popular-recipes" className="px-4 pb-8 sm:px-8 lg:px-10">
      <div className="flex items-center justify-between">
        <h2
          id="popular-recipes"
          className="flex items-center gap-2 text-xl font-extrabold text-green-950"
        >
          <Icon d={icons.flame} className="h-6 w-6 text-orange-500" />
          Popular Recipes
        </h2>
        <Link
          to="/recipes"
          className="flex items-center gap-1.5 text-sm font-bold text-green-800 transition hover:text-green-950"
        >
          See all
          <Icon d={icons.arrow} className="h-4 w-4" />
        </Link>
      </div>

      <ul className="mt-5 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3">
        {popularRecipes.map((recipe) => (
          <li key={recipe.name}>
            <article className="overflow-hidden rounded-2xl bg-white shadow-lg shadow-green-900/5 ring-1 ring-emerald-50 transition hover:-translate-y-0.5 hover:shadow-xl">
              <div className="relative">
                <img
                  src={recipe.image}
                  alt={recipe.name}
                  className="aspect-[4/3] w-full object-cover"
                />
                <span className="absolute right-2.5 top-2.5 flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-1 text-xs font-bold text-white backdrop-blur-sm">
                  <Icon d={icons.clock} className="h-3.5 w-3.5" />
                  {recipe.time}
                </span>
              </div>

              <div className="flex items-center justify-between gap-3 px-4 py-3.5">
                <div className="min-w-0">
                  <h3 className="truncate text-sm font-extrabold text-green-950 sm:text-base">
                    {recipe.name}
                  </h3>
                  <p className="mt-0.5 truncate text-xs text-slate-500">{recipe.tags}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelected(recipe)}
                  aria-label={`See ingredients for ${recipe.name}`}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-green-900 transition hover:bg-green-800 hover:text-white"
                >
                  <Icon d={icons.ingredients} className="h-4 w-4" />
                </button>
              </div>
            </article>
          </li>
        ))}
      </ul>

      {selected && (
        <RecipeDetailsModal recipe={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  )
}

export default PopularRecipes

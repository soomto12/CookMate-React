import { formatIngredient, type Recipe } from '../../types'
import { icons, itemKey } from '../../recipesConstants'
import shoppingBasket from '../../assets/Screenshot 2026-11-04 110842.png'
import CheckItem from './CheckItem'
import SectionHeading from './SectionHeading'
import { useCheckedKeys } from './useCheckedKeys'

function ShoppingList({ recipe }: { recipe: Recipe }) {
  const { isChecked, toggle } = useCheckedKeys()
  // The API may attach a shopping list; otherwise shop the ingredient list.
  const items = recipe.shoppingLists?.[0]?.items ?? recipe.ingredients

  return (
    <section
      aria-labelledby="shopping-heading"
      className="mt-7 rounded-2xl bg-emerald-50/80 p-5 ring-1 ring-emerald-100 sm:p-6"
    >
      <SectionHeading id="shopping-heading" icon={icons.cart}>
        Shopping List
      </SectionHeading>

      <div className="mt-4 flex items-start gap-6">
        <ul className="min-w-0 flex-1 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          {items.map((item) => {
            const key = itemKey(item)
            return (
              <CheckItem
                key={key}
                shape="square"
                label={formatIngredient(item)}
                checked={isChecked(key)}
                onToggle={() => toggle(key)}
              />
            )
          })}
        </ul>

        <img
          src={shoppingBasket}
          alt=""
          aria-hidden="true"
          className="hidden w-[147px] shrink-0 self-center rounded-xl sm:block"
        />
      </div>
    </section>
  )
}

export default ShoppingList

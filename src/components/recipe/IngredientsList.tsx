import { formatIngredient, type RecipeIngredient } from '../../types'
import { icons, itemKey } from '../../recipesConstants'
import CheckItem from './CheckItem'
import SectionHeading from './SectionHeading'
import { useCheckedKeys } from './useCheckedKeys'

function IngredientsList({ ingredients }: { ingredients: RecipeIngredient[] }) {
  const { isChecked, toggle } = useCheckedKeys()

  return (
    <section aria-labelledby="ingredients-heading">
      <SectionHeading id="ingredients-heading" icon={icons.cart}>
        Ingredients
      </SectionHeading>
      <ul className="mt-4 grid gap-3">
        {ingredients.map((ing) => {
          const key = itemKey(ing)
          return (
            <CheckItem
              key={key}
              shape="round"
              label={formatIngredient(ing)}
              checked={isChecked(key)}
              onToggle={() => toggle(key)}
            />
          )
        })}
      </ul>
    </section>
  )
}

export default IngredientsList

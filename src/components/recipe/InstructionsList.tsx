import type { RecipeStep } from '../../types'
import { icons } from '../../recipesConstants'
import SectionHeading from './SectionHeading'

function InstructionsList({ steps }: { steps: RecipeStep[] }) {
  const ordered = [...steps].sort((a, b) => a.order - b.order)

  return (
    <section aria-labelledby="instructions-heading">
      <SectionHeading id="instructions-heading" icon={icons.info}>
        Instructions
      </SectionHeading>
      <ol className="mt-4 grid gap-3.5">
        {ordered.map((step, i) => (
          <li
            key={step.id ?? step.order}
            className="flex items-start gap-3 text-sm font-semibold leading-6 text-stone-800 sm:text-base"
          >
            <span
              aria-hidden="true"
              className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-600 text-xs font-bold text-white"
            >
              {i + 1}
            </span>
            {step.instruction}
          </li>
        ))}
      </ol>
    </section>
  )
}

export default InstructionsList

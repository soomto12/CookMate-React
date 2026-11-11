import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

/** The "Add a food" panel. Holds the form, suggestions and any action error. */
function AddAllergenCard({ children }: Props) {
  return (
    <section
      aria-labelledby="add-heading"
      className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-emerald-100 sm:p-6"
    >
      <h2 id="add-heading" className="text-base font-extrabold text-green-950 sm:text-lg">
        Add a food
      </h2>
      {children}
    </section>
  )
}

export default AddAllergenCard

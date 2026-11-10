const bar = 'rounded-md bg-emerald-100'
const pill = 'rounded-full bg-emerald-100'
const circle = 'rounded-full bg-emerald-100'

const ingredientRows = [1, 2, 3, 4, 5]
const stepRows = [1, 2, 3, 4]
const shoppingRows = [1, 2, 3, 4]

function RecipeSkeleton() {
  return (
    <div aria-hidden="true" className="animate-pulse">
      <div className={`aspect-[2/1] w-full rounded-2xl sm:aspect-[21/9] ${bar}`} />

      <div className="pb-8 pt-5">
        <div className="flex items-start gap-4">
          <div className="min-w-0 flex-1">
            <div className={`h-8 w-2/3 sm:h-10 ${bar}`} />
            <div className={`mt-3 h-4 w-full max-w-md ${bar}`} />
            <div className={`mt-2 h-4 w-1/2 max-w-xs ${bar}`} />

            <div className="mt-4 flex flex-wrap gap-2">
              <div className={`h-7 w-20 ${pill}`} />
              <div className={`h-7 w-16 ${pill}`} />
              <div className={`h-7 w-24 ${pill}`} />
            </div>
          </div>

          <div className={`h-11 w-11 shrink-0 ${circle}`} />
        </div>

        <div className="mt-6 grid grid-cols-2 gap-y-5 border-y border-emerald-100 py-5 sm:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-3">
              <div className={`h-6 w-6 shrink-0 ${circle}`} />
              <div className="min-w-0 flex-1">
                <div className={`h-3 w-14 ${bar}`} />
                <div className={`mt-2 h-4 w-20 ${bar}`} />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 grid gap-7 lg:grid-cols-2 lg:gap-10">
          <div>
            <div className={`h-5 w-28 ${bar}`} />
            <div className="mt-4 grid gap-3">
              {ingredientRows.map((i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className={`mt-0.5 h-5 w-5 shrink-0 ${circle}`} />
                  <div className={`h-4 flex-1 ${bar}`} style={{ maxWidth: `${85 - i * 8}%` }} />
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className={`h-5 w-28 ${bar}`} />
            <div className="mt-4 grid gap-3.5">
              {stepRows.map((i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className={`mt-0.5 h-6 w-6 shrink-0 ${circle}`} />
                  <div className={`h-4 flex-1 ${bar}`} style={{ maxWidth: `${95 - i * 6}%` }} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-7 rounded-2xl bg-emerald-50/80 p-5 ring-1 ring-emerald-100 sm:p-6">
          <div className={`h-5 w-32 ${bar}`} />

          <div className="mt-4 flex items-start gap-6">
            <div className="grid min-w-0 flex-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {shoppingRows.map((i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className={`mt-0.5 h-5 w-5 shrink-0 rounded-md bg-emerald-100`} />
                  <div className={`h-4 flex-1 ${bar}`} style={{ maxWidth: `${80 - i * 5}%` }} />
                </div>
              ))}
            </div>

            <div className="hidden h-[147px] w-[147px] shrink-0 rounded-xl bg-emerald-100 sm:block" />
          </div>
        </div>

        <div className={`mt-6 h-14 w-full rounded-2xl ${bar}`} />
      </div>
    </div>
  )
}

export default RecipeSkeleton

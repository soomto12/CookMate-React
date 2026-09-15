import { useNavigate } from 'react-router-dom'
import { features, steps } from './constant/constant'

function App() {
  const navigate = useNavigate()

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-amber-100 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-6 py-4 lg:px-8">
          <a href="#" className="inline-flex items-center gap-2 font-display text-2xl font-extrabold tracking-tight text-stone-900">
            <span className="text-3xl">👨‍🍳</span>
            Cook<span className="text-amber-700">Mate</span>
          </a>

          <nav className="hidden items-center gap-8 text-sm font-medium text-stone-600 md:flex">
            <a href="#how-it-works" className="transition hover:text-amber-700">How it works</a>
            <a href="#features" className="transition hover:text-amber-700">Features</a>
            <a href="#cta" className="transition hover:text-amber-700">Get started</a>
          </nav>

          <button
            type="button"
            onClick={() => navigate('/login')}
            className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-amber-600 to-stone-900 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-amber-900/20 transition hover:-translate-y-0.5"
          >
            Try CookMate
          </button>
        </div>
      </header>

      <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_right,_rgba(245,158,11,0.15),transparent_25%),radial-gradient(circle_at_bottom_left,_rgba(168,85,247,0.12),transparent_30%),linear-gradient(to-b,_#fffaf1,_#ffffff_75%)] py-20 md:py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
          <div className="flex flex-col items-start gap-6">
            <span className="inline-flex items-center rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-amber-700">
              ✨ Your AI kitchen companion
            </span>

            <h1 className="max-w-xl text-5xl leading-none md:text-6xl">
              Turn what&rsquo;s in your kitchen into{' '}
              <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-300 bg-clip-text text-transparent">
                tonight&rsquo;s best meal
              </span>
            </h1>

            <p className="max-w-xl text-lg leading-8 text-stone-600">
              CookMate is an AI that generates step-by-step instructions and full
              recipes for any food you want to cook — built around the ingredients you
              already have.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-amber-600 to-stone-900 px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-amber-900/20 transition hover:-translate-y-0.5"
              >
                Start cooking free
              </button>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center rounded-xl border border-amber-200 bg-white/80 px-6 py-3.5 text-base font-semibold text-amber-700 transition hover:border-amber-300 hover:bg-amber-50"
              >
                See how it works
              </a>
            </div>

            <p className="text-sm text-stone-500">No sign-up needed &middot; Works with any cuisine</p>
          </div>

          <div className="rounded-[28px] border border-amber-100 bg-white p-3 shadow-[0_25px_80px_-30px_rgba(41,27,7,0.45)] ring-1 ring-stone-100" aria-hidden="true">
            <div className="rounded-[22px] border border-amber-100 bg-stone-50/70">
              <div className="flex items-center gap-2 border-b border-amber-100 bg-amber-50/60 px-4 py-3">
                <span className="h-3 w-3 rounded-full bg-amber-300" />
                <span className="h-3 w-3 rounded-full bg-amber-200" />
                <span className="h-3 w-3 rounded-full bg-amber-100" />
              </div>

              <div className="space-y-4 p-5 text-left">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-amber-700">
                    I want to cook
                  </p>
                  <div className="mt-2 rounded-xl bg-white px-4 py-3 text-base font-medium text-stone-800 shadow-sm ring-1 ring-stone-200">
                    🍝 Creamy garlic pasta
                  </div>
                </div>

                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-amber-700">
                    With what I have
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {['Spaghetti', 'Garlic', 'Milk', 'Butter'].map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-xs font-medium text-stone-700"
                      >
                        {tag}
                      </span>
                    ))}
                    <span className="rounded-full border border-dashed border-stone-300 bg-white px-2.5 py-1 text-xs font-medium text-stone-500">
                      + Add
                    </span>
                  </div>
                </div>

                <div className="my-2 h-px bg-gradient-to-r from-transparent via-amber-200 to-transparent" />

                <div>
                  <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-amber-700">
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
                    CookMate&rsquo;s recipe
                  </p>

                  <ol className="mt-3 space-y-3 text-sm leading-6 text-stone-700">
                    <li>
                      <span className="font-semibold text-stone-900">Boil the spaghetti</span> in salted water — 8 min
                    </li>
                    <li>
                      <span className="font-semibold text-stone-900">Sauté minced garlic</span> in butter until golden
                    </li>
                    <li>
                      <span className="font-semibold text-stone-900">Stir in milk</span>, simmer to a silky sauce…
                    </li>
                  </ol>
                </div>

                <div className="mt-5 flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-200" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="mx-auto mb-14 flex max-w-2xl flex-col items-center gap-4 text-center">
            <span className="inline-flex items-center rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-amber-700">
              How it works
            </span>
            <h2 className="text-4xl md:text-5xl">From craving to cooking in 3 steps</h2>
            <p className="text-lg text-stone-600">
              No more staring at the fridge wondering what to make.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {steps.map((s) => (
              <div key={s.num} className="rounded-3xl border border-amber-100 bg-white p-7 shadow-[0_18px_45px_-30px_rgba(41,27,7,0.33)]">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-stone-800 text-lg font-bold text-white">
                  {s.num}
                </div>
                <h3 className="mb-3 text-2xl">{s.title}</h3>
                <p className="text-base leading-7 text-stone-600">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="bg-gradient-to-b from-amber-50 to-white py-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="mx-auto mb-14 flex max-w-2xl flex-col items-center gap-4 text-center">
            <span className="inline-flex items-center rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-amber-700">
              Features
            </span>
            <h2 className="text-4xl md:text-5xl">Everything a great sous-chef should do</h2>
            <p className="text-lg text-stone-600">
              CookMate handles the thinking, so you can enjoy the cooking.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {features.map((f) => (
              <div key={f.title} className="rounded-3xl border border-amber-100 bg-white p-7 shadow-[0_18px_45px_-30px_rgba(41,27,7,0.33)]">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 text-2xl shadow-inner shadow-amber-200/70">
                  {f.icon}
                </div>
                <h3 className="mb-3 text-2xl">{f.title}</h3>
                <p className="text-base leading-7 text-stone-600">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="cta" className="py-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="rounded-[32px] bg-gradient-to-r from-stone-900 via-stone-800 to-amber-800 px-8 py-12 text-center text-white shadow-[0_28px_60px_-30px_rgba(41,27,7,0.6)] md:px-14">
            <h2 className="mb-4 text-4xl md:text-5xl">Ready to cook smarter?</h2>
            <p className="mx-auto max-w-2xl text-lg text-stone-200">
              Tell CookMate what you&rsquo;re craving and what&rsquo;s in your kitchen —
              get a perfect recipe in seconds.
            </p>
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="mt-8 inline-flex items-center justify-center rounded-xl bg-white px-6 py-3.5 text-base font-semibold text-amber-700 shadow-lg shadow-stone-950/20 transition hover:-translate-y-0.5"
            >
              Get your first recipe →
            </button>
          </div>
        </div>
      </section>

      <footer className="border-t border-stone-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-8 text-sm text-stone-600 md:flex-row lg:px-8">
          <a href="#" className="inline-flex items-center gap-2 font-display text-xl font-extrabold tracking-tight text-stone-900">
            <span className="text-2xl">👨‍🍳</span>
            Cook<span className="text-amber-700">Mate</span>
          </a>
          <p>© {new Date().getFullYear()} CookMate. Cook anything, anytime.</p>
        </div>
      </footer>
    </>
  )
}

export default App

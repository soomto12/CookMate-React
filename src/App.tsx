import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from './assets/Mealio Green Fork Logo.png'
import heroImage from './assets/Fresh Ingredients, Smart Recipes.png'
import cartIcon from './assets/56435801566419841.jpg'
import micIcon from './assets/381820874662373978.jpg'
import cameraIcon from './assets/876653883744750949.jpg'
import heartIcon from './assets/Heart-119.jpg'

function App() {
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <header className="font-jakarta">
        <div className="mb-6 flex w-full flex-row items-center gap-3 px-4 py-4 sm:px-6 md:mb-10 md:px-8 md:py-6 lg:pl-6 xl:pl-10">
          <a href="#home" className="inline-flex items-center gap-2 text-xl font-extrabold md:text-3xl">
            <img src={logo} alt="" className="h-16 w-16 md:h-24 md:w-24" />
            Mealio
          </a>

          <nav className="hidden flex-row items-center gap-8 pl-4 font-bold md:flex lg:pl-10">
            <a href="#home">Home</a>
            <a href="#features">Features</a>
            <a href="#how-it-works">How It Works</a>
            <a href="#pricing">Pricing</a>
            <a href="#faq">FAQ</a>
          </nav>

          <div className="ml-auto hidden flex-row items-center gap-3 text-base font-bold md:flex">
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="rounded-full border-2 border-green-800 bg-white px-6 py-2.5 text-green-800 transition hover:bg-green-50"
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="rounded-full border-2 border-green-800 bg-green-800 px-6 py-2.5 text-white transition hover:bg-green-900"
            >
              Get Started Free
            </button>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="ml-auto flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-full border-2 border-green-800 text-green-800 transition hover:bg-green-50 md:hidden"
          >
            <span className={`h-0.5 w-5 rounded bg-current transition ${menuOpen ? 'translate-y-2 rotate-45' : ''}`} />
            <span className={`h-0.5 w-5 rounded bg-current transition ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`h-0.5 w-5 rounded bg-current transition ${menuOpen ? '-translate-y-2 -rotate-45' : ''}`} />
          </button>
        </div>

        {menuOpen && (
          <div id="mobile-menu" className="mx-4 mb-6 rounded-2xl border border-emerald-100 bg-white p-4 shadow-lg md:hidden">
            <nav className="flex flex-col font-bold text-stone-900">
              {[
                ['#home', 'Home'],
                ['#features', 'Features'],
                ['#how-it-works', 'How It Works'],
                ['#pricing', 'Pricing'],
                ['#faq', 'FAQ'],
              ].map(([href, label]) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-xl px-3 py-3 hover:bg-emerald-50"
                >
                  {label}
                </a>
              ))}
            </nav>
            <div className="mt-3 flex flex-col gap-2 border-t border-emerald-100 pt-4 text-sm font-bold">
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="rounded-full border-2 border-green-800 bg-white px-4 py-2.5 text-green-800 transition hover:bg-green-50"
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="rounded-full border-2 border-green-800 bg-green-800 px-4 py-2.5 text-white transition hover:bg-green-900"
              >
                Get Started Free
              </button>
            </div>
          </div>
        )}
      </header>

      <main>
        <section id="home" className="relative overflow-hidden">
          <div className="relative z-10 flex w-full flex-row items-center gap-4 px-4 sm:px-6 md:px-8 lg:pl-6 xl:pl-10">
            <div className="flex flex-col gap-8 md:w-1/2 lg:w-[42%]">
              <div className="text-center font-jakarta md:text-left">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-green-800 ring-1 ring-emerald-100">
                  <span aria-hidden="true">✦</span>
                  AI-Powered Cooking Assistant
                </span>
                <h1 className="mt-5 font-jakarta text-4xl font-extrabold leading-[1.1] tracking-tight text-stone-900 md:text-5xl lg:text-6xl">
                  Turn Your Ingredients Into <span className="text-green-700">Amazing Meals</span>
                </h1>
                <p className="mx-auto mt-5 max-w-md text-base md:mx-0 leading-7 text-slate-600 md:text-lg md:leading-8">
                  Mealio helps you create delicious, personalized meals from what you already
                  have. Save time, reduce food waste, and eat better — with the power of AI.
                </p>
                <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm font-bold md:justify-start md:text-base">
                  <button
                    type="button"
                    onClick={() => navigate('/login')}
                    className="rounded-full bg-green-800 px-6 py-3 text-white shadow-lg shadow-green-900/20 transition hover:bg-green-900"
                  >
                    Get Started Free →
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-6 py-3 text-green-800 transition hover:bg-green-50"
                  >
                    <span className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-green-800 text-[8px] leading-none">
                      ▶
                    </span>
                    Watch Demo
                  </button>
                </div>
              </div>

              <ul id="features" className="mt-4 grid grid-cols-2 gap-x-6 gap-y-8 font-jakarta lg:grid-cols-4 lg:gap-x-5">
                <li className="flex flex-col items-center gap-3 text-center md:items-start md:text-left">
                  <span className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-emerald-200 text-xl ring-1 ring-emerald-300">
                    <img src={cameraIcon} alt="" className="h-6 w-6 object-contain mix-blend-multiply" />
                  </span>
                  <h3 className="text-sm font-bold leading-snug text-stone-900">
                    AI Recipe Generation
                  </h3>
                  <p className="text-xs leading-5 text-slate-500">
                    Get meal ideas from your available ingredients.
                  </p>
                </li>
                <li className="flex flex-col items-center gap-3 text-center md:items-start md:text-left">
                  <span className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-emerald-200 text-xl ring-1 ring-emerald-300">
                    <img src={cartIcon} alt="" className="h-6 w-6 object-contain mix-blend-multiply" />
                  </span>
                  <h3 className="text-sm font-bold leading-snug text-stone-900">
                    Smart Shopping List
                  </h3>
                  <p className="text-xs leading-5 text-slate-500">Never forget what you need.</p>
                </li>
                <li className="flex flex-col items-center gap-3 text-center md:items-start md:text-left">
                  <span className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-emerald-200 text-xl ring-1 ring-emerald-300">
                    <img src={micIcon} alt="" className="h-6 w-6 object-contain mix-blend-multiply" />
                  </span>
                  <h3 className="text-sm font-bold leading-snug text-stone-900">
                    Voice Assistant
                  </h3>
                  <p className="text-xs leading-5 text-slate-500">
                    Cook hands-free with simple voice commands.
                  </p>
                </li>
                <li className="flex flex-col items-center gap-3 text-center md:items-start md:text-left">
                  <span className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-emerald-200 text-xl ring-1 ring-emerald-300">
                    <img src={heartIcon} alt="" className="h-6 w-6 object-contain mix-blend-multiply" />
                  </span>
                  <h3 className="text-sm font-bold leading-snug text-stone-900">
                    Healthy &amp; Balanced
                  </h3>
                  <p className="text-xs leading-5 text-slate-500">
                    Nutritious meals for your goals.
                  </p>
                </li>
              </ul>
            </div>

            <div className="hidden flex-1 md:block" aria-hidden="true" />
          </div>
          <img
            src={heroImage}
            alt="Fresh ingredients, smart recipes"
            className="mt-8 w-full md:hidden"
          />
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[58%] items-center justify-end md:flex">
            <img src={heroImage} alt="" aria-hidden="true" className="h-full w-full object-cover object-left" />
          </div>
        </section>

        <section id="how-it-works" className="bg-emerald-50/60 font-jakarta">
          <div className="flex w-full flex-col gap-12 px-4 py-14 sm:px-6 md:px-8 lg:flex-row lg:items-center lg:gap-10 lg:pl-6 xl:pl-10">
            <div className="flex flex-col items-start lg:w-[36%]">
              <span className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-bold text-green-800">
                How It Works
              </span>
              <h2 className="mt-4 font-jakarta text-3xl font-extrabold leading-tight tracking-tight text-stone-900 md:text-4xl">
                From Ingredients to Delicious Meals in 4 Simple Steps
              </h2>
              <p className="mt-4 max-w-sm text-base leading-7 text-slate-600">
                Get personalized recipes, create your shopping list, and enjoy great meals —
                all in one place.
              </p>
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="mt-7 rounded-full bg-green-800 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-green-900/20 transition hover:bg-green-900"
              >
                Get Started Free →
              </button>
            </div>

            <ol className="grid flex-1 grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
              {[
                { icon: '🥣', title: 'Add Your Ingredients', text: 'Enter what you have or select from your pantry.' },
                { icon: '✨', title: 'Let AI Work Its Magic', text: 'Get personalized recipes based on your ingredients.' },
                { icon: <img src={cartIcon} alt="" className="h-9 w-9 object-contain mix-blend-multiply" />, title: 'Check Your Shopping List', text: 'Add missing ingredients to your list with one click.' },
                { icon: '🍴', title: 'Cook & Enjoy', text: 'Follow easy step-by-step instructions and enjoy your meal!' },
              ].map((step, i) => (
                <li key={step.title} className="flex flex-col items-center gap-3 text-center">
                  <div className="relative">
                    <span className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-emerald-100 text-3xl ring-1 ring-emerald-200/60">
                      {step.icon}
                    </span>
                    <span className="absolute -left-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-green-800 text-xs font-bold text-white ring-2 ring-white">
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="font-jakarta text-sm font-bold leading-snug text-stone-900">{step.title}</h3>
                  <p className="max-w-[11rem] text-xs leading-5 text-slate-500">{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="why-mealio">
          <div>
            <span>Why Mealio?</span>
            <h2>Better Food Choices. A Healthier You.</h2>
            <p>
              Mealio isn&rsquo;t just about recipes — it&rsquo;s about making your life easier,
              healthier, and more enjoyable.
            </p>
            <ul>
              <li>✔ Save time on meal planning</li>
              <li>✔ Eat healthier and balanced meals</li>
              <li>✔ Reduce food waste</li>
              <li>✔ Discover new recipes</li>
            </ul>
          </div>

          <div>
            <p>Good food, Good mood</p>
            <img src="" alt="Grilled chicken with roasted vegetables and rice" />
          </div>
        </section>

        <section id="testimonials">
          <span>Loved by Foodies Everywhere</span>
          <h2>What Our Users Say</h2>
          <p>Join thousands of people who are already cooking smarter with Mealio.</p>

          <ul>
            <li>
              <img src="" alt="Chinwe A." />
              <blockquote>
                &ldquo;Mealio has completely changed the way I cook. I never waste food
                anymore, and the recipes are actually delicious!&rdquo;
              </blockquote>
              <p>Chinwe A.</p>
              <p>Student</p>
              <p aria-label="5 out of 5 stars">★★★★★</p>
            </li>
            <li>
              <img src="" alt="Daniel K." />
              <blockquote>
                &ldquo;The AI recipe generator is amazing! I just enter what I have in my
                fridge and get great meal ideas. Super easy to use.&rdquo;
              </blockquote>
              <p>Daniel K.</p>
              <p>Software Developer</p>
              <p aria-label="5 out of 5 stars">★★★★★</p>
            </li>
            <li>
              <img src="" alt="Ada E." />
              <blockquote>
                &ldquo;I love the shopping list feature. It saves me so much time and helps
                me stay organized. Highly recommend!&rdquo;
              </blockquote>
              <p>Ada E.</p>
              <p>Business Owner</p>
              <p aria-label="5 out of 5 stars">★★★★★</p>
            </li>
          </ul>
        </section>

        <section id="cta">
          <h2>Ready to Cook Smarter?</h2>
          <p>Join Mealio today and turn your ingredients into amazing meals!</p>
          <button type="button" onClick={() => navigate('/login')}>Get Started Free →</button>
        </section>
      </main>
    </>
  )
}

export default App

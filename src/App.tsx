import { useNavigate } from 'react-router-dom'
import './App.css'

const features = [
  {
    icon: '🥕',
    title: 'Cook with what you have',
    text: 'Tell CookMate the ingredients in your kitchen — it builds a recipe around them. No extra shopping trips.',
  },
  {
    icon: '🧭',
    title: 'Step-by-step guidance',
    text: 'Clear, numbered instructions with timings and tips, so you always know exactly what to do next.',
  },
  {
    icon: '⚡',
    title: 'Recipes in seconds',
    text: 'Type the dish, get a full recipe instantly — ingredients, quantities, prep and cook times.',
  },
  {
    icon: '🔁',
    title: 'Smart substitutions',
    text: 'Missing something? CookMate suggests swaps that keep the flavor on track.',
  },
  {
    icon: '🍽️',
    title: 'Any cuisine, any skill level',
    text: 'From 10-minute noodles to slow-cooked jollof — instructions adapt to your experience.',
  },
  {
    icon: '📏',
    title: 'Portion-perfect',
    text: 'Scaling for 1 or 10? Quantities adjust automatically to the servings you need.',
  },
]

const steps = [
  {
    num: '1',
    title: 'Tell us the dish',
    text: 'Type any meal you’re craving — "creamy pasta", "jollof rice", "chicken curry".',
  },
  {
    num: '2',
    title: 'List your ingredients',
    text: 'Add what you have available. CookMate works with your kitchen, not against it.',
  },
  {
    num: '3',
    title: 'Cook with confidence',
    text: 'Follow a tailored, step-by-step recipe generated just for you. Dinner, solved.',
  },
]

function App() {
  const navigate = useNavigate()

  return (
    <>
      {/* ─── Navbar ─── */}
      <header className="nav">
        <div className="container nav-inner">
          <a href="#" className="brand">
            <span className="brand-mark">👨‍🍳</span>
            Cook<span className="brand-accent">Mate</span>
          </a>
          <nav className="nav-links">
            <a href="#how-it-works">How it works</a>
            <a href="#features">Features</a>
            <a href="#cta">Get started</a>
          </nav>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => navigate('/login')}
          >
            Try CookMate
          </button>
        </div>
      </header>

      {/* ─── Hero ─── */}
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-copy">
            <span className="badge">✨ Your AI kitchen companion</span>
            <h1>
              Turn what&rsquo;s in your kitchen into{' '}
              <span className="gradient-text">tonight&rsquo;s best meal</span>
            </h1>
            <p className="hero-sub">
              CookMate is an AI that generates step-by-step instructions and
              full recipes for any food you want to cook — built around the
              ingredients you already have.
            </p>
            <div className="hero-actions">
              <button
                className="btn btn-primary btn-lg"
                onClick={() => navigate('/login')}
              >
                Start cooking free
              </button>
              <button className="btn btn-ghost btn-lg">See how it works</button>
            </div>
            <p className="hero-note">
              No sign-up needed &middot; Works with any cuisine
            </p>
          </div>

          {/* Demo card */}
          <div className="demo-card" aria-hidden="true">
            <div className="demo-header">
              <span className="demo-dot" />
              <span className="demo-dot" />
              <span className="demo-dot" />
            </div>
            <div className="demo-body">
              <p className="demo-label">I want to cook</p>
              <div className="demo-dish">🍝 Creamy garlic pasta</div>
              <p className="demo-label">With what I have</p>
              <div className="demo-chips">
                <span className="chip">Spaghetti</span>
                <span className="chip">Garlic</span>
                <span className="chip">Milk</span>
                <span className="chip">Butter</span>
                <span className="chip">+ Add</span>
              </div>
              <div className="demo-divider" />
              <p className="demo-label">
                <span className="pulse-dot" /> CookMate&rsquo;s recipe
              </p>
              <ol className="demo-steps">
                <li>
                  <strong>Boil the spaghetti</strong> in salted water — 8 min
                </li>
                <li>
                  <strong>Saut&eacute; minced garlic</strong> in butter until
                  golden
                </li>
                <li>
                  <strong>Stir in milk</strong>, simmer to a silky sauce…
                </li>
              </ol>
              <div className="demo-typing">
                <span />
                <span />
                <span />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── How it works ─── */}
      <section id="how-it-works" className="section">
        <div className="container">
          <div className="section-head">
            <span className="badge">How it works</span>
            <h2>From craving to cooking in 3 steps</h2>
            <p className="section-sub">
              No more staring at the fridge wondering what to make.
            </p>
          </div>
          <div className="steps-grid">
            {steps.map((s) => (
              <div className="step-card" key={s.num}>
                <div className="step-num">{s.num}</div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Features ─── */}
      <section id="features" className="section section-tinted">
        <div className="container">
          <div className="section-head">
            <span className="badge">Features</span>
            <h2>Everything a great sous-chef should do</h2>
            <p className="section-sub">
              CookMate handles the thinking, so you can enjoy the cooking.
            </p>
          </div>
          <div className="features-grid">
            {features.map((f) => (
              <div className="feature-card" key={f.title}>
                <div className="feature-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section id="cta" className="section">
        <div className="container">
          <div className="cta-banner">
            <h2>Ready to cook smarter?</h2>
            <p>
              Tell CookMate what you&rsquo;re craving and what&rsquo;s in your
              kitchen — get a perfect recipe in seconds.
            </p>
            <button
              className="btn btn-light btn-lg"
              onClick={() => navigate('/login')}
            >
              Get your first recipe →
            </button>
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="footer">
        <div className="container footer-inner">
          <a href="#" className="brand brand-sm">
            <span className="brand-mark">👨‍🍳</span>
            Cook<span className="brand-accent">Mate</span>
          </a>
          <p>© {new Date().getFullYear()} CookMate. Cook anything, anytime.</p>
        </div>
      </footer>
    </>
  )
}

export default App

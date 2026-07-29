import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Login.css'

const API_BASE = 'http://localhost:3000/api/auth'

function Login() {
  const navigate = useNavigate()
  const [mode, setMode] = useState('login') // 'login' | 'signup'
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setError('')
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  const switchMode = (next) => {
    setError('')
    setMode(next)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const endpoint = mode === 'signup' ? '/signup' : '/login'
    const payload =
      mode === 'signup'
        ? { name: form.name, email: form.email, password: form.password }
        : { email: form.email, password: form.password }

    try {
      const res = await fetch(`${API_BASE}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await res.json().catch(() => ({}))

      if (!res.ok) {
        // Backend returns errors as { error: "..." }
        throw new Error(
          data.error || data.message || `Request failed (${res.status})`,
        )
      }

      // Persist token + user if the backend returns them.
      if (data.token) {
        localStorage.setItem('cookmate_token', data.token)
      }
      if (data.user) {
        localStorage.setItem('cookmate_user', JSON.stringify(data.user))
      }

      // Success — send the user into the app.
      navigate('/app')
    } catch (err) {
      setError(
        err.message === 'Failed to fetch'
          ? 'Could not reach the server. Is it running on localhost:3000?'
          : err.message,
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth">
      {/* ─── Left brand panel ─── */}
      <aside className="auth-aside">
        <Link to="/" className="brand brand-light">
          <span className="brand-mark">👨‍🍳</span>
          Cook<span className="brand-accent-light">Mate</span>
        </Link>

        <div className="auth-aside-body">
          <h2>Cook anything with what you already have.</h2>
          <p>
            Tell CookMate the dish and your ingredients — get a full,
            step-by-step recipe in seconds.
          </p>

          <ul className="auth-points">
            <li>
              <span>🥕</span> Recipes built around your ingredients
            </li>
            <li>
              <span>🧭</span> Clear step-by-step instructions
            </li>
            <li>
              <span>⚡</span> Ready in seconds, any cuisine
            </li>
          </ul>
        </div>

        <p className="auth-aside-foot">Your AI kitchen companion</p>
      </aside>

      {/* ─── Right form panel ─── */}
      <main className="auth-main">
        <div className="auth-card">
          <Link to="/" className="brand brand-mobile">
            <span className="brand-mark">👨‍🍳</span>
            Cook<span className="brand-accent">Mate</span>
          </Link>

          <div className="auth-tabs">
            <button
              className={mode === 'login' ? 'active' : ''}
              onClick={() => switchMode('login')}
              type="button"
            >
              Log in
            </button>
            <button
              className={mode === 'signup' ? 'active' : ''}
              onClick={() => switchMode('signup')}
              type="button"
            >
              Sign up
            </button>
          </div>

          <h1>
            {mode === 'login' ? 'Welcome back' : 'Create your account'}
          </h1>
          <p className="auth-sub">
            {mode === 'login'
              ? 'Log in to start cooking with CookMate.'
              : 'Sign up free — no credit card needed.'}
          </p>

          <form onSubmit={handleSubmit} className="auth-form">
            {mode === 'signup' && (
              <label className="field">
                <span>Full name</span>
                <input
                  type="text"
                  name="name"
                  placeholder="Jane Doe"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </label>
            )}

            <label className="field">
              <span>Email</span>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </label>

            <label className="field">
              <span>Password</span>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                minLength={8}
                required
              />
              {mode === 'signup' && (
                <span className="field-hint">At least 8 characters</span>
              )}
            </label>

            {mode === 'login' && (
              <a href="#" className="auth-forgot">
                Forgot password?
              </a>
            )}

            {error && <p className="auth-error">{error}</p>}

            <button
              type="submit"
              className="btn btn-primary btn-lg auth-submit"
              disabled={loading}
            >
              {loading
                ? 'Please wait…'
                : mode === 'login'
                  ? 'Log in'
                  : 'Create account'}
            </button>
          </form>

          <div className="auth-divider">
            <span>or continue with</span>
          </div>

          <div className="auth-socials">
            <button type="button" className="social-btn">
              <span>G</span> Google
            </button>
            <button type="button" className="social-btn">
              <span></span> Apple
            </button>
          </div>

          <p className="auth-switch">
            {mode === 'login' ? (
              <>
                New to CookMate?{' '}
                <button type="button" onClick={() => switchMode('signup')}>
                  Create an account
                </button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button type="button" onClick={() => switchMode('login')}>
                  Log in
                </button>
              </>
            )}
          </p>

          <button
            type="button"
            className="auth-back"
            onClick={() => navigate('/')}
          >
            ← Back to home
          </button>
        </div>
      </main>
    </div>
  )
}

export default Login

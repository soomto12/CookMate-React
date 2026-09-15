import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getErrorMessage } from '../types'

const API_BASE = 'http://localhost:3000/api/auth'

type AuthMode = 'login' | 'signup'

interface AuthForm {
  name: string
  email: string
  password: string
}

function Login() {
  const navigate = useNavigate()
  const [mode, setMode] = useState<AuthMode>('login')
  const [form, setForm] = useState<AuthForm>({ name: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setError('')
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  const switchMode = (next: AuthMode) => {
    setError('')
    setMode(next)
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
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
        throw new Error(
          data.error || data.message || `Request failed (${res.status})`,
        )
      }

      if (data.token) {
        localStorage.setItem('cookmate_token', data.token)
      }
      if (data.user) {
        localStorage.setItem('cookmate_user', JSON.stringify(data.user))
      }

      navigate('/app')
    } catch (err) {
      const message = getErrorMessage(err)
      setError(
        message === 'Failed to fetch'
          ? 'Could not reach the server. Is it running on localhost:3000?'
          : message,
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(245,158,11,0.18),transparent_20%),linear-gradient(to-br,_#fffaf1,_#ffffff_50%,_#fff7ed)] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl overflow-hidden rounded-[32px] border border-amber-100 bg-white/80 shadow-[0_30px_80px_-30px_rgba(41,27,7,0.4)] backdrop-blur-sm lg:grid-cols-[0.95fr_1.05fr]">
        <aside className="relative overflow-hidden bg-gradient-to-br from-stone-950 via-stone-900 to-amber-900 p-8 text-white lg:p-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(245,158,11,0.3),transparent_30%)]" />
          <div className="relative flex h-full flex-col">
            <Link to="/" className="inline-flex items-center gap-2 font-display text-3xl font-extrabold tracking-tight text-white">
              <span className="text-4xl">👨‍🍳</span>
              Cook<span className="text-amber-300">Mate</span>
            </Link>

            <div className="mt-12 space-y-7">
              <div>
                <h2 className="text-4xl leading-tight">Cook anything with what you already have.</h2>
                <p className="mt-4 text-base leading-7 text-stone-200">
                  Tell CookMate the dish and your ingredients — get a full, step-by-step recipe in seconds.
                </p>
              </div>

              <ul className="space-y-4 text-base text-stone-100">
                <li className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <span className="text-xl">🥕</span>
                  Recipes built around your ingredients
                </li>
                <li className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <span className="text-xl">🧭</span>
                  Clear step-by-step instructions
                </li>
                <li className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <span className="text-xl">⚡</span>
                  Ready in seconds, any cuisine
                </li>
              </ul>
            </div>

            <p className="relative mt-auto pt-8 text-sm text-stone-300">Your AI kitchen companion</p>
          </div>
        </aside>

        <main className="flex items-center justify-center bg-white p-6 sm:p-8 lg:p-10">
          <div className="w-full max-w-md">
            <Link to="/" className="mb-6 inline-flex items-center gap-2 font-display text-2xl font-extrabold tracking-tight text-stone-900 lg:hidden">
              <span className="text-3xl">👨‍🍳</span>
              Cook<span className="text-amber-700">Mate</span>
            </Link>

            <div className="mb-8 grid w-full grid-cols-2 rounded-2xl border border-stone-200 bg-stone-100 p-1">
              <button
                type="button"
                onClick={() => switchMode('login')}
                className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition ${mode === 'login' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500'}`}
              >
                Log in
              </button>
              <button
                type="button"
                onClick={() => switchMode('signup')}
                className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition ${mode === 'signup' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500'}`}
              >
                Sign up
              </button>
            </div>

            <div className="mb-6">
              <h1 className="text-4xl text-stone-900">
                {mode === 'login' ? 'Welcome back' : 'Create your account'}
              </h1>
              <p className="mt-2 text-base text-stone-600">
                {mode === 'login'
                  ? 'Log in to start cooking with CookMate.'
                  : 'Sign up free — no credit card needed.'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {mode === 'signup' && (
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-stone-700">Full name</span>
                  <input
                    type="text"
                    name="name"
                    placeholder="Jane Doe"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-100"
                  />
                </label>
              )}

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-stone-700">Email</span>
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-100"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-stone-700">Password</span>
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  minLength={8}
                  required
                  className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-100"
                />
                {mode === 'signup' && (
                  <span className="mt-2 block text-xs text-stone-500">At least 8 characters</span>
                )}
              </label>

              {mode === 'login' && (
                <div className="text-right">
                  <a href="#" className="text-sm font-medium text-amber-700 hover:text-amber-800">
                    Forgot password?
                  </a>
                </div>
              )}

              {error && <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-amber-600 to-stone-900 px-4 py-3.5 text-base font-semibold text-white shadow-lg shadow-amber-900/20 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? 'Please wait…' : mode === 'login' ? 'Log in' : 'Create account'}
              </button>
            </form>

            <div className="my-6 flex items-center gap-4 text-xs uppercase tracking-[0.2em] text-stone-400">
              <span className="h-px flex-1 bg-stone-200" />
              <span>or continue with</span>
              <span className="h-px flex-1 bg-stone-200" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button type="button" className="inline-flex items-center justify-center gap-2 rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm font-medium text-stone-700 transition hover:border-stone-300 hover:bg-stone-50">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-amber-100 text-[11px] font-bold text-amber-700">G</span>
                Google
              </button>
              <button type="button" className="inline-flex items-center justify-center gap-2 rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm font-medium text-stone-700 transition hover:border-stone-300 hover:bg-stone-50">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-stone-100 text-[11px] font-bold text-stone-700"></span>
                Apple
              </button>
            </div>

            <p className="mt-7 text-center text-sm text-stone-600">
              {mode === 'login' ? (
                <>
                  New to CookMate?{' '}
                  <button type="button" onClick={() => switchMode('signup')} className="font-semibold text-amber-700 hover:text-amber-800">
                    Create an account
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{' '}
                  <button type="button" onClick={() => switchMode('login')} className="font-semibold text-amber-700 hover:text-amber-800">
                    Log in
                  </button>
                </>
              )}
            </p>

            <button
              type="button"
              onClick={() => navigate('/')}
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-stone-500 transition hover:text-amber-700"
            >
              ← Back to home
            </button>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Login

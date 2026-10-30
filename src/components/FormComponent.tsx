import { useState } from 'react'
import type { ChangeEvent, SyntheticEvent } from 'react'
import logo from '../assets/Mealio Green Fork Logo.png'

export type FormMode = 'login' | 'signup'

export interface FormValues {
  name: string
  email: string
  password: string
}

type FormErrors = Partial<Record<'name' | 'email' | 'password', string>>

interface FormComponentProps {
  initialMode?: FormMode
  loading?: boolean
  error?: string
  onSubmit?: (mode: FormMode, values: FormValues) => void | Promise<void>
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const inputClass = (invalid: boolean) =>
  `h-12 w-full rounded-lg border bg-white pl-11 pr-4 text-sm text-stone-900 outline-none transition placeholder:text-stone-500/70 hover:border-stone-300 focus:border-green-600 focus:ring-4 focus:ring-green-600/15 ${
    invalid ? 'border-red-400 focus:border-red-500 focus:ring-red-100' : 'border-stone-200'
  }`

function validate(mode: FormMode, values: FormValues): FormErrors {
  const errors: FormErrors = {}

  if (mode === 'signup' && !values.name.trim()) errors.name = 'Enter your full name'
  if (!values.email.trim()) errors.email = 'Enter your email address'
  else if (!EMAIL_PATTERN.test(values.email.trim())) errors.email = 'Enter a valid email address'
  if (!values.password) errors.password = 'Enter your password'
  else if (mode === 'signup' && values.password.length < 8)
    errors.password = 'Use at least 8 characters'

  return errors
}

function FormComponent({
  initialMode = 'login',
  loading = false,
  error = '',
  onSubmit,
}: FormComponentProps) {
  const [mode, setMode] = useState<FormMode>(initialMode)
  const [values, setValues] = useState<FormValues>({
    name: '',
    email: '',
    password: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [showPassword, setShowPassword] = useState(false)

  const isLogin = mode === 'login'

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setValues((v) => ({ ...v, [name]: value }))
    setErrors((errs) => ({ ...errs, [name]: undefined }))
  }

  const switchMode = (next: FormMode) => {
    setMode(next)
    setErrors({})
  }

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    const found = validate(mode, values)
    setErrors(found)
    if (Object.keys(found).length > 0) return
    await onSubmit?.(mode, values)
  }

  return (
    <div className="mx-auto w-full max-w-[440px] font-jakarta">
      <img src={logo} alt="Mealio" className="mx-auto h-28 w-28 object-contain sm:h-32 sm:w-32" />
      <p className="mt-3 text-center text-sm text-stone-500">Smart Cooking. Healthier Living.</p>

      <div className="mt-8 rounded-2xl border border-stone-200 bg-white p-5 shadow-sm sm:p-7">
      <div className="grid grid-cols-2 gap-2" role="tablist">
        {(['login', 'signup'] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            role="tab"
            aria-selected={mode === tab}
            onClick={() => switchMode(tab)}
            className={`h-11 rounded-lg border text-sm font-semibold outline-none transition focus-visible:ring-4 focus-visible:ring-green-600/25 ${
              mode === tab
                ? 'border-green-700 bg-green-700 text-white'
                : 'border-stone-200 bg-white text-stone-900 hover:bg-stone-50'
            }`}
          >
            {tab === 'login' ? 'Log In' : 'Sign Up'}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
        {!isLogin && (
          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-medium text-stone-900">
              Full name
            </label>
            <div className="relative">
              <UserIcon />
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Jane Doe"
                value={values.name}
                onChange={handleChange}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'name-error' : undefined}
                className={inputClass(!!errors.name)}
              />
            </div>
            {errors.name && <p id="name-error" className="mt-1.5 text-xs text-red-600">{errors.name}</p>}
          </div>
        )}

        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium text-stone-900">
            Email address
          </label>
          <div className="relative">
            <MailIcon />
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={values.email}
              onChange={handleChange}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'email-error' : undefined}
              className={inputClass(!!errors.email)}
            />
          </div>
          {errors.email && <p id="email-error" className="mt-1.5 text-xs text-red-600">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="password" className="mb-2 block text-sm font-medium text-stone-900">
            Password
          </label>
          <div className="relative">
            <LockIcon />
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete={isLogin ? 'current-password' : 'new-password'}
              placeholder="Enter your password"
              value={values.password}
              onChange={handleChange}
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? 'password-error' : undefined}
              className={`${inputClass(!!errors.password)} pr-11`}
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 transition hover:text-green-700"
            >
              <EyeIcon off={!showPassword} />
            </button>
          </div>
          {errors.password && <p id="password-error" className="mt-1.5 text-xs text-red-600">{errors.password}</p>}
          {!isLogin && !errors.password && (
            <p className="mt-1.5 text-xs text-stone-500">At least 8 characters</p>
          )}
        </div>

        {error && (
          <p role="alert" className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="h-12 w-full rounded-lg bg-green-700 text-base font-semibold text-white outline-none transition hover:bg-green-800 focus-visible:ring-4 focus-visible:ring-green-600/30 active:bg-green-900 disabled:cursor-not-allowed disabled:bg-green-700/60"
        >
          {loading ? 'Please wait…' : isLogin ? 'Log In' : 'Create Account'}
        </button>
      </form>

      <p className="mt-5 text-center text-sm text-stone-600">
        {isLogin ? "Don't have an account? " : 'Already have an account? '}
        <button
          type="button"
          onClick={() => switchMode(isLogin ? 'signup' : 'login')}
          className="font-semibold text-green-700 hover:text-green-800"
        >
          {isLogin ? 'Sign up' : 'Log in'}
        </button>
      </p>
      </div>
    </div>
  )
}

const iconClass = 'pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-stone-500'

function MailIcon() {
  return (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  )
}

function LockIcon() {
  return (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="4" y="11" width="16" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  )
}

function UserIcon() {
  return (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </svg>
  )
}

function EyeIcon({ off }: { off: boolean }) {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
      <circle cx="12" cy="12" r="3" />
      {off && <path d="m3 3 18 18" />}
    </svg>
  )
}

export default FormComponent

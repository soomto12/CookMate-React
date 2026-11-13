import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import FormComponent from '../components/FormComponent'
import { AUTH_URL } from '../generateConstants'
import { saveSession, SESSION_EXPIRED_MESSAGE } from '../session'
import type { AuthResponse, FormMode, FormValues } from '../types'
import { getErrorMessage } from '../types'


function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const [loading, setLoading] = useState(false)

  // Where RequireAuth sent them from, if a guarded page bounced them here,
  // and whether it was because the server rejected their token.
  const { from, expired } = (location.state as { from?: string; expired?: boolean } | null) ?? {}

  const [error, setError] = useState(expired ? SESSION_EXPIRED_MESSAGE : '')

  const handleSubmit = async (mode: FormMode, { name, email, password }: FormValues) => {
    setLoading(true)
    setError('')

    const payload = mode === 'signup' ? { name, email, password } : { email, password }

    try {
      const res = await fetch(`${AUTH_URL}/${mode}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data: AuthResponse = await res.json().catch(() => ({}))

      if (!res.ok) {
        throw new Error(data.error || data.message || `Request failed (${res.status})`)
      }

      saveSession(data.token, data.user)

      navigate(mode === 'signup' ? '/allergens' : (from ?? '/app'), { replace: true })
    } catch (err) {
      const message = getErrorMessage(err)
      setError(
        message === 'Failed to fetch'
          ? 'Could not reach the server. Please try again later.'
          : message,
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f7faf8] px-4 py-8 sm:py-12">
      <FormComponent loading={loading} error={error} onSubmit={handleSubmit} />
    </div>
  )
}

export default Login

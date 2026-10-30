import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FormComponent from '../components/FormComponent'
import type { FormMode, FormValues } from '../components/FormComponent'
import type { CookMateUser } from '../types'
import { getErrorMessage } from '../types'

const API_BASE = 'http://localhost:3000/api/auth'

interface AuthResponse {
  token?: string
  user?: CookMateUser
  error?: string
  message?: string
}

function Login() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (mode: FormMode, { name, email, password }: FormValues) => {
    setLoading(true)
    setError('')

    const payload = mode === 'signup' ? { name, email, password } : { email, password }

    try {
      const res = await fetch(`${API_BASE}/${mode}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data: AuthResponse = await res.json().catch(() => ({}))

      if (!res.ok) {
        throw new Error(data.error || data.message || `Request failed (${res.status})`)
      }

      if (data.token) localStorage.setItem('cookmate_token', data.token)
      if (data.user) localStorage.setItem('cookmate_user', JSON.stringify(data.user))

      navigate(mode === 'signup' ? '/allergens' : '/app')
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
    <div className="flex min-h-screen items-center justify-center bg-[#f7faf8] px-4 py-8 sm:py-12">
      <FormComponent loading={loading} error={error} onSubmit={handleSubmit} />
    </div>
  )
}

export default Login

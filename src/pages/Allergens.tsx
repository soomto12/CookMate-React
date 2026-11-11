import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AllergenSearch from '../components/allergenSetup/AllergenSearch'
import CommonAllergensGrid from '../components/allergenSetup/CommonAllergensGrid'
import CustomAllergens from '../components/allergenSetup/CustomAllergens'
import SetupActions from '../components/allergenSetup/SetupActions'
import SetupIntro from '../components/allergenSetup/SetupIntro'
import SetupTopBar from '../components/allergenSetup/SetupTopBar'
import { ALLERGENS, loadSaved, saveChoices } from '../components/allergenSetup/shared'
import { ALLERGENS_URL } from '../generateConstants'
import { authFetch } from '../session'
import { getErrorMessage } from '../types'

function Allergens() {
  const navigate = useNavigate()
  const saved = useMemo(loadSaved, [])
  const [selected, setSelected] = useState<string[]>(saved.selected)
  const [custom, setCustom] = useState<string[]>(saved.custom)
  const [customInput, setCustomInput] = useState('')
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const visible = ALLERGENS.filter((a) => a.name.toLowerCase().includes(query.trim().toLowerCase()))

  const toggle = (name: string) =>
    setSelected((s) => (s.includes(name) ? s.filter((n) => n !== name) : [...s, name]))

  const addCustom = () => {
    const name = customInput.trim()
    if (!name) return
    const exists = [...ALLERGENS.map((a) => a.name), ...custom].some(
      (n) => n.toLowerCase() === name.toLowerCase(),
    )
    if (!exists) setCustom((c) => [...c, name])
    setCustomInput('')
  }

  const removeCustom = (name: string) => setCustom((c) => c.filter((n) => n !== name))

  const proceed = async () => {
    saveChoices({ selected, custom })
    setLoading(true)
    setError('')

    try {
      const res = await authFetch(ALLERGENS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ allergens: [...selected, ...custom] }),
      })

      const data: { error?: string; message?: string } = await res.json().catch(() => ({}))

      if (!res.ok) {
        throw new Error(data.error || data.message || `Request failed (${res.status})`)
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
    <div className="min-h-screen bg-gradient-to-b from-[#eef6f1] to-[#f7faf8] px-4 py-6 font-jakarta sm:py-10">
      <div className="mx-auto w-full max-w-[560px]">
        <SetupTopBar onBack={() => navigate(-1)} />
        <SetupIntro />

        <AllergenSearch value={query} onChange={setQuery} />
        <CommonAllergensGrid
          allergens={visible}
          selected={selected}
          onToggle={toggle}
          query={query}
        />

        <CustomAllergens
          value={customInput}
          onChange={setCustomInput}
          onAdd={addCustom}
          custom={custom}
          onRemove={removeCustom}
        />

        <SetupActions
          loading={loading}
          error={error}
          onContinue={proceed}
          onSkip={() => navigate('/app')}
        />
      </div>
    </div>
  )
}

export default Allergens

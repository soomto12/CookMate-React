import { inputClass } from './shared'

interface Props {
  value: string
  onChange: (value: string) => void
}

function AllergenSearch({ value, onChange }: Props) {
  return (
    <div className="relative mt-7">
      <svg
        viewBox="0 0 24 24"
        className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-stone-500"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="6.5" />
        <path d="m16 16 4 4" />
      </svg>
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search for an allergen..."
        aria-label="Search for an allergen"
        className={`w-full pl-12 pr-4 ${inputClass}`}
      />
    </div>
  )
}

export default AllergenSearch

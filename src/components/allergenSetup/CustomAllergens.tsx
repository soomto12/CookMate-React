import { inputClass } from './shared'

interface Props {
  value: string
  onChange: (value: string) => void
  onAdd: () => void
  custom: string[]
  onRemove: (name: string) => void
}

/** "Add your own allergen" input, plus the chips for what was added. */
function CustomAllergens({ value, onChange, onAdd, custom, onRemove }: Props) {
  return (
    <>
      <label htmlFor="custom-allergen" className="mt-8 block text-sm font-bold text-stone-900">
        Add your own allergen
      </label>
      <div className="mt-3 flex gap-2">
        <input
          id="custom-allergen"
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              onAdd()
            }
          }}
          placeholder="e.g. Kiwi, sulphites..."
          className={`min-w-0 flex-1 px-4 ${inputClass}`}
        />
        <button
          type="button"
          onClick={onAdd}
          disabled={!value.trim()}
          className="h-12 rounded-lg bg-green-700 px-5 text-sm font-bold text-white outline-none transition hover:bg-green-800 focus-visible:ring-4 focus-visible:ring-green-600/30 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Add
        </button>
      </div>

      {custom.length > 0 && (
        <ul className="mt-3 flex flex-wrap gap-2">
          {custom.map((name) => (
            <CustomChip key={name} name={name} onRemove={() => onRemove(name)} />
          ))}
        </ul>
      )}
    </>
  )
}

function CustomChip({ name, onRemove }: { name: string; onRemove: () => void }) {
  return (
    <li className="flex items-center gap-2 rounded-full bg-green-700 py-1.5 pl-3.5 pr-2 text-sm font-medium text-white">
      {name}
      <button
        type="button"
        onClick={onRemove}
        aria-label={`Remove ${name}`}
        className="flex h-5 w-5 items-center justify-center rounded-full text-xs hover:bg-green-800"
      >
        ✕
      </button>
    </li>
  )
}

export default CustomAllergens

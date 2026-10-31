import type { ToggleProps } from '../types'

function Toggle({ name, label, defaultChecked, checked, onChange, describedBy }: ToggleProps) {
  return (
    <label className="flex w-fit cursor-pointer items-center gap-3 text-sm text-slate-600">
      <input
        type="checkbox"
        role="switch"
        name={name}
        defaultChecked={defaultChecked}
        checked={checked}
        onChange={onChange && ((e) => onChange(e.target.checked))}
        aria-describedby={describedBy}
        className="peer sr-only"
      />
      <span
        aria-hidden="true"
        className="relative h-6 w-11 shrink-0 rounded-full bg-slate-300 transition peer-checked:bg-green-700 peer-focus-visible:ring-2 peer-focus-visible:ring-green-600 peer-focus-visible:ring-offset-2 after:absolute after:left-0.5 after:top-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:shadow after:transition after:content-[''] peer-checked:after:translate-x-5"
      />
      {label}
    </label>
  )
}

export default Toggle

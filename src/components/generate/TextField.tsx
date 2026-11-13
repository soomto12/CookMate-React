import { hintClass, inputClass } from '../../generateConstants'
import FormSection from './FormSection'

interface Props {
  icon: string
  title: string
  hint: string
  name: string
  value: string
  onChange: (value: string) => void
  placeholder: string
}

/** A form section with a hint and a single text input. */
function TextField({ icon, title, hint, name, value, onChange, placeholder }: Props) {
  return (
    <FormSection icon={icon} title={title}>
      <label htmlFor={name} className={`block ${hintClass}`}>
        {hint}
      </label>
      <input
        id={name}
        name={name}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={inputClass}
      />
    </FormSection>
  )
}

export default TextField

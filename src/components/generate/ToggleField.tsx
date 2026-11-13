import type { ReactNode } from 'react'
import Toggle from '../Toggle'
import { hintClass } from '../../generateConstants'
import FormSection from './FormSection'

interface Props {
  icon: string
  title: string
  hint: ReactNode
  name: string
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
}

/** A form section with a hint and an on/off switch. */
function ToggleField({ icon, title, hint, name, label, checked, onChange }: Props) {
  const hintId = `${name}-hint`

  return (
    <FormSection icon={icon} title={title}>
      <p id={hintId} className={`${hintClass} mb-3`}>
        {hint}
      </p>
      <Toggle
        name={name}
        label={label}
        checked={checked}
        onChange={onChange}
        describedBy={hintId}
      />
    </FormSection>
  )
}

export default ToggleField

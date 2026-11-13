import type { ReactNode } from 'react'
import Icon from '../Icon'
import { fieldsetClass, legendClass, sectionIconClass } from '../../generateConstants'

interface Props {
  icon: string
  title: string
  children: ReactNode
}

/** One block of the generate form: an icon on the left, a bold title, then its fields. */
function FormSection({ icon, title, children }: Props) {
  return (
    <fieldset className={fieldsetClass}>
      <Icon d={icon} className={sectionIconClass} />
      <legend className={legendClass}>{title}</legend>
      {children}
    </fieldset>
  )
}

export default FormSection

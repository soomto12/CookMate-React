import type { ReactNode } from 'react'
import Icon from '../Icon'

interface Props {
  id: string
  icon: string
  children: ReactNode
  className?: string
}

/** Green section title with an icon, e.g. "Ingredients", "Instructions". */
function SectionHeading({ id, icon, children, className = 'text-lg' }: Props) {
  return (
    <h2 id={id} className={`flex items-center gap-2 font-extrabold text-green-950 ${className}`}>
      <Icon d={icon} className="h-5 w-5 text-green-600" />
      {children}
    </h2>
  )
}

export default SectionHeading

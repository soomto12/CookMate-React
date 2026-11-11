import { useState } from 'react'
import type { Recipe } from '../../types'
import HistoryRow from './HistoryRow'

/** The list of past recipes. Only one row's ⋮ menu is open at a time. */
function HistoryList({ recipes }: { recipes: Recipe[] }) {
  const [openRow, setOpenRow] = useState<string | null>(null)

  return (
    <ul className="grid gap-3">
      {recipes.map((entry) => (
        <HistoryRow
          key={entry.id}
          entry={entry}
          menuOpen={openRow === entry.id}
          onToggleMenu={() => setOpenRow(openRow === entry.id ? null : entry.id)}
          onCloseMenu={() => setOpenRow(null)}
        />
      ))}
    </ul>
  )
}

export default HistoryList

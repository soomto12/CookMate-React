import { useState } from 'react'

/** Tracks which list items are ticked, by key. */
export function useCheckedKeys() {
  const [keys, setKeys] = useState<string[]>([])

  const isChecked = (key: string) => keys.includes(key)
  const toggle = (key: string) =>
    setKeys((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]))

  return { isChecked, toggle }
}

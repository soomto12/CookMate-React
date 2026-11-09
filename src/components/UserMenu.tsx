import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Icon from './Icon'
import { clearSession, readUser } from '../session'
import type { CookMateUser } from '../types'

const icons = {
  logout: 'M15 17l5-5-5-5M20 12H9M13 4H6a2 2 0 00-2 2v12a2 2 0 002 2h7',
}

function UserMenu() {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  const user = readUser<CookMateUser>()
  const name = user?.name?.trim() || 'Guest'
  const initial = name[0]?.toUpperCase() || '?'

  useEffect(() => {
    if (!open) return
    const onClickAway = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onClickAway)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onClickAway)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const handleLogout = () => {
    clearSession()
    navigate('/login', { replace: true })
  }

  return (
    <div ref={rootRef} className="relative shrink-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Account menu"
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-green-900 text-sm font-bold text-white transition hover:bg-green-800"
      >
        {initial}
      </button>

      {open && (
        <div
          role="menu"
          aria-label="Account"
          className="absolute right-0 top-12 z-20 w-44 overflow-hidden rounded-xl bg-white p-1 shadow-xl ring-1 ring-emerald-100"
        >
          <button
            type="button"
            role="menuitem"
            onClick={handleLogout}
            className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm font-semibold text-rose-600 transition hover:bg-rose-50"
          >
            <Icon d={icons.logout} className="h-4 w-4" />
            Log Out
          </button>
        </div>
      )}
    </div>
  )
}

export default UserMenu

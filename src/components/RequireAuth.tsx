import { useEffect, useState } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { isAuthenticated, subscribeUnauthorized } from '../session'

/**
 * Route guard: renders the nested routes for signed-in users, and sends
 * everyone else to /login, remembering where they were headed.
 *
 * Also listens for a 401/403 from any authFetch call, so an expired token
 * bounces the user out instead of leaving them on a page that cannot load.
 */
function RequireAuth() {
  const location = useLocation()
  const [authed, setAuthed] = useState(isAuthenticated)
  const [expired, setExpired] = useState(false)

  useEffect(
    () =>
      subscribeUnauthorized(() => {
        setExpired(true)
        setAuthed(false)
      }),
    [],
  )

  // Re-check on navigation, in case the token was cleared elsewhere.
  useEffect(() => {
    if (!isAuthenticated()) setAuthed(false)
  }, [location.pathname])

  if (!authed) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: `${location.pathname}${location.search}`, expired }}
      />
    )
  }

  return <Outlet />
}

export default RequireAuth

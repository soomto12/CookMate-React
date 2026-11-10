import { Navigate, Outlet } from 'react-router-dom'
import { isAuthenticated } from '../session'

/**
 * Route guard: sends signed-in users to /app instead of letting them see the
 * landing page, and renders the nested routes for everyone else.
 */
function RedirectIfAuthed() {
  if (isAuthenticated()) return <Navigate to="/app" replace />

  return <Outlet />
}

export default RedirectIfAuthed

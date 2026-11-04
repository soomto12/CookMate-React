/**
 * Session storage and authenticated fetch.
 *
 * The router guard only hides UI; the server is what actually enforces access.
 * When it answers 401/403 the stored token is stale, so we clear the session
 * and let the app bounce back to /login instead of leaving the user on a
 * guarded page that can no longer load anything.
 */

const TOKEN_KEY = 'cookmate_token'
const USER_KEY = 'cookmate_user'

/** Message shown on the login screen after an expired session. */
export const SESSION_EXPIRED_MESSAGE = 'Your session expired. Please sign in again.'

/** localStorage throws in private mode and when storage is full or blocked. */
const safeStorage = {
  get(key: string): string | null {
    try {
      return localStorage.getItem(key)
    } catch {
      return null
    }
  },
  set(key: string, value: string): void {
    try {
      localStorage.setItem(key, value)
    } catch {
      // storage unavailable; the app still works for this page view
    }
  },
  remove(key: string): void {
    try {
      localStorage.removeItem(key)
    } catch {
      // nothing to do
    }
  },
}

export const getToken = (): string | null => safeStorage.get(TOKEN_KEY)

export const isAuthenticated = (): boolean => Boolean(getToken())

export const saveSession = (token?: string, user?: unknown): void => {
  if (token) safeStorage.set(TOKEN_KEY, token)
  if (user) safeStorage.set(USER_KEY, JSON.stringify(user))
}

export const readUser = <T>(): T | null => {
  try {
    return JSON.parse(safeStorage.get(USER_KEY) || 'null') as T | null
  } catch {
    return null
  }
}

/** Drops the stored token and user. Does not navigate. */
export const clearSession = (): void => {
  safeStorage.remove(TOKEN_KEY)
  safeStorage.remove(USER_KEY)
}

/** Request headers with the bearer token attached when we have one. */
export const authHeaders = (extra?: HeadersInit): Headers => {
  const headers = new Headers(extra)
  const token = getToken()
  if (token) headers.set('Authorization', `Bearer ${token}`)
  return headers
}

type Listener = () => void
const listeners = new Set<Listener>()

/**
 * Called when the server rejects our token. Subscribers (the route guard)
 * redirect to /login; the returned function unsubscribes.
 */
export const subscribeUnauthorized = (listener: Listener): (() => void) => {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

/** Thrown by authFetch on 401/403 so call sites can tell it apart. */
export class SessionExpiredError extends Error {
  constructor(message = SESSION_EXPIRED_MESSAGE) {
    super(message)
    this.name = 'SessionExpiredError'
  }
}

const handleUnauthorized = (): void => {
  clearSession()
  for (const listener of listeners) listener()
}

/**
 * fetch with the bearer token attached. A 401 or 403 clears the session and
 * notifies the guard, then throws SessionExpiredError; every other response
 * (including other error statuses) is handed back to the caller untouched.
 */
export async function authFetch(url: string, init: RequestInit = {}): Promise<Response> {
  const res = await fetch(url, { ...init, headers: authHeaders(init.headers) })

  if (res.status === 401 || res.status === 403) {
    handleUnauthorized()
    throw new SessionExpiredError()
  }

  return res
}

import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { selectAuthInitialized, selectIsAuthenticated } from '../store/selectors/authSelectors'

function SessionSplash() {
  return (
    <div className="auth-page">
      <p className="status">Проверяем сессию…</p>
    </div>
  )
}

export function ProtectedRoute() {
  const initialized = useSelector(selectAuthInitialized)
  const isAuthenticated = useSelector(selectIsAuthenticated)

  if (!initialized) {
    return <SessionSplash />
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}

export function GuestRoute() {
  const initialized = useSelector(selectAuthInitialized)
  const isAuthenticated = useSelector(selectIsAuthenticated)

  if (!initialized) {
    return <SessionSplash />
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}

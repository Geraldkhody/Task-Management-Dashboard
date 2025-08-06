import { Navigate } from 'react-router-dom'
import type { AuthRouteProps } from '../types'

export function AuthRoute({ children, isAuthenticated }: AuthRouteProps) {
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  return <>{children}</>
}
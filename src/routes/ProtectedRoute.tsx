import { Navigate } from 'react-router-dom'
import type { ProtectedRouteProps } from '../types'

export function ProtectedRoute({ children, isAuthenticated }: ProtectedRouteProps) {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}
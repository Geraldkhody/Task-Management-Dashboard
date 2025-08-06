import { Navigate } from 'react-router-dom'
import type { ProtectedRouteProps } from '../types'

export function ProtectedRoute({ children, isAuthenticated }: ProtectedRouteProps) {
  return isAuthenticated ? children : <Navigate to="/login" replace />
}
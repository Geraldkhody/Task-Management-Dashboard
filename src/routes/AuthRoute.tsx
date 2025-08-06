import { Navigate } from 'react-router-dom'
import type { AuthRouteProps } from '../types'

export function AuthRoute({ children, isAuthenticated }: AuthRouteProps) {
  return !isAuthenticated ? children : <Navigate to="/dashboard" replace />
}
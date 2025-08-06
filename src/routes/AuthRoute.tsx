import { Navigate } from 'react-router-dom'

interface AuthRouteProps {
  children: React.ReactNode
  isAuthenticated: boolean
}

export function AuthRoute({ children, isAuthenticated }: AuthRouteProps) {
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  return <>{children}</>
}
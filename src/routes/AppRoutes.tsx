import { Routes, Route, Navigate } from 'react-router-dom'
import { Dashboard, Login, Signup } from '../Screens'
import { ProtectedRoute } from './ProtectedRoute'
import { AuthRoute } from './AuthRoute'
import type { AppRoutesProps } from '../types'

export function AppRoutes({ isAuthenticated, loading, onLogin, onSignup, onLogout }: AppRoutesProps) {
  return (
    <Routes>
      {/* Public Authentication Routes */}
      <Route 
        path="/login" 
        element={
          <AuthRoute isAuthenticated={isAuthenticated}>
            <Login 
              onLogin={onLogin}
              onSwitchToSignup={() => {}}
              loading={loading}
            />
          </AuthRoute>
        } 
      />
      
      <Route 
        path="/signup" 
        element={
          <AuthRoute isAuthenticated={isAuthenticated}>
            <Signup 
              onSignup={onSignup}
              onSwitchToLogin={() => {}}
              loading={loading}
            />
          </AuthRoute>
        } 
      />

      {/* Protected Application Routes */}
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Dashboard onLogout={onLogout} />
          </ProtectedRoute>
        } 
      />

      {/* Root Route - Redirect based on auth status */}
      <Route 
        path="/" 
        element={
          isAuthenticated ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Navigate to="/login" replace />
          )
        } 
      />

      {/* Catch-all Route - Redirect to appropriate page */}
      <Route 
        path="*" 
        element={
          <Navigate to="/" replace />
        } 
      />
    </Routes>
  )
}
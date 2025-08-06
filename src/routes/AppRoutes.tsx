import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Dashboard, Login, Signup } from '../Screens';
import { ProtectedRoute } from './ProtectedRoute';
import { AuthRoute } from './AuthRoute';
import { useAuth } from '../hooks/useAuth';

export function AppRoutes() {
  const { isAuthenticated, loading, login, signup, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <Routes>
      <Route 
        path="/login" 
        element={
          <AuthRoute isAuthenticated={isAuthenticated}>
            <Login 
              onLogin={login}
              onSwitchToSignup={() => navigate('/signup')}
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
              onSignup={signup}
              onSwitchToLogin={() => navigate('/login')}
              loading={loading}
            />
          </AuthRoute>
        } 
      />
      
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Dashboard onLogout={logout} />
          </ProtectedRoute>
        } 
      />

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

      <Route 
        path="*" 
        element={<Navigate to="/" replace />} 
      />
    </Routes>
  );
}

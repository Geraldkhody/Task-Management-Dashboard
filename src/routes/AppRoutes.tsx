import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Dashboard, Login, Signup } from '../Screens';
import { ProtectedRoute } from './ProtectedRoute';
import { AuthRoute } from './AuthRoute';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../store/store';
import { logout } from '../store/authSlice';

export function AppRoutes() {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Routes>
      <Route 
        path="/login" 
        element={
          <AuthRoute isAuthenticated={isAuthenticated}>
            <Login 
              onSwitchToSignup={() => navigate('/signup')}
            />
          </AuthRoute>
        } 
      />
      
      <Route 
        path="/signup" 
        element={
          <AuthRoute isAuthenticated={isAuthenticated}>
            <Signup 
              onSignup={() => {}}
              onSwitchToLogin={() => navigate('/login')}
            />
          </AuthRoute>
        } 
      />
      
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Dashboard onLogout={handleLogout} />
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

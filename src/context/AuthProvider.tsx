import { useState, useCallback, useMemo } from 'react';
import { AuthContext } from './AuthContext';
import { login as apiLogin, register as apiRegister } from '../services/api';
import type { User } from '../types';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!localStorage.getItem('token'));
  const [loading, setLoading] = useState(false);

  const login = useCallback(async (username: string, password: string) => {
    setLoading(true);
    try {
      const response = await apiLogin({ username, password });
      const { user = username, accessToken } = response.data;

      console.log(user, accessToken);
      
      setUser(user);
      setToken(accessToken);
      setIsAuthenticated(true);
      
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('accessToken', accessToken);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const signup = useCallback(async (name: string, email: string, password: string) => {
    setLoading(true);
    try {
      const response = await apiRegister({ name, email, password });
      const { username, accessToken } = response.data;

      setUser(username);
      setToken(accessToken);
      setIsAuthenticated(true);

      localStorage.setItem('user', JSON.stringify(username));
      localStorage.setItem('accessToken', accessToken);
    } catch (error) {
      console.error('Signup failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }, []);

  const authContextValue = useMemo(() => ({
    user,
    token,
    isAuthenticated,
    loading,
    login,
    signup,
    logout,
  }), [user, token, isAuthenticated, loading, login, signup, logout]);

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}

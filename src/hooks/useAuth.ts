import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import type { UseAuthReturn } from '../types';

export function useAuth(): UseAuthReturn {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

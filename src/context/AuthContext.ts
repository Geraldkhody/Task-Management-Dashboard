import { createContext } from 'react';
import type { UseAuthReturn } from '../types';

export const AuthContext = createContext<UseAuthReturn | null>(null);

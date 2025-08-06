import { useState, useCallback, useEffect } from 'react'

interface UseAuthReturn {
  isAuthenticated: boolean
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
}

export function useAuth(): UseAuthReturn {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Initialize from localStorage
    return localStorage.getItem('isAuthenticated') === 'true'
  })
  const [loading, setLoading] = useState(false)

  const login = useCallback(async (email: string, password: string) => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // In a real app, you would validate credentials with your API
      console.log('Login attempt:', { email, password })
      
      // For demo purposes, any credentials are accepted
      setIsAuthenticated(true)
      
      // Store auth state in localStorage for persistence
      localStorage.setItem('isAuthenticated', 'true')
    } catch (error) {
      console.error('Login failed:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }, [])

  const signup = useCallback(async (name: string, email: string, password: string) => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // In a real app, you would create user account with your API
      console.log('Signup attempt:', { name, email, password })
      
      // For demo purposes, any data is accepted
      setIsAuthenticated(true)
      
      // Store auth state in localStorage for persistence
      localStorage.setItem('isAuthenticated', 'true')
    } catch (error) {
      console.error('Signup failed:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }, [])

  const logout = useCallback(() => {
    setIsAuthenticated(false)
    localStorage.removeItem('isAuthenticated')
  }, [])



  return {
    isAuthenticated,
    loading,
    login,
    signup,
    logout
  }
}
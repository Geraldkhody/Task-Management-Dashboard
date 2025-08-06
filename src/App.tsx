import { BrowserRouter as Router } from 'react-router-dom'
import { AppRoutes } from './routes/AppRoutes'
import { useAuth } from './hooks/useAuth'
import './App.css'

function App() {
  const { isAuthenticated, loading, login, signup, logout } = useAuth()

  return (
    <Router>
      <div className="App">
        <AppRoutes 
          isAuthenticated={isAuthenticated}
          loading={loading}
          onLogin={login}
          onSignup={signup}
          onLogout={logout}
        />
      </div>
    </Router>
  )
}

export default App
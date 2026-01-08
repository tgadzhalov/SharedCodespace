import { Navigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'

const ProtectedRoute = ({ children }) => {
  const location = useLocation()
  const [isAuthenticated, setIsAuthenticated] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      let retries = 3
      let authenticated = false
      
      while (retries > 0 && !authenticated) {
        try {
          const response = await fetch('/api/user/me', {
            credentials: 'include'
          })
          
          if (response.ok) {
            authenticated = true
            setIsAuthenticated(true)
            break
          } else {
            if (retries > 1) {
              await new Promise(resolve => setTimeout(resolve, 300))
            }
            retries--
          }
        } catch (error) {
          if (retries > 1) {
            await new Promise(resolve => setTimeout(resolve, 300))
          }
          retries--
        }
      }
      
      if (!authenticated) {
        setIsAuthenticated(false)
      }
      
      setLoading(false)
    }

    checkAuth()
  }, [])

  if (loading) {
    return (
      <div
        style={{
          minHeight: '100vh',
          backgroundColor: '#1a1612',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#d4af37',
          fontFamily: 'Inter, Montserrat, sans-serif',
          fontSize: '18px'
        }}
      >
        Loading...
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location, error: 'Please log in to access this page.' }} replace />
  }

  return children
}

export default ProtectedRoute


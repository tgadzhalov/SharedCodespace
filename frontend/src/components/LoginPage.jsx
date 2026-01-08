import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import logoImage from '../assets/logo.png'

const LoginPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    if (location.state?.error) {
      setErrors({ submit: location.state.error })
    }
  }, [location])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required'
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    setErrors({})
    
    try {
      await fetch('http://localhost:8080/logout', {
        method: 'POST',
        credentials: 'include'
      }).catch(() => {})
      
      await new Promise(resolve => setTimeout(resolve, 300))
      
      document.cookie.split(";").forEach(function(c) { 
        const cookieName = c.split("=")[0].trim()
        if (cookieName) {
          document.cookie = `${cookieName}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;domain=localhost`
          document.cookie = `${cookieName}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/`
        }
      })
      
      sessionStorage.clear()
      localStorage.clear()
      
      await new Promise(resolve => setTimeout(resolve, 200))
      
      const formDataToSend = new URLSearchParams()
      formDataToSend.append('username', formData.username)
      formDataToSend.append('password', formData.password)

      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        credentials: 'include',
        redirect: 'manual',
        body: formDataToSend
      })

      const responseUrl = response.url || ''
      const locationHeader = response.headers.get('Location') || ''
      const redirectUrl = responseUrl || locationHeader

      if (response.status === 302) {
        if (redirectUrl.includes('/login?error') || redirectUrl.includes('error')) {
          setErrors({ submit: 'Invalid username or password. Please verify the admin user exists and the password is correct.' })
        } else if (redirectUrl.includes('/personal') || redirectUrl.includes('/login')) {
          window.location.href = '/personal'
          return
        } else {
          window.location.href = '/personal'
          return
        }
      } else if (response.status === 0) {
        window.location.href = '/personal'
        return
      } else if (response.status === 401 || response.status === 403) {
        setErrors({ submit: 'Invalid username or password. Please verify the admin user exists and the password is correct.' })
      } else if (response.status === 404) {
        setErrors({ submit: 'Backend server not found. Is it running on port 8080?' })
      } else if (response.status >= 200 && response.status < 300) {
        window.location.href = '/personal'
        return
      } else {
        setErrors({ submit: `Login failed with status: ${response.status}. Please check if the admin user exists in the database.` })
      }
    } catch (error) {
      if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
        setErrors({ submit: 'Cannot connect to server. Is the backend running on port 8080?' })
      } else {
        setErrors({ submit: 'An error occurred. Please try again.' })
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div 
      className="min-h-screen relative overflow-hidden flex items-center justify-center p-6"
      style={{
        minHeight: '100vh',
        backgroundColor: '#1a1612',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px'
      }}
    >
      {/* Animated gradient background orbs */}
      <div 
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{
          position: 'absolute',
          inset: 0,
          overflow: 'hidden',
          pointerEvents: 'none'
        }}
      >
        <div 
          className="absolute top-20 left-20 w-72 h-72 rounded-full blur-3xl"
          style={{
            position: 'absolute',
            top: '80px',
            left: '80px',
            width: '288px',
            height: '288px',
            backgroundColor: 'rgba(184, 134, 11, 0.08)',
            borderRadius: '50%',
            filter: 'blur(80px)'
          }}
        ></div>
        <div 
          className="absolute bottom-20 right-20 w-96 h-96 rounded-full blur-3xl"
          style={{
            position: 'absolute',
            bottom: '80px',
            right: '80px',
            width: '384px',
            height: '384px',
            backgroundColor: 'rgba(210, 180, 140, 0.06)',
            borderRadius: '50%',
            filter: 'blur(80px)'
          }}
        ></div>
        <div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '500px',
            height: '500px',
            backgroundColor: 'rgba(184, 134, 11, 0.04)',
            borderRadius: '50%',
            filter: 'blur(80px)'
          }}
        ></div>
      </div>

      {/* Abstract pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.02,
          pointerEvents: 'none',
          backgroundImage: 'radial-gradient(circle at 2px 2px, #d4af37 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}
      ></div>

      {/* Main content container */}
      <div 
        className="relative z-10 w-full max-w-md"
        style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          maxWidth: '440px',
          margin: '0 auto'
        }}
      >
        {/* Hero section with logo */}
        <div 
          className="text-center mb-10"
          style={{
            textAlign: 'center',
            marginBottom: '40px'
          }}
        >
          <div 
            className="inline-flex items-center justify-center mb-6"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '24px'
            }}
          >
            <img 
              src={logoImage} 
              alt="School Logo" 
              style={{
                width: '120px',
                height: '120px',
                objectFit: 'contain',
                filter: 'drop-shadow(0 4px 12px rgba(184, 134, 11, 0.3))'
              }}
            />
          </div>
          <h1 
            className="text-4xl font-bold mb-3 tracking-tight"
            style={{
              fontSize: '36px',
              fontWeight: 700,
              color: '#d4af37',
              marginBottom: '12px',
              letterSpacing: '-0.02em',
              fontFamily: 'Inter, Montserrat, sans-serif'
            }}
          >
            Welcome Back
          </h1>
          <p 
            className="text-base"
            style={{
              fontSize: '16px',
              color: '#c9a961',
              fontFamily: 'Roboto, Inter, sans-serif'
            }}
          >
            Sign in to your developer workspace
          </p>
        </div>

        {/* Login Card with Glassmorphism */}
        <div 
          className="backdrop-blur-xl rounded-2xl p-8 shadow-2xl border"
          style={{
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            backgroundColor: 'rgba(45, 35, 26, 0.7)',
            border: '1px solid rgba(212, 175, 55, 0.2)',
            borderRadius: '16px',
            padding: '48px 40px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.3)'
            e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(184, 134, 11, 0.2)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.2)'
            e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
          }}
        >
          <form 
            onSubmit={handleSubmit} 
            className="space-y-6"
            style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
          >
            {/* Username Input */}
            <div className="space-y-2" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label 
                htmlFor="username" 
                className="block text-sm font-medium"
                style={{
                  fontSize: '14px',
                  fontWeight: 500,
                  color: '#d4af37',
                  fontFamily: 'Roboto, Inter, sans-serif'
                }}
              >
                Username
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-lg text-white placeholder-gray-500 transition-all duration-200 focus:outline-none focus:ring-2"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    backgroundColor: 'rgba(26, 22, 18, 0.6)',
                    border: `2px solid ${errors.username ? 'rgba(239, 68, 68, 0.5)' : 'rgba(212, 175, 55, 0.2)'}`,
                    borderRadius: '8px',
                    color: '#f5e6d3',
                    fontSize: '15px',
                    fontFamily: 'Roboto, Inter, sans-serif',
                    outline: 'none',
                    transition: 'all 0.2s ease'
                  }}
                  onFocus={(e) => {
                    if (!errors.username) {
                      e.target.style.borderColor = '#d4af37'
                      e.target.style.boxShadow = '0 0 0 3px rgba(212, 175, 55, 0.1)'
                    }
                  }}
                  onBlur={(e) => {
                    if (!errors.username) {
                      e.target.style.borderColor = 'rgba(212, 175, 55, 0.2)'
                      e.target.style.boxShadow = 'none'
                    }
                  }}
                  placeholder="Enter your username"
                  autoComplete="username"
                  autoFocus
                />
                {errors.username && (
                  <p 
                    className="mt-1 text-sm text-red-400"
                    style={{
                      marginTop: '4px',
                      fontSize: '13px',
                      color: '#f87171',
                      fontFamily: 'Roboto, Inter, sans-serif'
                    }}
                  >
                    {errors.username}
                  </p>
                )}
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div 
                className="flex items-center justify-between"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '8px'
                }}
              >
                <label 
                  htmlFor="password" 
                  className="block text-sm font-medium"
                  style={{
                    fontSize: '14px',
                    fontWeight: 500,
                    color: '#d4af37',
                    fontFamily: 'Roboto, Inter, sans-serif'
                  }}
                >
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-sm transition-colors duration-200 font-medium"
                  style={{
                    fontSize: '13px',
                    color: '#d4af37',
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer',
                    fontWeight: 500,
                    fontFamily: 'Roboto, Inter, sans-serif',
                    transition: 'color 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.color = '#f5d896'}
                  onMouseLeave={(e) => e.target.style.color = '#d4af37'}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-lg text-white placeholder-gray-500 transition-all duration-200 focus:outline-none focus:ring-2"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    backgroundColor: 'rgba(26, 22, 18, 0.6)',
                    border: `2px solid ${errors.password ? 'rgba(239, 68, 68, 0.5)' : 'rgba(212, 175, 55, 0.2)'}`,
                    borderRadius: '8px',
                    color: '#f5e6d3',
                    fontSize: '15px',
                    fontFamily: 'Roboto, Inter, sans-serif',
                    outline: 'none',
                    transition: 'all 0.2s ease'
                  }}
                  onFocus={(e) => {
                    if (!errors.password) {
                      e.target.style.borderColor = '#d4af37'
                      e.target.style.boxShadow = '0 0 0 3px rgba(212, 175, 55, 0.1)'
                    }
                  }}
                  onBlur={(e) => {
                    if (!errors.password) {
                      e.target.style.borderColor = 'rgba(212, 175, 55, 0.2)'
                      e.target.style.boxShadow = 'none'
                    }
                  }}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                />
                {errors.password && (
                  <p 
                    className="mt-1 text-sm text-red-400"
                    style={{
                      marginTop: '4px',
                      fontSize: '13px',
                      color: '#f87171',
                      fontFamily: 'Roboto, Inter, sans-serif'
                    }}
                  >
                    {errors.password}
                  </p>
                )}
              </div>
            </div>

            {/* Error Banner */}
            {errors.submit && (
              <div 
                className="flex items-center gap-3 p-4 rounded-lg text-red-400 text-sm"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 16px',
                  backgroundColor: 'rgba(239, 68, 68, 0.1)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  borderRadius: '8px',
                  color: '#f87171',
                  fontSize: '14px',
                  fontFamily: 'Roboto, Inter, sans-serif'
                }}
              >
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{errors.submit}</span>
              </div>
            )}

            {/* Login Button with Gold Gradient */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2"
              style={{
                width: '100%',
                padding: '12px 24px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #b8860b 0%, #d4af37 50%, #daa520 100%)',
                color: '#1a1612',
                fontSize: '15px',
                fontWeight: 600,
                fontFamily: 'Inter, Montserrat, sans-serif',
                border: 'none',
                cursor: isLoading ? 'wait' : 'pointer',
                transition: 'all 0.3s ease',
                opacity: isLoading ? 0.7 : 1,
                boxShadow: '0 4px 6px -1px rgba(184, 134, 11, 0.3)',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.transform = 'scale(1.02)'
                  e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(184, 134, 11, 0.4)'
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)'
                e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(184, 134, 11, 0.3)'
              }}
              onMouseDown={(e) => {
                if (!isLoading) e.currentTarget.style.transform = 'scale(0.98)'
              }}
              onMouseUp={(e) => {
                if (!isLoading) e.currentTarget.style.transform = 'scale(1.02)'
              }}
              onFocus={(e) => {
                e.currentTarget.style.boxShadow = '0 0 0 3px rgba(212, 175, 55, 0.3), 0 4px 6px -1px rgba(184, 134, 11, 0.3)'
              }}
              onBlur={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(184, 134, 11, 0.3)'
              }}
            >
              {isLoading ? (
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <svg 
                    className="animate-spin" 
                    width="20" 
                    height="20" 
                    fill="none" 
                    viewBox="0 0 24 24"
                    style={{ animation: 'spin 1s linear infinite' }}
                  >
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" opacity="0.25"></circle>
                    <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" opacity="0.75"></path>
                  </svg>
                  Signing in...
                </span>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Footer */}
          <div 
            className="mt-8 pt-6 border-t text-center"
            style={{
              marginTop: '32px',
              paddingTop: '24px',
              borderTop: '1px solid rgba(212, 175, 55, 0.2)',
              textAlign: 'center'
            }}
          >
            <p 
              className="text-sm text-gray-500"
              style={{
                fontSize: '13px',
                color: '#8b7355',
                fontFamily: 'Roboto, Inter, sans-serif'
              }}
            >
              Code Review Platform
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

export default LoginPage

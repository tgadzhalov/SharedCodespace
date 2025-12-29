import { useState } from 'react'

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

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
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log('Login attempt:', formData)
    } catch (error) {
      console.error('Login error:', error)
      setErrors({ submit: 'Invalid credentials. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div 
      className="min-h-screen bg-[#0F111A] relative overflow-hidden flex items-center justify-center p-6"
      style={{
        minHeight: '100vh',
        backgroundColor: '#0F111A',
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
          className="absolute top-20 left-20 w-72 h-72 rounded-full blur-3xl animate-pulse"
          style={{
            position: 'absolute',
            top: '80px',
            left: '80px',
            width: '288px',
            height: '288px',
            backgroundColor: 'rgba(0, 175, 255, 0.1)',
            borderRadius: '50%',
            filter: 'blur(80px)',
            animation: 'pulse 4s ease-in-out infinite'
          }}
        ></div>
        <div 
          className="absolute bottom-20 right-20 w-96 h-96 rounded-full blur-3xl animate-pulse"
          style={{
            position: 'absolute',
            bottom: '80px',
            right: '80px',
            width: '384px',
            height: '384px',
            backgroundColor: 'rgba(0, 255, 127, 0.1)',
            borderRadius: '50%',
            filter: 'blur(80px)',
            animation: 'pulse 4s ease-in-out infinite 1s'
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
            backgroundColor: 'rgba(0, 175, 255, 0.05)',
            borderRadius: '50%',
            filter: 'blur(80px)'
          }}
        ></div>
      </div>

      {/* Abstract tech grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.03,
          pointerEvents: 'none',
          backgroundImage: 'radial-gradient(circle at 2px 2px, #00AFFF 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}
      ></div>

      {/* Floating code elements decoration */}
      <div 
        className="absolute top-10 left-10 text-[#00AFFF] opacity-10 font-mono text-6xl pointer-events-none"
        style={{
          position: 'absolute',
          top: '40px',
          left: '40px',
          color: '#00AFFF',
          opacity: 0.1,
          fontFamily: 'monospace',
          fontSize: '48px',
          pointerEvents: 'none'
        }}
      >
        {'</>'}
      </div>
      <div 
        className="absolute bottom-10 right-10 text-[#00FF7F] opacity-10 font-mono text-6xl pointer-events-none"
        style={{
          position: 'absolute',
          bottom: '40px',
          right: '40px',
          color: '#00FF7F',
          opacity: 0.1,
          fontFamily: 'monospace',
          fontSize: '48px',
          pointerEvents: 'none'
        }}
      >
        {'{}'}
      </div>

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
        {/* Hero section */}
        <div 
          className="text-center mb-10"
          style={{
            textAlign: 'center',
            marginBottom: '40px'
          }}
        >
          <div 
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 shadow-lg"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '64px',
              height: '64px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #00AFFF 0%, #00FF7F 100%)',
              boxShadow: '0 10px 25px rgba(0, 175, 255, 0.5)',
              marginBottom: '24px',
              transition: 'transform 0.3s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1) rotate(5deg)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1) rotate(0deg)'}
          >
            <svg 
              width="32" 
              height="32" 
              fill="none" 
              stroke="#0F111A" 
              viewBox="0 0 24 24" 
              strokeWidth={2}
              style={{ color: '#0F111A' }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </div>
          <h1 
            className="text-4xl font-bold text-white mb-3 tracking-tight"
            style={{
              fontSize: '36px',
              fontWeight: 700,
              color: '#ffffff',
              marginBottom: '12px',
              letterSpacing: '-0.02em',
              fontFamily: 'Inter, Montserrat, sans-serif'
            }}
          >
            Welcome Back
          </h1>
          <p 
            className="text-gray-400 text-base"
            style={{
              fontSize: '16px',
              color: '#9ca3af',
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
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '16px',
            padding: '48px 40px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)'
            e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(0, 175, 255, 0.3)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'
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
                className="block text-sm font-medium text-gray-300"
                style={{
                  fontSize: '14px',
                  fontWeight: 500,
                  color: '#d1d5db',
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
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: `2px solid ${errors.username ? 'rgba(239, 68, 68, 0.5)' : 'rgba(255, 255, 255, 0.1)'}`,
                    borderRadius: '8px',
                    color: '#ffffff',
                    fontSize: '15px',
                    fontFamily: 'Roboto, Inter, sans-serif',
                    outline: 'none',
                    transition: 'all 0.2s ease'
                  }}
                  onFocus={(e) => {
                    if (!errors.username) {
                      e.target.style.borderColor = '#00AFFF'
                      e.target.style.boxShadow = '0 0 0 3px rgba(0, 175, 255, 0.1)'
                    }
                  }}
                  onBlur={(e) => {
                    if (!errors.username) {
                      e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'
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
                  className="block text-sm font-medium text-gray-300"
                  style={{
                    fontSize: '14px',
                    fontWeight: 500,
                    color: '#d1d5db',
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
                    color: '#00AFFF',
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer',
                    fontWeight: 500,
                    fontFamily: 'Roboto, Inter, sans-serif',
                    transition: 'color 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.color = '#00FF7F'}
                  onMouseLeave={(e) => e.target.style.color = '#00AFFF'}
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
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: `2px solid ${errors.password ? 'rgba(239, 68, 68, 0.5)' : 'rgba(255, 255, 255, 0.1)'}`,
                    borderRadius: '8px',
                    color: '#ffffff',
                    fontSize: '15px',
                    fontFamily: 'Roboto, Inter, sans-serif',
                    outline: 'none',
                    transition: 'all 0.2s ease'
                  }}
                  onFocus={(e) => {
                    if (!errors.password) {
                      e.target.style.borderColor = '#00AFFF'
                      e.target.style.boxShadow = '0 0 0 3px rgba(0, 175, 255, 0.1)'
                    }
                  }}
                  onBlur={(e) => {
                    if (!errors.password) {
                      e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'
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

            {/* Login Button with Gradient */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2"
              style={{
                width: '100%',
                padding: '12px 24px',
                borderRadius: '8px',
                background: 'linear-gradient(90deg, #00AFFF 0%, #00FF7F 100%)',
                color: '#0F111A',
                fontSize: '15px',
                fontWeight: 600,
                fontFamily: 'Inter, Montserrat, sans-serif',
                border: 'none',
                cursor: isLoading ? 'wait' : 'pointer',
                transition: 'all 0.3s ease',
                opacity: isLoading ? 0.7 : 1,
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.transform = 'scale(1.02)'
                  e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 175, 255, 0.5)'
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)'
                e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
              onMouseDown={(e) => {
                if (!isLoading) e.currentTarget.style.transform = 'scale(0.98)'
              }}
              onMouseUp={(e) => {
                if (!isLoading) e.currentTarget.style.transform = 'scale(1.02)'
              }}
              onFocus={(e) => {
                e.currentTarget.style.boxShadow = '0 0 0 3px rgba(0, 175, 255, 0.3), 0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
              onBlur={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
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
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              textAlign: 'center'
            }}
          >
            <p 
              className="text-sm text-gray-500"
              style={{
                fontSize: '13px',
                color: '#6b7280',
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
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  )
}

export default LoginPage

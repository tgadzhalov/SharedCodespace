import { useNavigate, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import logoImage from '../assets/logo.png'

const ErrorPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [errorDetails, setErrorDetails] = useState(null)

  useEffect(() => {
    if (location.state?.error) {
      setErrorDetails(location.state.error)
    }
  }, [location])

  const handleGoHome = () => {
    navigate('/personal')
  }

  const handleGoBack = () => {
    navigate(-1)
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#1a1612',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px'
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          overflow: 'hidden',
          pointerEvents: 'none'
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '50px',
            left: '50px',
            width: '400px',
            height: '400px',
            backgroundColor: 'rgba(239, 68, 68, 0.08)',
            borderRadius: '50%',
            filter: 'blur(80px)'
          }}
        ></div>
        <div
          style={{
            position: 'absolute',
            bottom: '50px',
            right: '50px',
            width: '500px',
            height: '500px',
            backgroundColor: 'rgba(184, 134, 11, 0.05)',
            borderRadius: '50%',
            filter: 'blur(80px)'
          }}
        ></div>
      </div>

      <div
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '800px',
          width: '100%',
          backgroundColor: 'rgba(45, 35, 26, 0.8)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(212, 175, 55, 0.2)',
          borderRadius: '24px',
          padding: '48px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: '24px'
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              marginBottom: '8px'
            }}
          >
            <img
              src={logoImage}
              alt="School Logo"
              style={{
                width: '56px',
                height: '56px',
                objectFit: 'contain',
                filter: 'drop-shadow(0 2px 8px rgba(184, 134, 11, 0.3))'
              }}
            />
            <div
              style={{
                fontSize: '64px',
                lineHeight: '1',
                color: '#ef4444',
                fontFamily: 'Inter, Montserrat, sans-serif',
                fontWeight: 700
              }}
            >
              ⚠
            </div>
          </div>

          <div>
            <h1
              style={{
                fontSize: '36px',
                fontWeight: 700,
                color: '#d4af37',
                fontFamily: 'Inter, Montserrat, sans-serif',
                letterSpacing: '-0.02em',
                marginBottom: '12px'
              }}
            >
              Oops! Something went wrong
            </h1>
            <p
              style={{
                fontSize: '18px',
                color: '#c9a961',
                fontFamily: 'Roboto, Inter, sans-serif',
                lineHeight: '1.6'
              }}
            >
              We encountered an error while processing your request.
            </p>
          </div>

          {errorDetails && (
            <div
              style={{
                width: '100%',
                backgroundColor: 'rgba(26, 22, 18, 0.6)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                borderRadius: '12px',
                padding: '20px',
                marginTop: '8px'
              }}
            >
              <div
                style={{
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#ef4444',
                  fontFamily: 'Inter, Montserrat, sans-serif',
                  marginBottom: '12px',
                  textAlign: 'left'
                }}
              >
                Error Details:
              </div>
              <div
                style={{
                  fontSize: '14px',
                  color: '#f5e6d3',
                  fontFamily: 'Roboto, Inter, sans-serif',
                  lineHeight: '1.6',
                  textAlign: 'left',
                  wordBreak: 'break-word'
                }}
              >
                {typeof errorDetails === 'string' ? errorDetails : JSON.stringify(errorDetails, null, 2)}
              </div>
            </div>
          )}

          <div
            style={{
              display: 'flex',
              gap: '16px',
              marginTop: '8px',
              flexWrap: 'wrap',
              justifyContent: 'center'
            }}
          >
            <button
              onClick={handleGoHome}
              style={{
                padding: '14px 32px',
                backgroundColor: '#d4af37',
                border: 'none',
                borderRadius: '12px',
                color: '#1a1612',
                fontSize: '16px',
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: 'Inter, Montserrat, sans-serif',
                transition: 'all 0.2s ease',
                boxShadow: '0 4px 12px rgba(212, 175, 55, 0.3)'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#b8860b'
                e.target.style.transform = 'translateY(-2px)'
                e.target.style.boxShadow = '0 6px 16px rgba(212, 175, 55, 0.4)'
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#d4af37'
                e.target.style.transform = 'translateY(0)'
                e.target.style.boxShadow = '0 4px 12px rgba(212, 175, 55, 0.3)'
              }}
            >
              Go to Home
            </button>
            <button
              onClick={handleGoBack}
              style={{
                padding: '14px 32px',
                backgroundColor: 'rgba(212, 175, 55, 0.1)',
                border: '1px solid rgba(212, 175, 55, 0.3)',
                borderRadius: '12px',
                color: '#d4af37',
                fontSize: '16px',
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: 'Inter, Montserrat, sans-serif',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = 'rgba(212, 175, 55, 0.2)'
                e.target.style.borderColor = 'rgba(212, 175, 55, 0.5)'
                e.target.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'rgba(212, 175, 55, 0.1)'
                e.target.style.borderColor = 'rgba(212, 175, 55, 0.3)'
                e.target.style.transform = 'translateY(0)'
              }}
            >
              Go Back
            </button>
          </div>

          <div
            style={{
              marginTop: '24px',
              paddingTop: '24px',
              borderTop: '1px solid rgba(212, 175, 55, 0.2)',
              width: '100%'
            }}
          >
            <p
              style={{
                fontSize: '14px',
                color: 'rgba(201, 169, 97, 0.6)',
                fontFamily: 'Roboto, Inter, sans-serif'
              }}
            >
              If this problem persists, please contact support or try again later.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ErrorPage


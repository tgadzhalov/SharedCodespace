import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import logoImage from '../assets/logo.png'

const Layout = ({ children }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const isActive = (path) => location.pathname === path

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/user/me', {
          credentials: 'include'
        })
        
        if (response.ok) {
          const userData = await response.json()
          if (userData && userData.username) {
            setUser(userData)
          }
        } else if (response.status === 401 || response.status === 403) {
          navigate('/login', { 
            state: { error: 'Please log in to access this page.' } 
          })
        } else if (response.status >= 500) {
          navigate('/error', { 
            state: { error: 'Server error. Please try again later.' } 
          })
        }
      } catch (error) {
        console.error('Error fetching user:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [navigate])

  const handleProfilePictureChange = async (event) => {
    const file = event.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onloadend = async () => {
      const base64String = reader.result
      try {
        const response = await fetch('/api/user/me/profile-picture', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify({ profilePictureUrl: base64String })
        })

        if (response.ok) {
          const updatedUser = await response.json()
          setUser(updatedUser)
        }
      } catch (error) {
        console.error('Error updating profile picture:', error)
      }
    }
    reader.readAsDataURL(file)
  }

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:8080/logout', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).catch(() => {})
      
      document.cookie.split(";").forEach(function(c) { 
        const cookieName = c.split("=")[0].trim()
        if (cookieName) {
          document.cookie = `${cookieName}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;domain=localhost`
          document.cookie = `${cookieName}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/`
          document.cookie = `${cookieName}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;domain=.localhost`
        }
      })
      
      sessionStorage.clear()
      localStorage.clear()
      
      window.location.href = '/login'
    } catch (error) {
      sessionStorage.clear()
      localStorage.clear()
      window.location.href = '/login'
    }
  }

  const getInitials = (firstName, lastName) => {
    return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase()
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#1a1612',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background gradient orbs */}
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
            backgroundColor: 'rgba(184, 134, 11, 0.06)',
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
            backgroundColor: 'rgba(210, 180, 140, 0.05)',
            borderRadius: '50%',
            filter: 'blur(80px)'
          }}
        ></div>
      </div>

      {/* Header with Navbar */}
      <header
        style={{
          position: 'relative',
          zIndex: 10,
          padding: '20px 32px',
          borderBottom: '1px solid rgba(212, 175, 55, 0.2)',
          backgroundColor: 'rgba(26, 22, 18, 0.8)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)'
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            maxWidth: '1600px',
            margin: '0 auto'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <img
              src={logoImage}
              alt="School Logo"
              style={{
                width: '48px',
                height: '48px',
                objectFit: 'contain',
                filter: 'drop-shadow(0 2px 8px rgba(184, 134, 11, 0.3))'
              }}
            />
            <h1
              style={{
                fontSize: '24px',
                fontWeight: 700,
                color: '#d4af37',
                fontFamily: 'Inter, Montserrat, sans-serif',
                letterSpacing: '-0.02em'
              }}
            >
              Shared CodeSpace
            </h1>
          </div>

          {/* Navigation Tabs */}
          <nav
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '24px'
            }}
          >
            <Link
              to="/personal"
              style={{
                padding: '10px 20px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontSize: '15px',
                fontWeight: isActive('/personal') ? 600 : 500,
                color: isActive('/personal') ? '#1a1612' : '#d4af37',
                backgroundColor: isActive('/personal')
                  ? '#d4af37'
                  : 'rgba(212, 175, 55, 0.1)',
                border: `1px solid ${isActive('/personal') ? '#d4af37' : 'rgba(212, 175, 55, 0.3)'}`,
                transition: 'all 0.2s ease',
                fontFamily: 'Inter, Montserrat, sans-serif'
              }}
              onMouseEnter={(e) => {
                if (!isActive('/personal')) {
                  e.currentTarget.style.backgroundColor = 'rgba(212, 175, 55, 0.2)'
                  e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.5)'
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive('/personal')) {
                  e.currentTarget.style.backgroundColor = 'rgba(212, 175, 55, 0.1)'
                  e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.3)'
                }
              }}
            >
              Personal Workspace
            </Link>
            <Link
              to="/shared"
              style={{
                padding: '10px 20px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontSize: '15px',
                fontWeight: isActive('/shared') ? 600 : 500,
                color: isActive('/shared') ? '#1a1612' : '#d4af37',
                backgroundColor: isActive('/shared')
                  ? '#d4af37'
                  : 'rgba(212, 175, 55, 0.1)',
                border: `1px solid ${isActive('/shared') ? '#d4af37' : 'rgba(212, 175, 55, 0.3)'}`,
                transition: 'all 0.2s ease',
                fontFamily: 'Inter, Montserrat, sans-serif'
              }}
              onMouseEnter={(e) => {
                if (!isActive('/shared')) {
                  e.currentTarget.style.backgroundColor = 'rgba(212, 175, 55, 0.2)'
                  e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.5)'
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive('/shared')) {
                  e.currentTarget.style.backgroundColor = 'rgba(212, 175, 55, 0.1)'
                  e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.3)'
                }
              }}
            >
              Shared Workspace
            </Link>
            {user?.userType === 'ADMIN' && (
              <Link
                to="/admin"
                style={{
                  padding: '10px 20px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontSize: '15px',
                  fontWeight: isActive('/admin') ? 600 : 500,
                  color: isActive('/admin') ? '#1a1612' : '#d4af37',
                  backgroundColor: isActive('/admin')
                    ? '#d4af37'
                    : 'rgba(212, 175, 55, 0.1)',
                  border: `1px solid ${isActive('/admin') ? '#d4af37' : 'rgba(212, 175, 55, 0.3)'}`,
                  transition: 'all 0.2s ease',
                  fontFamily: 'Inter, Montserrat, sans-serif'
                }}
                onMouseEnter={(e) => {
                  if (!isActive('/admin')) {
                    e.currentTarget.style.backgroundColor = 'rgba(212, 175, 55, 0.2)'
                    e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.5)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive('/admin')) {
                    e.currentTarget.style.backgroundColor = 'rgba(212, 175, 55, 0.1)'
                    e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.3)'
                  }
                }}
              >
                Admin Panel
              </Link>
            )}
            {user?.userType === 'TEACHER' && (
              <Link
                to="/assignments"
                style={{
                  padding: '10px 20px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontSize: '15px',
                  fontWeight: isActive('/assignments') ? 600 : 500,
                  color: isActive('/assignments') ? '#1a1612' : '#d4af37',
                  backgroundColor: isActive('/assignments')
                    ? '#d4af37'
                    : 'rgba(212, 175, 55, 0.1)',
                  border: `1px solid ${isActive('/assignments') ? '#d4af37' : 'rgba(212, 175, 55, 0.3)'}`,
                  transition: 'all 0.2s ease',
                  fontFamily: 'Inter, Montserrat, sans-serif'
                }}
                onMouseEnter={(e) => {
                  if (!isActive('/assignments')) {
                    e.currentTarget.style.backgroundColor = 'rgba(212, 175, 55, 0.2)'
                    e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.5)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive('/assignments')) {
                    e.currentTarget.style.backgroundColor = 'rgba(212, 175, 55, 0.1)'
                    e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.3)'
                  }
                }}
              >
                Create Assignment
              </Link>
            )}

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                marginLeft: '16px',
                paddingLeft: '24px',
                borderLeft: '1px solid rgba(212, 175, 55, 0.2)'
              }}
            >
              {loading ? (
                <span
                  style={{
                    color: '#c9a961',
                    fontSize: '14px',
                    fontFamily: 'Roboto, Inter, sans-serif'
                  }}
                >
                  Loading...
                </span>
              ) : user ? (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    gap: '2px'
                  }}
                >
                  <span
                    style={{
                      color: '#d4af37',
                      fontSize: '15px',
                      fontWeight: 600,
                      fontFamily: 'Roboto, Inter, sans-serif'
                    }}
                  >
                    {user.firstName} {user.lastName}
                  </span>
                  <span
                    style={{
                      color: '#c9a961',
                      fontSize: '12px',
                      fontFamily: 'Roboto, Inter, sans-serif'
                    }}
                  >
                    @{user.username}
                  </span>
                </div>
              ) : (
                <span
                  style={{
                    color: '#c9a961',
                    fontSize: '14px',
                    fontFamily: 'Roboto, Inter, sans-serif'
                  }}
                >
                  Welcome, User
                </span>
              )}
              <button
                onClick={handleLogout}
                style={{
                  padding: '8px 20px',
                  backgroundColor: 'rgba(212, 175, 55, 0.1)',
                  border: '1px solid rgba(212, 175, 55, 0.3)',
                  borderRadius: '8px',
                  color: '#d4af37',
                  fontSize: '14px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  fontFamily: 'Roboto, Inter, sans-serif'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(212, 175, 55, 0.2)'
                  e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.5)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(212, 175, 55, 0.1)'
                  e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.3)'
                }}
              >
                Logout
              </button>
            </div>
          </nav>
        </div>
      </header>

      <div
        style={{
          display: 'flex',
          maxWidth: '1600px',
          margin: '0 auto',
          gap: '24px',
          padding: '24px 32px'
        }}
      >
        {!loading && user && (
          <div
            style={{
              position: 'sticky',
              top: '24px',
              height: 'fit-content',
              zIndex: 10
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '12px',
                padding: '16px',
                backgroundColor: 'rgba(45, 35, 26, 0.5)',
                borderRadius: '12px',
                border: '1px solid rgba(212, 175, 55, 0.18)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
                transition: 'all 0.2s ease',
                width: '180px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.3)'
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(184, 134, 11, 0.15)'
                e.currentTarget.style.backgroundColor = 'rgba(45, 35, 26, 0.6)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.18)'
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.2)'
                e.currentTarget.style.backgroundColor = 'rgba(45, 35, 26, 0.5)'
              }}
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleProfilePictureChange}
                style={{ display: 'none' }}
                id="profile-picture-input"
              />
              <div
                onClick={() => document.getElementById('profile-picture-input').click()}
                style={{
                  position: 'relative',
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: '2.5px solid rgba(212, 175, 55, 0.35)',
                  boxShadow: '0 2px 8px rgba(184, 134, 11, 0.25)',
                  background: 'linear-gradient(135deg, #d4af37 0%, #b8860b 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)'
                  e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.5)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)'
                  e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.35)'
                }}
              >
                {user.profilePictureUrl ? (
                  <img
                    src={user.profilePictureUrl}
                    alt={`${user.firstName} ${user.lastName}`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                    onError={(e) => {
                      e.target.style.display = 'none'
                      e.target.nextSibling.style.display = 'flex'
                    }}
                  />
                ) : null}
                <div
                  style={{
                    display: user.profilePictureUrl ? 'none' : 'flex',
                    width: '100%',
                    height: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px',
                    fontWeight: 700,
                    color: '#1a1612',
                    fontFamily: 'Inter, Montserrat, sans-serif',
                    letterSpacing: '0.5px'
                  }}
                >
                  {getInitials(user.firstName, user.lastName)}
                </div>
                <div
                  style={{
                    position: 'absolute',
                    bottom: '2px',
                    right: '2px',
                    width: '14px',
                    height: '14px',
                    borderRadius: '50%',
                    backgroundColor: '#10b981',
                    border: '2px solid #1a1612',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.4)'
                  }}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', width: '100%' }}>
                <div
                  style={{
                    fontSize: '14px',
                    fontWeight: 600,
                    color: '#d4af37',
                    fontFamily: 'Inter, Montserrat, sans-serif',
                    letterSpacing: '-0.01em',
                    textAlign: 'center',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    width: '100%'
                  }}
                >
                  {user.firstName} {user.lastName}
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '11px',
                    color: '#c9a961',
                    fontFamily: 'Roboto, Inter, sans-serif'
                  }}
                >
                  <span
                    style={{
                      padding: '2px 6px',
                      backgroundColor: 'rgba(212, 175, 55, 0.12)',
                      borderRadius: '8px',
                      border: '1px solid rgba(212, 175, 55, 0.2)',
                      fontSize: '10px',
                      fontWeight: 500
                    }}
                  >
                    @{user.username}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        <main
          style={{
            position: 'relative',
            zIndex: 10,
            flex: 1,
            minWidth: 0
          }}
        >
          {children}
        </main>
      </div>
    </div>
  )
}

export default Layout




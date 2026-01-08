import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import logoImage from '../assets/logo.png'

const AdminPanel = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('users')
  const [users, setUsers] = useState([])
  const [teachers, setTeachers] = useState([])
  const [klasList, setKlasList] = useState([])
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })

  const [userForm, setUserForm] = useState({
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    userType: 'STUDENT',
    klasId: ''
  })

  const [klasForm, setKlasForm] = useState({
    name: '',
    description: '',
    schoolYear: '',
    teacherId: ''
  })

  useEffect(() => {
    fetchUsers()
    fetchTeachers()
  }, [])

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/admin/users?limit=50', {
        credentials: 'include'
      })
      if (response.ok) {
        const data = await response.json()
        setUsers(data)
      } else if (response.status === 401 || response.status === 403) {
        navigate('/login', { state: { error: 'You need to be logged in as an admin to access this page.' } })
      } else {
        navigate('/error', { state: { error: 'Failed to load users. Please try again.' } })
      }
    } catch (error) {
      console.error('Error fetching users:', error)
      navigate('/error', { state: { error: 'Unable to connect to server. Please check your connection.' } })
    }
  }

  const fetchTeachers = async () => {
    try {
      const response = await fetch('/api/admin/teachers', {
        credentials: 'include'
      })
      if (response.ok) {
        const data = await response.json()
        setTeachers(data)
      } else if (response.status === 401 || response.status === 403) {
        navigate('/login', { state: { error: 'You need to be logged in as an admin to access this page.' } })
      }
    } catch (error) {
      console.error('Error fetching teachers:', error)
    }
  }

  const handleCreateUser = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage({ type: '', text: '' })

    try {
      const response = await fetch('/api/admin/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          firstName: userForm.firstName,
          lastName: userForm.lastName,
          username: userForm.username,
          password: userForm.password,
          userType: userForm.userType,
          klasId: userForm.klasId && userForm.klasId.trim() !== '' ? userForm.klasId : null
        })
      })

      const data = await response.json()

      if (response.ok) {
        setMessage({ type: 'success', text: 'User created successfully!' })
        setUserForm({
          firstName: '',
          lastName: '',
          username: '',
          password: '',
          userType: 'STUDENT',
          klasId: ''
        })
        fetchUsers()
      } else {
        let errorMessage = 'Failed to create user'
        if (typeof data === 'string') {
          errorMessage = data
        } else if (data.message) {
          errorMessage = data.message
        } else if (data.error) {
          errorMessage = data.error
        } else if (data.errors && Array.isArray(data.errors)) {
          errorMessage = data.errors.map(e => e.defaultMessage || e.message).join(', ')
        }
        setMessage({ type: 'error', text: errorMessage })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Unable to connect to server. Please check your connection and try again.' })
    } finally {
      setLoading(false)
    }
  }

  const handleCreateKlas = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage({ type: '', text: '' })

    try {
      const response = await fetch('/api/admin/klas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          name: klasForm.name,
          description: klasForm.description,
          schoolYear: klasForm.schoolYear,
          teacherId: klasForm.teacherId
        })
      })

      const data = await response.json()

      if (response.ok) {
        setMessage({ type: 'success', text: 'Klas created successfully!' })
        setKlasForm({
          name: '',
          description: '',
          schoolYear: '',
          teacherId: ''
        })
        fetchTeachers()
      } else {
        let errorMessage = 'Failed to create klas'
        if (typeof data === 'string') {
          errorMessage = data
        } else if (data.message) {
          errorMessage = data.message
        } else if (data.error) {
          errorMessage = data.error
        } else if (data.errors && Array.isArray(data.errors)) {
          errorMessage = data.errors.map(e => e.defaultMessage || e.message).join(', ')
        }
        setMessage({ type: 'error', text: errorMessage })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Unable to connect to server. Please check your connection and try again.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
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
            width: '40px',
            height: '40px',
            objectFit: 'contain',
            filter: 'drop-shadow(0 2px 8px rgba(184, 134, 11, 0.3))'
          }}
        />
        <h1
          style={{
            fontSize: '28px',
            fontWeight: 700,
            color: '#d4af37',
            fontFamily: 'Inter, Montserrat, sans-serif',
            letterSpacing: '-0.02em'
          }}
        >
          Admin Panel
        </h1>
      </div>

      <div
        style={{
          display: 'flex',
          gap: '12px',
          borderBottom: '1px solid rgba(212, 175, 55, 0.2)',
          marginBottom: '24px'
        }}
      >
        <button
          onClick={() => setActiveTab('users')}
          style={{
            padding: '12px 24px',
            border: 'none',
            background: 'transparent',
            color: activeTab === 'users' ? '#d4af37' : '#c9a961',
            borderBottom: activeTab === 'users' ? '2px solid #d4af37' : '2px solid transparent',
            cursor: 'pointer',
            fontSize: '15px',
            fontWeight: activeTab === 'users' ? 600 : 500,
            fontFamily: 'Inter, Montserrat, sans-serif',
            transition: 'all 0.2s ease'
          }}
        >
          Manage Users
        </button>
        <button
          onClick={() => setActiveTab('klas')}
          style={{
            padding: '12px 24px',
            border: 'none',
            background: 'transparent',
            color: activeTab === 'klas' ? '#d4af37' : '#c9a961',
            borderBottom: activeTab === 'klas' ? '2px solid #d4af37' : '2px solid transparent',
            cursor: 'pointer',
            fontSize: '15px',
            fontWeight: activeTab === 'klas' ? 600 : 500,
            fontFamily: 'Inter, Montserrat, sans-serif',
            transition: 'all 0.2s ease'
          }}
        >
          Manage Klas
        </button>
      </div>

      {message.text && (
        <div
          style={{
            padding: '12px 20px',
            borderRadius: '8px',
            backgroundColor: message.type === 'success' 
              ? 'rgba(16, 185, 129, 0.15)' 
              : 'rgba(239, 68, 68, 0.15)',
            border: `1px solid ${message.type === 'success' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
            color: message.type === 'success' ? '#10b981' : '#ef4444',
            fontSize: '14px',
            fontFamily: 'Roboto, Inter, sans-serif'
          }}
        >
          {message.text}
        </div>
      )}

      {activeTab === 'users' && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '24px'
          }}
        >
          <div
            style={{
              backgroundColor: 'rgba(45, 35, 26, 0.7)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(212, 175, 55, 0.2)',
              borderRadius: '16px',
              padding: '24px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
            }}
          >
            <h2
              style={{
                fontSize: '20px',
                fontWeight: 600,
                color: '#d4af37',
                fontFamily: 'Inter, Montserrat, sans-serif',
                marginBottom: '20px'
              }}
            >
              Create New User
            </h2>
            <form onSubmit={handleCreateUser}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label
                    style={{
                      display: 'block',
                      color: '#c9a961',
                      fontSize: '14px',
                      fontWeight: 500,
                      marginBottom: '6px',
                      fontFamily: 'Roboto, Inter, sans-serif'
                    }}
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    required
                    value={userForm.firstName}
                    onChange={(e) => setUserForm({ ...userForm, firstName: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      backgroundColor: 'rgba(26, 22, 18, 0.6)',
                      border: '1px solid rgba(212, 175, 55, 0.3)',
                      borderRadius: '8px',
                      color: '#f5e6d3',
                      fontSize: '14px',
                      fontFamily: 'Roboto, Inter, sans-serif',
                      outline: 'none',
                      transition: 'all 0.2s ease'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = 'rgba(212, 175, 55, 0.6)'
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(212, 175, 55, 0.3)'
                    }}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: 'block',
                      color: '#c9a961',
                      fontSize: '14px',
                      fontWeight: 500,
                      marginBottom: '6px',
                      fontFamily: 'Roboto, Inter, sans-serif'
                    }}
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    required
                    value={userForm.lastName}
                    onChange={(e) => setUserForm({ ...userForm, lastName: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      backgroundColor: 'rgba(26, 22, 18, 0.6)',
                      border: '1px solid rgba(212, 175, 55, 0.3)',
                      borderRadius: '8px',
                      color: '#f5e6d3',
                      fontSize: '14px',
                      fontFamily: 'Roboto, Inter, sans-serif',
                      outline: 'none',
                      transition: 'all 0.2s ease'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = 'rgba(212, 175, 55, 0.6)'
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(212, 175, 55, 0.3)'
                    }}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: 'block',
                      color: '#c9a961',
                      fontSize: '14px',
                      fontWeight: 500,
                      marginBottom: '6px',
                      fontFamily: 'Roboto, Inter, sans-serif'
                    }}
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    required
                    value={userForm.username}
                    onChange={(e) => setUserForm({ ...userForm, username: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      backgroundColor: 'rgba(26, 22, 18, 0.6)',
                      border: '1px solid rgba(212, 175, 55, 0.3)',
                      borderRadius: '8px',
                      color: '#f5e6d3',
                      fontSize: '14px',
                      fontFamily: 'Roboto, Inter, sans-serif',
                      outline: 'none',
                      transition: 'all 0.2s ease'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = 'rgba(212, 175, 55, 0.6)'
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(212, 175, 55, 0.3)'
                    }}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: 'block',
                      color: '#c9a961',
                      fontSize: '14px',
                      fontWeight: 500,
                      marginBottom: '6px',
                      fontFamily: 'Roboto, Inter, sans-serif'
                    }}
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    value={userForm.password}
                    onChange={(e) => setUserForm({ ...userForm, password: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      backgroundColor: 'rgba(26, 22, 18, 0.6)',
                      border: '1px solid rgba(212, 175, 55, 0.3)',
                      borderRadius: '8px',
                      color: '#f5e6d3',
                      fontSize: '14px',
                      fontFamily: 'Roboto, Inter, sans-serif',
                      outline: 'none',
                      transition: 'all 0.2s ease'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = 'rgba(212, 175, 55, 0.6)'
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(212, 175, 55, 0.3)'
                    }}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: 'block',
                      color: '#c9a961',
                      fontSize: '14px',
                      fontWeight: 500,
                      marginBottom: '6px',
                      fontFamily: 'Roboto, Inter, sans-serif'
                    }}
                  >
                    User Type
                  </label>
                  <select
                    required
                    value={userForm.userType}
                    onChange={(e) => setUserForm({ ...userForm, userType: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      backgroundColor: 'rgba(26, 22, 18, 0.6)',
                      border: '1px solid rgba(212, 175, 55, 0.3)',
                      borderRadius: '8px',
                      color: '#f5e6d3',
                      fontSize: '14px',
                      fontFamily: 'Roboto, Inter, sans-serif',
                      outline: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = 'rgba(212, 175, 55, 0.6)'
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(212, 175, 55, 0.3)'
                    }}
                  >
                    <option value="STUDENT">Student</option>
                    <option value="TEACHER">Teacher</option>
                    <option value="ADMIN">Admin</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    padding: '12px 24px',
                    backgroundColor: '#d4af37',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#1a1612',
                    fontSize: '15px',
                    fontWeight: 600,
                    cursor: loading ? 'not-allowed' : 'pointer',
                    fontFamily: 'Inter, Montserrat, sans-serif',
                    transition: 'all 0.2s ease',
                    opacity: loading ? 0.6 : 1
                  }}
                  onMouseEnter={(e) => {
                    if (!loading) {
                      e.target.style.backgroundColor = '#b8860b'
                      e.target.style.transform = 'translateY(-1px)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!loading) {
                      e.target.style.backgroundColor = '#d4af37'
                      e.target.style.transform = 'translateY(0)'
                    }
                  }}
                >
                  {loading ? 'Creating...' : 'Create User'}
                </button>
              </div>
            </form>
          </div>

          <div
            style={{
              backgroundColor: 'rgba(45, 35, 26, 0.7)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(212, 175, 55, 0.2)',
              borderRadius: '16px',
              padding: '24px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              maxHeight: '600px',
              overflowY: 'auto'
            }}
          >
            <h2
              style={{
                fontSize: '20px',
                fontWeight: 600,
                color: '#d4af37',
                fontFamily: 'Inter, Montserrat, sans-serif',
                marginBottom: '20px'
              }}
            >
              Recent Users
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {users.map((user) => (
                <div
                  key={user.id}
                  style={{
                    padding: '12px',
                    backgroundColor: 'rgba(26, 22, 18, 0.4)',
                    border: '1px solid rgba(212, 175, 55, 0.2)',
                    borderRadius: '8px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div
                        style={{
                          color: '#d4af37',
                          fontSize: '15px',
                          fontWeight: 600,
                          fontFamily: 'Inter, Montserrat, sans-serif'
                        }}
                      >
                        {user.firstName} {user.lastName}
                      </div>
                      <div
                        style={{
                          color: '#c9a961',
                          fontSize: '13px',
                          fontFamily: 'Roboto, Inter, sans-serif',
                          marginTop: '4px'
                        }}
                      >
                        @{user.username} • {user.userType}
                      </div>
                    </div>
                    <div
                      style={{
                        color: 'rgba(201, 169, 97, 0.6)',
                        fontSize: '12px',
                        fontFamily: 'Roboto, Inter, sans-serif'
                      }}
                    >
                      {user.createdAt}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'klas' && (
        <div
          style={{
            backgroundColor: 'rgba(45, 35, 26, 0.7)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(212, 175, 55, 0.2)',
            borderRadius: '16px',
            padding: '24px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            maxWidth: '600px'
          }}
        >
          <h2
            style={{
              fontSize: '20px',
              fontWeight: 600,
              color: '#d4af37',
              fontFamily: 'Inter, Montserrat, sans-serif',
              marginBottom: '20px'
            }}
          >
            Create New Klas
          </h2>
          <form onSubmit={handleCreateKlas}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label
                  style={{
                    display: 'block',
                    color: '#c9a961',
                    fontSize: '14px',
                    fontWeight: 500,
                    marginBottom: '6px',
                    fontFamily: 'Roboto, Inter, sans-serif'
                  }}
                >
                  Klas Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., 11A"
                  value={klasForm.name}
                  onChange={(e) => setKlasForm({ ...klasForm, name: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    backgroundColor: 'rgba(26, 22, 18, 0.6)',
                    border: '1px solid rgba(212, 175, 55, 0.3)',
                    borderRadius: '8px',
                    color: '#f5e6d3',
                    fontSize: '14px',
                    fontFamily: 'Roboto, Inter, sans-serif',
                    outline: 'none',
                    transition: 'all 0.2s ease'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'rgba(212, 175, 55, 0.6)'
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(212, 175, 55, 0.3)'
                  }}
                />
              </div>

              <div>
                <label
                  style={{
                    display: 'block',
                    color: '#c9a961',
                    fontSize: '14px',
                    fontWeight: 500,
                    marginBottom: '6px',
                    fontFamily: 'Roboto, Inter, sans-serif'
                  }}
                >
                  Description
                </label>
                <textarea
                  value={klasForm.description}
                  onChange={(e) => setKlasForm({ ...klasForm, description: e.target.value })}
                  rows={3}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    backgroundColor: 'rgba(26, 22, 18, 0.6)',
                    border: '1px solid rgba(212, 175, 55, 0.3)',
                    borderRadius: '8px',
                    color: '#f5e6d3',
                    fontSize: '14px',
                    fontFamily: 'Roboto, Inter, sans-serif',
                    outline: 'none',
                    resize: 'vertical',
                    transition: 'all 0.2s ease'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'rgba(212, 175, 55, 0.6)'
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(212, 175, 55, 0.3)'
                  }}
                />
              </div>

              <div>
                <label
                  style={{
                    display: 'block',
                    color: '#c9a961',
                    fontSize: '14px',
                    fontWeight: 500,
                    marginBottom: '6px',
                    fontFamily: 'Roboto, Inter, sans-serif'
                  }}
                >
                  School Year
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., 2024-2025"
                  value={klasForm.schoolYear}
                  onChange={(e) => setKlasForm({ ...klasForm, schoolYear: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    backgroundColor: 'rgba(26, 22, 18, 0.6)',
                    border: '1px solid rgba(212, 175, 55, 0.3)',
                    borderRadius: '8px',
                    color: '#f5e6d3',
                    fontSize: '14px',
                    fontFamily: 'Roboto, Inter, sans-serif',
                    outline: 'none',
                    transition: 'all 0.2s ease'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'rgba(212, 175, 55, 0.6)'
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(212, 175, 55, 0.3)'
                  }}
                />
              </div>

              <div>
                <label
                  style={{
                    display: 'block',
                    color: '#c9a961',
                    fontSize: '14px',
                    fontWeight: 500,
                    marginBottom: '6px',
                    fontFamily: 'Roboto, Inter, sans-serif'
                  }}
                >
                  Teacher
                </label>
                <select
                  required
                  value={klasForm.teacherId}
                  onChange={(e) => setKlasForm({ ...klasForm, teacherId: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    backgroundColor: 'rgba(26, 22, 18, 0.6)',
                    border: '1px solid rgba(212, 175, 55, 0.3)',
                    borderRadius: '8px',
                    color: '#f5e6d3',
                    fontSize: '14px',
                    fontFamily: 'Roboto, Inter, sans-serif',
                    outline: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'rgba(212, 175, 55, 0.6)'
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(212, 175, 55, 0.3)'
                  }}
                >
                  <option value="">Select a teacher</option>
                  {teachers.map((teacher) => (
                    <option key={teacher.id} value={teacher.id}>
                      {teacher.firstName} {teacher.lastName} (@{teacher.username})
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#d4af37',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#1a1612',
                  fontSize: '15px',
                  fontWeight: 600,
                  cursor: loading ? 'not-allowed' : 'pointer',
                  fontFamily: 'Inter, Montserrat, sans-serif',
                  transition: 'all 0.2s ease',
                  opacity: loading ? 0.6 : 1
                }}
                onMouseEnter={(e) => {
                  if (!loading) {
                    e.target.style.backgroundColor = '#b8860b'
                    e.target.style.transform = 'translateY(-1px)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (!loading) {
                    e.target.style.backgroundColor = '#d4af37'
                    e.target.style.transform = 'translateY(0)'
                  }
                }}
              >
                {loading ? 'Creating...' : 'Create Klas'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}

export default AdminPanel


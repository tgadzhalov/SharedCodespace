import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import logoImage from '../assets/logo.png'

const AssignmentCreation = () => {
  const navigate = useNavigate()
  const [klasList, setKlasList] = useState([])
  const [assignments, setAssignments] = useState([])
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })
  const [selectedKlasId, setSelectedKlasId] = useState('')

  const [assignmentForm, setAssignmentForm] = useState({
    title: '',
    description: '',
    sessionDate: '',
    klasId: ''
  })

  useEffect(() => {
    fetchMyKlas()
  }, [])

  useEffect(() => {
    if (selectedKlasId) {
      fetchAssignments(selectedKlasId)
    }
  }, [selectedKlasId])

  const fetchMyKlas = async () => {
    try {
      const response = await fetch('/api/klas/my', {
        credentials: 'include'
      })
      if (response.ok) {
        const data = await response.json()
        setKlasList(data)
        if (data.length > 0) {
          setSelectedKlasId(data[0].id)
          setAssignmentForm({ ...assignmentForm, klasId: data[0].id })
        }
      } else if (response.status === 401 || response.status === 403) {
        navigate('/login', { state: { error: 'You need to be logged in as a teacher to access this page.' } })
      } else {
        navigate('/error', { state: { error: 'Failed to load klas. Please try again.' } })
      }
    } catch (error) {
      console.error('Error fetching klas:', error)
      navigate('/error', { state: { error: 'Unable to connect to server. Please check your connection.' } })
    }
  }

  const fetchAssignments = async (klasId) => {
    try {
      const response = await fetch(`/api/assignments/klas/${klasId}`, {
        credentials: 'include'
      })
      if (response.ok) {
        const data = await response.json()
        setAssignments(data)
      }
    } catch (error) {
      console.error('Error fetching assignments:', error)
    }
  }

  const handleCreateAssignment = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage({ type: '', text: '' })

    try {
      const response = await fetch('/api/assignments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          title: assignmentForm.title,
          description: assignmentForm.description,
          sessionDate: new Date(assignmentForm.sessionDate).toISOString(),
          klasId: assignmentForm.klasId
        })
      })

      const data = await response.json()

      if (response.ok) {
        setMessage({ type: 'success', text: 'Assignment created successfully!' })
        setAssignmentForm({
          title: '',
          description: '',
          sessionDate: '',
          klasId: assignmentForm.klasId
        })
        if (selectedKlasId) {
          fetchAssignments(selectedKlasId)
        }
      } else {
        let errorMessage = 'Failed to create assignment'
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

  const formatDate = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
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
          Create Assignment
        </h1>
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
            New Assignment
          </h2>
          <form onSubmit={handleCreateAssignment}>
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
                  Klas
                </label>
                <select
                  required
                  value={assignmentForm.klasId}
                  onChange={(e) => {
                    setAssignmentForm({ ...assignmentForm, klasId: e.target.value })
                    setSelectedKlasId(e.target.value)
                  }}
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
                  <option value="">Select a klas</option>
                  {klasList.map((klas) => (
                    <option key={klas.id} value={klas.id}>
                      {klas.name} - {klas.schoolYear}
                    </option>
                  ))}
                </select>
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
                  Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Work in Class 8 January"
                  value={assignmentForm.title}
                  onChange={(e) => setAssignmentForm({ ...assignmentForm, title: e.target.value })}
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
                  value={assignmentForm.description}
                  onChange={(e) => setAssignmentForm({ ...assignmentForm, description: e.target.value })}
                  rows={4}
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
                  Session Date & Time
                </label>
                <input
                  type="datetime-local"
                  required
                  value={assignmentForm.sessionDate}
                  onChange={(e) => setAssignmentForm({ ...assignmentForm, sessionDate: e.target.value })}
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
                {loading ? 'Creating...' : 'Create Assignment'}
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
            Assignments
            {selectedKlasId && klasList.find(k => k.id === selectedKlasId) && (
              <span
                style={{
                  fontSize: '14px',
                  fontWeight: 400,
                  color: '#c9a961',
                  marginLeft: '8px'
                }}
              >
                - {klasList.find(k => k.id === selectedKlasId).name}
              </span>
            )}
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {assignments.length === 0 ? (
              <div
                style={{
                  padding: '24px',
                  textAlign: 'center',
                  color: 'rgba(201, 169, 97, 0.6)',
                  fontSize: '14px',
                  fontFamily: 'Roboto, Inter, sans-serif'
                }}
              >
                No assignments yet. Create one to get started.
              </div>
            ) : (
              assignments.map((assignment) => (
                <div
                  key={assignment.id}
                  style={{
                    padding: '16px',
                    backgroundColor: 'rgba(26, 22, 18, 0.4)',
                    border: '1px solid rgba(212, 175, 55, 0.2)',
                    borderRadius: '8px'
                  }}
                >
                  <div
                    style={{
                      color: '#d4af37',
                      fontSize: '16px',
                      fontWeight: 600,
                      fontFamily: 'Inter, Montserrat, sans-serif',
                      marginBottom: '8px'
                    }}
                  >
                    {assignment.title}
                  </div>
                  {assignment.description && (
                    <div
                      style={{
                        color: '#c9a961',
                        fontSize: '13px',
                        fontFamily: 'Roboto, Inter, sans-serif',
                        marginBottom: '8px',
                        lineHeight: '1.5'
                      }}
                    >
                      {assignment.description}
                    </div>
                  )}
                  <div
                    style={{
                      color: 'rgba(201, 169, 97, 0.6)',
                      fontSize: '12px',
                      fontFamily: 'Roboto, Inter, sans-serif'
                    }}
                  >
                    Session: {formatDate(assignment.sessionDate)}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AssignmentCreation


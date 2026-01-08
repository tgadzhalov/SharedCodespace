import { useState } from 'react'
import logoImage from '../assets/logo.png'

const HomePage = () => {
  const [personalCode, setPersonalCode] = useState('')
  const [submissions, setSubmissions] = useState([
    {
      id: 1,
      author: 'Student1',
      code: `public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
      timestamp: '2024-01-15 10:30 AM',
      comments: [
        {
          id: 1,
          author: 'Teacher1',
          text: 'Good job! Consider adding comments to explain your code.',
          timestamp: '2024-01-15 11:00 AM'
        },
        {
          id: 2,
          author: 'Student2',
          text: 'Nice and clean implementation!',
          timestamp: '2024-01-15 11:15 AM'
        }
      ]
    },
    {
      id: 2,
      author: 'Student2',
      code: `function factorial(n) {
    if (n === 0 || n === 1) return 1;
    return n * factorial(n - 1);
}`,
      timestamp: '2024-01-15 09:15 AM',
      comments: [
        {
          id: 3,
          author: 'Teacher1',
          text: 'Excellent recursive solution! Consider adding input validation.',
          timestamp: '2024-01-15 09:45 AM'
        }
      ]
    }
  ])
  const [expandedSubmission, setExpandedSubmission] = useState(null)
  const [newComment, setNewComment] = useState({})

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!personalCode.trim()) return
  }

  const handleAddComment = (submissionId) => {
    if (!newComment[submissionId]?.trim()) return
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

      {/* Header */}
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
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px'
            }}
          >
            <span
              style={{
                color: '#c9a961',
                fontSize: '14px',
                fontFamily: 'Roboto, Inter, sans-serif'
              }}
            >
              Welcome, User
            </span>
            <button
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
        </div>
      </header>

      {/* Main Content */}
      <main
        style={{
          position: 'relative',
          zIndex: 10,
          padding: '32px',
          maxWidth: '1600px',
          margin: '0 auto'
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '32px',
            height: 'calc(100vh - 100px)'
          }}
        >
          {/* Personal Workspace */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: 'rgba(45, 35, 26, 0.7)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(212, 175, 55, 0.2)',
              borderRadius: '16px',
              padding: '24px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              overflow: 'hidden'
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '20px',
                paddingBottom: '16px',
                borderBottom: '1px solid rgba(212, 175, 55, 0.2)'
              }}
            >
              <h2
                style={{
                  fontSize: '20px',
                  fontWeight: 600,
                  color: '#d4af37',
                  fontFamily: 'Inter, Montserrat, sans-serif'
                }}
              >
                Personal Workspace
              </h2>
              <span
                style={{
                  fontSize: '12px',
                  color: '#8b7355',
                  fontFamily: 'Roboto, Inter, sans-serif'
                }}
              >
                Your private code editor
              </span>
            </div>
            <form
              onSubmit={handleSubmit}
              style={{
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                gap: '16px',
                overflow: 'hidden'
              }}
            >
              <textarea
                value={personalCode}
                onChange={(e) => setPersonalCode(e.target.value)}
                placeholder="Write your code here..."
                style={{
                  flex: 1,
                  padding: '16px',
                  backgroundColor: 'rgba(26, 22, 18, 0.8)',
                  border: '1px solid rgba(212, 175, 55, 0.2)',
                  borderRadius: '12px',
                  color: '#f5e6d3',
                  fontSize: '14px',
                  fontFamily: '"Courier New", Consolas, monospace',
                  resize: 'none',
                  outline: 'none',
                  transition: 'all 0.2s ease',
                  lineHeight: '1.6'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#d4af37'
                  e.target.style.boxShadow = '0 0 0 3px rgba(212, 175, 55, 0.1)'
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(212, 175, 55, 0.2)'
                  e.target.style.boxShadow = 'none'
                }}
              />
              <button
                type="submit"
                disabled={!personalCode.trim()}
                style={{
                  padding: '14px 24px',
                  borderRadius: '8px',
                  fontWeight: 600,
                  color: '#1a1612',
                  background: personalCode.trim()
                    ? 'linear-gradient(135deg, #d4af37 0%, #b8940f 100%)'
                    : 'rgba(212, 175, 55, 0.3)',
                  border: 'none',
                  cursor: personalCode.trim() ? 'pointer' : 'not-allowed',
                  fontSize: '15px',
                  fontFamily: 'Inter, Montserrat, sans-serif',
                  transition: 'all 0.3s ease',
                  boxShadow: personalCode.trim()
                    ? '0 4px 12px rgba(212, 175, 55, 0.3)'
                    : 'none'
                }}
                onMouseEnter={(e) => {
                  if (personalCode.trim()) {
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(212, 175, 55, 0.4)'
                    e.currentTarget.style.transform = 'translateY(-2px)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (personalCode.trim()) {
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(212, 175, 55, 0.3)'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }
                }}
              >
                Submit to Shared Space
              </button>
            </form>
          </div>

          {/* Shared Workspace */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: 'rgba(45, 35, 26, 0.7)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(212, 175, 55, 0.2)',
              borderRadius: '16px',
              padding: '24px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              overflow: 'hidden'
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '20px',
                paddingBottom: '16px',
                borderBottom: '1px solid rgba(212, 175, 55, 0.2)'
              }}
            >
              <h2
                style={{
                  fontSize: '20px',
                  fontWeight: 600,
                  color: '#d4af37',
                  fontFamily: 'Inter, Montserrat, sans-serif'
                }}
              >
                Shared Workspace
              </h2>
              <span
                style={{
                  fontSize: '12px',
                  color: '#8b7355',
                  fontFamily: 'Roboto, Inter, sans-serif'
                }}
              >
                {submissions.length} submission{submissions.length !== 1 ? 's' : ''}
              </span>
            </div>
            <div
              style={{
                flex: 1,
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                paddingRight: '8px'
              }}
            >
              {submissions.map((submission) => (
                <div
                  key={submission.id}
                  style={{
                    backgroundColor: 'rgba(26, 22, 18, 0.6)',
                    border: '1px solid rgba(212, 175, 55, 0.2)',
                    borderRadius: '12px',
                    padding: '20px',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.4)'
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.2)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  {/* Submission Header */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '16px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div
                        style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '50%',
                          backgroundColor: 'rgba(212, 175, 55, 0.2)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#d4af37',
                          fontWeight: 600,
                          fontSize: '14px',
                          fontFamily: 'Inter, Montserrat, sans-serif'
                        }}
                      >
                        {submission.author[0].toUpperCase()}
                      </div>
                      <div>
                        <div
                          style={{
                            color: '#d4af37',
                            fontWeight: 600,
                            fontSize: '15px',
                            fontFamily: 'Inter, Montserrat, sans-serif'
                          }}
                        >
                          {submission.author}
                        </div>
                        <div
                          style={{
                            color: '#8b7355',
                            fontSize: '12px',
                            fontFamily: 'Roboto, Inter, sans-serif'
                          }}
                        >
                          {submission.timestamp}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        setExpandedSubmission(
                          expandedSubmission === submission.id ? null : submission.id
                        )
                      }
                      style={{
                        padding: '6px 12px',
                        backgroundColor: 'rgba(212, 175, 55, 0.1)',
                        border: '1px solid rgba(212, 175, 55, 0.3)',
                        borderRadius: '6px',
                        color: '#d4af37',
                        fontSize: '12px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        fontFamily: 'Roboto, Inter, sans-serif'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(212, 175, 55, 0.2)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(212, 175, 55, 0.1)'
                      }}
                    >
                      {expandedSubmission === submission.id ? 'Hide' : 'Show'} Code
                    </button>
                  </div>

                  {/* Code Preview/Full Code */}
                  {expandedSubmission === submission.id && (
                    <div
                      style={{
                        marginBottom: '16px',
                        backgroundColor: '#1a1612',
                        border: '1px solid rgba(212, 175, 55, 0.15)',
                        borderRadius: '8px',
                        padding: '16px',
                        overflowX: 'auto'
                      }}
                    >
                      <pre
                        style={{
                          margin: 0,
                          color: '#f5e6d3',
                          fontSize: '13px',
                          fontFamily: '"Courier New", Consolas, monospace',
                          lineHeight: '1.6',
                          whiteSpace: 'pre-wrap',
                          wordBreak: 'break-word'
                        }}
                      >
                        <code>{submission.code}</code>
                      </pre>
                    </div>
                  )}

                  {/* Comments Section */}
                  <div style={{ marginTop: '16px' }}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '12px'
                      }}
                    >
                      <h3
                        style={{
                          fontSize: '14px',
                          fontWeight: 600,
                          color: '#d4af37',
                          fontFamily: 'Inter, Montserrat, sans-serif'
                        }}
                      >
                        Comments ({submission.comments.length})
                      </h3>
                    </div>

                    {/* Existing Comments */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px' }}>
                      {submission.comments.map((comment) => (
                        <div
                          key={comment.id}
                          style={{
                            padding: '12px',
                            backgroundColor: 'rgba(212, 175, 55, 0.05)',
                            border: '1px solid rgba(212, 175, 55, 0.15)',
                            borderRadius: '8px'
                          }}
                        >
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                              marginBottom: '8px'
                            }}
                          >
                            <span
                              style={{
                                color: '#d4af37',
                                fontWeight: 600,
                                fontSize: '13px',
                                fontFamily: 'Inter, Montserrat, sans-serif'
                              }}
                            >
                              {comment.author}
                            </span>
                            <span
                              style={{
                                color: '#8b7355',
                                fontSize: '11px',
                                fontFamily: 'Roboto, Inter, sans-serif'
                              }}
                            >
                              {comment.timestamp}
                            </span>
                          </div>
                          <p
                            style={{
                              color: '#f5e6d3',
                              fontSize: '13px',
                              fontFamily: 'Roboto, Inter, sans-serif',
                              lineHeight: '1.5',
                              margin: 0
                            }}
                          >
                            {comment.text}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Add Comment Form */}
                    <div
                      style={{
                        display: 'flex',
                        gap: '8px',
                        alignItems: 'flex-start'
                      }}
                    >
                      <textarea
                        value={newComment[submission.id] || ''}
                        onChange={(e) =>
                          setNewComment({
                            ...newComment,
                            [submission.id]: e.target.value
                          })
                        }
                        placeholder="Add a comment..."
                        style={{
                          flex: 1,
                          padding: '10px 12px',
                          backgroundColor: 'rgba(26, 22, 18, 0.8)',
                          border: '1px solid rgba(212, 175, 55, 0.2)',
                          borderRadius: '8px',
                          color: '#f5e6d3',
                          fontSize: '13px',
                          fontFamily: 'Roboto, Inter, sans-serif',
                          resize: 'none',
                          outline: 'none',
                          minHeight: '60px',
                          transition: 'all 0.2s ease'
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#d4af37'
                          e.target.style.boxShadow = '0 0 0 2px rgba(212, 175, 55, 0.1)'
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = 'rgba(212, 175, 55, 0.2)'
                          e.target.style.boxShadow = 'none'
                        }}
                      />
                      <button
                        onClick={() => handleAddComment(submission.id)}
                        disabled={!newComment[submission.id]?.trim()}
                        style={{
                          padding: '10px 16px',
                          backgroundColor: newComment[submission.id]?.trim()
                            ? 'rgba(212, 175, 55, 0.2)'
                            : 'rgba(212, 175, 55, 0.1)',
                          border: '1px solid rgba(212, 175, 55, 0.3)',
                          borderRadius: '8px',
                          color: newComment[submission.id]?.trim() ? '#d4af37' : '#8b7355',
                          fontSize: '13px',
                          fontWeight: 500,
                          cursor: newComment[submission.id]?.trim() ? 'pointer' : 'not-allowed',
                          fontFamily: 'Roboto, Inter, sans-serif',
                          transition: 'all 0.2s ease',
                          whiteSpace: 'nowrap'
                        }}
                        onMouseEnter={(e) => {
                          if (newComment[submission.id]?.trim()) {
                            e.currentTarget.style.backgroundColor = 'rgba(212, 175, 55, 0.3)'
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (newComment[submission.id]?.trim()) {
                            e.currentTarget.style.backgroundColor = 'rgba(212, 175, 55, 0.2)'
                          }
                        }}
                      >
                        Post
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {submissions.length === 0 && (
                <div
                  style={{
                    textAlign: 'center',
                    padding: '60px 20px',
                    color: '#8b7355',
                    fontFamily: 'Roboto, Inter, sans-serif'
                  }}
                >
                  No submissions yet. Be the first to share your code!
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default HomePage





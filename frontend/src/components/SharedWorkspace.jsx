import { useState } from 'react'

const SharedWorkspace = () => {
  const [submissions, setSubmissions] = useState([
    {
      id: 1,
      author: 'Student1',
      code: `public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
        // This is a simple Java program
        // that prints a message to the console
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
        },
        {
          id: 3,
          author: 'Student3',
          text: 'You could also use printf for formatted output.',
          timestamp: '2024-01-15 11:20 AM'
        }
      ]
    },
    {
      id: 2,
      author: 'Student2',
      code: `function factorial(n) {
    if (n === 0 || n === 1) return 1;
    return n * factorial(n - 1);
}

console.log(factorial(5));`,
      timestamp: '2024-01-15 09:15 AM',
      comments: [
        {
          id: 4,
          author: 'Teacher1',
          text: 'Excellent recursive solution! Consider adding input validation.',
          timestamp: '2024-01-15 09:45 AM'
        },
        {
          id: 5,
          author: 'Student1',
          text: 'What happens with negative numbers?',
          timestamp: '2024-01-15 10:00 AM'
        }
      ]
    },
    {
      id: 3,
      author: 'Student3',
      code: `def quick_sort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quick_sort(left) + middle + quick_sort(right)`,
      timestamp: '2024-01-15 08:00 AM',
      comments: [
        {
          id: 6,
          author: 'Teacher1',
          text: 'Great implementation of quicksort! Very clean and readable.',
          timestamp: '2024-01-15 08:30 AM'
        }
      ]
    }
  ])
  const [selectedSubmission, setSelectedSubmission] = useState(null)
  const [newComment, setNewComment] = useState('')

  const handleAddComment = () => {
    if (!newComment.trim() || !selectedSubmission) return
  }

  const selectedSubmissionData = submissions.find(s => s.id === selectedSubmission)

  return (
    <div
      style={{
        display: 'flex',
        gap: '24px',
        height: 'calc(100vh - 140px)',
        overflow: 'hidden'
      }}
    >
      {/* Left Side - User List and Code Display */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: '1 1 65%',
          gap: '24px',
          minWidth: 0
        }}
      >
        {/* User List */}
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
              Contributors
            </h2>
            <span
              style={{
                fontSize: '14px',
                color: '#8b7355',
                fontFamily: 'Roboto, Inter, sans-serif'
              }}
            >
              {submissions.length} user{submissions.length !== 1 ? 's' : ''}
            </span>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              maxHeight: '200px',
              overflowY: 'auto',
              paddingRight: '8px'
            }}
          >
            {submissions.map((submission) => (
              <button
                key={submission.id}
                onClick={() => setSelectedSubmission(submission.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '14px 16px',
                  backgroundColor:
                    selectedSubmission === submission.id
                      ? 'rgba(212, 175, 55, 0.2)'
                      : 'rgba(26, 22, 18, 0.6)',
                  border: `1px solid ${
                    selectedSubmission === submission.id
                      ? 'rgba(212, 175, 55, 0.5)'
                      : 'rgba(212, 175, 55, 0.2)'
                  }`,
                  borderRadius: '10px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  textAlign: 'left',
                  width: '100%'
                }}
                onMouseEnter={(e) => {
                  if (selectedSubmission !== submission.id) {
                    e.currentTarget.style.backgroundColor = 'rgba(212, 175, 55, 0.1)'
                    e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.3)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedSubmission !== submission.id) {
                    e.currentTarget.style.backgroundColor = 'rgba(26, 22, 18, 0.6)'
                    e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.2)'
                  }
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(212, 175, 55, 0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#d4af37',
                      fontWeight: 600,
                      fontSize: '16px',
                      fontFamily: 'Inter, Montserrat, sans-serif',
                      flexShrink: 0
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
                        fontFamily: 'Inter, Montserrat, sans-serif',
                        marginBottom: '2px'
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
                <span
                  style={{
                    fontSize: '13px',
                    color: '#c9a961',
                    fontFamily: 'Roboto, Inter, sans-serif'
                  }}
                >
                  Show Code
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Code Display Area */}
        <div
          style={{
            flex: 1,
            backgroundColor: 'rgba(45, 35, 26, 0.7)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(212, 175, 55, 0.2)',
            borderRadius: '16px',
            padding: '32px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            minHeight: 0
          }}
        >
          {selectedSubmissionData ? (
            <>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '24px',
                  paddingBottom: '20px',
                  borderBottom: '1px solid rgba(212, 175, 55, 0.2)'
                }}
              >
                <div>
                  <h3
                    style={{
                      fontSize: '22px',
                      fontWeight: 600,
                      color: '#d4af37',
                      fontFamily: 'Inter, Montserrat, sans-serif',
                      marginBottom: '4px'
                    }}
                  >
                    {selectedSubmissionData.author}'s Code
                  </h3>
                  <p
                    style={{
                      fontSize: '14px',
                      color: '#8b7355',
                      fontFamily: 'Roboto, Inter, sans-serif',
                      margin: 0
                    }}
                  >
                    Submitted on {selectedSubmissionData.timestamp}
                  </p>
                </div>
              </div>
              <div
                style={{
                  flex: 1,
                  backgroundColor: '#1a1612',
                  border: '1px solid rgba(212, 175, 55, 0.15)',
                  borderRadius: '12px',
                  padding: '0',
                  overflow: 'auto',
                  minHeight: 0
                }}
              >
                <pre
                  style={{
                    margin: 0,
                    padding: '32px',
                    color: '#f5e6d3',
                    fontSize: '18px',
                    fontFamily: '"Courier New", Consolas, monospace',
                    lineHeight: '1.8',
                    whiteSpace: 'pre',
                    wordBreak: 'break-word',
                    display: 'flex',
                    gap: '24px'
                  }}
                >
                  <code
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 0,
                      minWidth: '100%'
                    }}
                  >
                    {selectedSubmissionData.code.split('\n').map((line, index) => (
                      <div
                        key={index}
                        style={{
                          display: 'flex',
                          gap: '24px',
                          minHeight: '1.8em'
                        }}
                      >
                        <span
                          style={{
                            color: '#8b7355',
                            fontSize: '18px',
                            fontFamily: '"Courier New", Consolas, monospace',
                            userSelect: 'none',
                            textAlign: 'right',
                            minWidth: '50px',
                            paddingRight: '16px',
                            borderRight: '1px solid rgba(212, 175, 55, 0.15)',
                            flexShrink: 0
                          }}
                        >
                          {index + 1}
                        </span>
                        <span
                          style={{
                            color: '#f5e6d3',
                            fontSize: '18px',
                            fontFamily: '"Courier New", Consolas, monospace',
                            whiteSpace: 'pre-wrap',
                            wordBreak: 'break-word',
                            flex: 1
                          }}
                        >
                          {line || ' '}
                        </span>
                      </div>
                    ))}
                  </code>
                </pre>
              </div>
            </>
          ) : (
            <div
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#8b7355',
                fontSize: '16px',
                fontFamily: 'Roboto, Inter, sans-serif'
              }}
            >
              Select a user from the list above to view their code
            </div>
          )}
        </div>
      </div>

      {/* Right Side - Comments Panel */}
      <div
        style={{
          flex: '1 1 35%',
          backgroundColor: 'rgba(45, 35, 26, 0.7)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(212, 175, 55, 0.2)',
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          minWidth: 0
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
            Comments
          </h2>
          {selectedSubmissionData && (
            <span
              style={{
                fontSize: '14px',
                color: '#8b7355',
                fontFamily: 'Roboto, Inter, sans-serif'
              }}
            >
              {selectedSubmissionData.comments.length}
            </span>
          )}
        </div>

        {/* Comments List */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            marginBottom: '20px',
            paddingRight: '8px',
            minHeight: 0
          }}
        >
          {selectedSubmissionData ? (
            selectedSubmissionData.comments.length > 0 ? (
              selectedSubmissionData.comments.map((comment) => (
                <div
                  key={comment.id}
                  style={{
                    padding: '16px',
                    backgroundColor: 'rgba(26, 22, 18, 0.6)',
                    border: '1px solid rgba(212, 175, 55, 0.2)',
                    borderRadius: '10px'
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      marginBottom: '10px'
                    }}
                  >
                    <div
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(212, 175, 55, 0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#d4af37',
                        fontWeight: 600,
                        fontSize: '13px',
                        fontFamily: 'Inter, Montserrat, sans-serif',
                        flexShrink: 0
                      }}
                    >
                      {comment.author[0].toUpperCase()}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          color: '#d4af37',
                          fontWeight: 600,
                          fontSize: '14px',
                          fontFamily: 'Inter, Montserrat, sans-serif',
                          marginBottom: '2px'
                        }}
                      >
                        {comment.author}
                      </div>
                      <div
                        style={{
                          color: '#8b7355',
                          fontSize: '11px',
                          fontFamily: 'Roboto, Inter, sans-serif'
                        }}
                      >
                        {comment.timestamp}
                      </div>
                    </div>
                  </div>
                  <p
                    style={{
                      color: '#f5e6d3',
                      fontSize: '14px',
                      fontFamily: 'Roboto, Inter, sans-serif',
                      lineHeight: '1.6',
                      margin: 0,
                      wordBreak: 'break-word'
                    }}
                  >
                    {comment.text}
                  </p>
                </div>
              ))
            ) : (
              <div
                style={{
                  textAlign: 'center',
                  padding: '40px 20px',
                  color: '#8b7355',
                  fontSize: '14px',
                  fontFamily: 'Roboto, Inter, sans-serif'
                }}
              >
                No comments yet. Be the first to comment!
              </div>
            )
          ) : (
            <div
              style={{
                textAlign: 'center',
                padding: '40px 20px',
                color: '#8b7355',
                fontSize: '14px',
                fontFamily: 'Roboto, Inter, sans-serif'
              }}
            >
              Select a code submission to view comments
            </div>
          )}
        </div>

        {/* Add Comment Form */}
        {selectedSubmissionData && (
          <div
            style={{
              borderTop: '1px solid rgba(212, 175, 55, 0.2)',
              paddingTop: '20px'
            }}
          >
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              style={{
                width: '100%',
                padding: '12px 16px',
                backgroundColor: 'rgba(26, 22, 18, 0.8)',
                border: '1px solid rgba(212, 175, 55, 0.2)',
                borderRadius: '10px',
                color: '#f5e6d3',
                fontSize: '14px',
                fontFamily: 'Roboto, Inter, sans-serif',
                resize: 'none',
                outline: 'none',
                minHeight: '80px',
                marginBottom: '12px',
                transition: 'all 0.2s ease',
                boxSizing: 'border-box'
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
              onClick={handleAddComment}
              disabled={!newComment.trim()}
              style={{
                width: '100%',
                padding: '12px 20px',
                backgroundColor: newComment.trim()
                  ? 'rgba(212, 175, 55, 0.2)'
                  : 'rgba(212, 175, 55, 0.1)',
                border: '1px solid rgba(212, 175, 55, 0.3)',
                borderRadius: '10px',
                color: newComment.trim() ? '#d4af37' : '#8b7355',
                fontSize: '14px',
                fontWeight: 500,
                cursor: newComment.trim() ? 'pointer' : 'not-allowed',
                fontFamily: 'Roboto, Inter, sans-serif',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                if (newComment.trim()) {
                  e.currentTarget.style.backgroundColor = 'rgba(212, 175, 55, 0.3)'
                  e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.5)'
                }
              }}
              onMouseLeave={(e) => {
                if (newComment.trim()) {
                  e.currentTarget.style.backgroundColor = 'rgba(212, 175, 55, 0.2)'
                  e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.3)'
                }
              }}
            >
              Post Comment
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default SharedWorkspace

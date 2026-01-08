import { useState } from 'react'

const PersonalWorkspace = () => {
  const [personalCode, setPersonalCode] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState('JAVA')

  const programmingLanguages = [
    { value: 'JAVA', label: 'Java' },
    { value: 'C_SHARP', label: 'C#' },
    { value: 'JAVA_SCRIPT', label: 'Java Script' },
    { value: 'HTML', label: 'HTML' },
    { value: 'CSS', label: 'CSS' },
    { value: 'C', label: 'C' },
    { value: 'OTHER', label: 'Other programming language' }
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!personalCode.trim()) return
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(100vh - 140px)',
        backgroundColor: 'rgba(45, 35, 26, 0.7)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(212, 175, 55, 0.2)',
        borderRadius: '16px',
        padding: '32px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        overflow: 'hidden'
      }}
    >
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
          <h2
            style={{
              fontSize: '24px',
              fontWeight: 600,
              color: '#d4af37',
              fontFamily: 'Inter, Montserrat, sans-serif',
              marginBottom: '4px'
            }}
          >
            Personal Workspace
          </h2>
          <p
            style={{
              fontSize: '14px',
              color: '#8b7355',
              fontFamily: 'Roboto, Inter, sans-serif',
              margin: 0
            }}
          >
            Your private code editor - write and edit your code here
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          gap: '20px',
          overflow: 'hidden'
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label
            htmlFor="language-select"
            style={{
              fontSize: '14px',
              fontWeight: 500,
              color: '#d4af37',
              fontFamily: 'Roboto, Inter, sans-serif'
            }}
          >
            Programming Language
          </label>
          <select
            id="language-select"
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            style={{
              padding: '12px 16px',
              backgroundColor: 'rgba(26, 22, 18, 0.8)',
              border: '1px solid rgba(212, 175, 55, 0.2)',
              borderRadius: '8px',
              color: '#f5e6d3',
              fontSize: '15px',
              fontFamily: 'Roboto, Inter, sans-serif',
              outline: 'none',
              transition: 'all 0.2s ease',
              cursor: 'pointer'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#d4af37'
              e.target.style.boxShadow = '0 0 0 3px rgba(212, 175, 55, 0.1)'
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'rgba(212, 175, 55, 0.2)'
              e.target.style.boxShadow = 'none'
            }}
          >
            {programmingLanguages.map((lang) => (
              <option
                key={lang.value}
                value={lang.value}
                style={{
                  backgroundColor: '#1a1612',
                  color: '#f5e6d3'
                }}
              >
                {lang.label}
              </option>
            ))}
          </select>
        </div>
        <textarea
          value={personalCode}
          onChange={(e) => setPersonalCode(e.target.value)}
          placeholder="Write your code here..."
          style={{
            flex: 1,
            padding: '20px',
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
            padding: '16px 32px',
            borderRadius: '8px',
            fontWeight: 600,
            color: '#1a1612',
            background: personalCode.trim()
              ? 'linear-gradient(135deg, #d4af37 0%, #b8940f 100%)'
              : 'rgba(212, 175, 55, 0.3)',
            border: 'none',
            cursor: personalCode.trim() ? 'pointer' : 'not-allowed',
            fontSize: '16px',
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
  )
}

export default PersonalWorkspace


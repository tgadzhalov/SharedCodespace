import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './components/LoginPage'
import Layout from './components/Layout'
import PersonalWorkspace from './components/PersonalWorkspace'
import SharedWorkspace from './components/SharedWorkspace'
import AdminPanel from './components/AdminPanel'
import AssignmentCreation from './components/AssignmentCreation'
import ErrorPage from './components/ErrorPage'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/error" element={<ErrorPage />} />
        <Route
          path="/personal"
          element={
            <ProtectedRoute>
              <Layout>
                <PersonalWorkspace />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/shared"
          element={
            <ProtectedRoute>
              <Layout>
                <SharedWorkspace />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Layout>
                <AdminPanel />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/assignments"
          element={
            <ProtectedRoute>
              <Layout>
                <AssignmentCreation />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to="/personal" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App



import React from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import ProjectDetail from './pages/ProjectDetail'
import NewProject from './pages/NewProject'
import NewMilestone from './pages/NewMilestone'
import Audit from './pages/Audit'
import { getToken, logout } from './utils/auth'

export default function App(){
  const navigate = useNavigate()
  const token = getToken()

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-5xl mx-auto p-4 flex justify-between items-center">
          <Link to="/" className="font-bold text-lg">Green H2 Subsidy</Link>
          <nav className="space-x-4">
            {token ? (
              <>
                <Link to="/" className="text-sm">Dashboard</Link>
                <Link to="/audit" className="text-sm">Audit</Link>
                <button className="text-sm" onClick={() => { logout(); navigate('/login') }}>Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-sm">Login</Link>
                <Link to="/register" className="text-sm">Register</Link>
              </>
            )}
          </nav>
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-6">
        <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/" element={<Dashboard/>} />
          <Route path="/projects/new" element={<NewProject/>} />
          <Route path="/projects/:id" element={<ProjectDetail/>} />
          <Route path="/projects/:id/milestones/new" element={<NewMilestone/>} />
          <Route path="/audit" element={<Audit/>} />
        </Routes>
      </main>
    </div>
  )
}

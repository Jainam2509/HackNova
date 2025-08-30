import React, { useEffect, useState } from 'react'
import api from '../utils/api'
import { Link } from 'react-router-dom'
import { getToken } from '../utils/auth'

export default function Dashboard(){
  const [projects, setProjects] = useState([])
  const [err, setErr] = useState('')

  useEffect(()=> {
    const fetch = async ()=> {
      try {
        if (!getToken()) { setProjects([]); return }
        const { data } = await api.get('/projects')
        setProjects(data)
      } catch (e) {
        setErr(e.response?.data?.message || 'Failed to load')
      }
    }
    fetch()
  },[])

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Projects</h2>
        <Link to="/projects/new" className="text-sm bg-blue-600 text-white px-3 py-1 rounded">New Project</Link>
      </div>

      {err && <div className="text-red-600 mb-2">{err}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map(p => (
          <div key={p._id} className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold">{p.name}</h3>
            <p className="text-sm text-gray-600">{p.description}</p>
            <div className="mt-3 flex justify-between">
              <Link to={`/projects/${p._id}`} className="text-sm text-blue-600">Open</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import api from '../utils/api'

export default function ProjectDetail(){
  const { id } = useParams()
  const [project, setProject] = useState(null)
  const [milestones, setMilestones] = useState([])
  const [err, setErr] = useState('')
  const nav = useNavigate()

  useEffect(()=> {
    const fetch = async () => {
      try {
        const { data: projects } = await api.get('/projects')
        const p = projects.find(x => x._id === id)
        setProject(p)
        const { data: ms } = await api.get(`/milestones/${id}`)
        setMilestones(ms)
      } catch (e) {
        setErr(e.response?.data?.message || 'Failed to load')
      }
    }
    fetch()
  }, [id])

  const trigger = async (mid) => {
    if (!confirm('Trigger disbursement for this milestone?')) return
    try {
      const { data } = await api.post(`/disbursements/${id}/${mid}/trigger`)
      alert('Disbursement: ' + data.status)
      nav('/')
    } catch (e) {
      alert('Failed: ' + (e.response?.data?.message || e.message))
    }
  }

  return (
    <div>
      {project ? (
        <div className="space-y-4">
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold">{project.name}</h2>
            <p className="text-sm text-gray-600">{project.description}</p>
            <div className="mt-2 text-xs text-gray-500">Baseline: {project.baselineCapacityKgPerDay || '—'} kg/day</div>
          </div>

          <div className="flex justify-between items-center">
            <h3 className="font-semibold">Milestones</h3>
            <Link to={`/projects/${id}/milestones/new`} className="text-sm bg-blue-600 text-white px-3 py-1 rounded">New Milestone</Link>
          </div>

          <div className="grid gap-3">
            {milestones.map(m => (
              <div key={m._id} className="bg-white p-3 rounded shadow flex justify-between items-center">
                <div>
                  <div className="font-semibold">{m.name}</div>
                  <div className="text-sm text-gray-600">Target: {m.targetValue} {m.unit} • Subsidy: {m.subsidyAmount}</div>
                  <div className="text-xs text-gray-500">Achieved: {m.achieved ? new Date(m.achievedAt).toLocaleString() : 'no'}</div>
                </div>
                <div className="space-y-2">
                  <button className="px-3 py-1 bg-green-600 text-white rounded text-sm" onClick={()=>trigger(m._id)}>Trigger</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}

      {err && <div className="text-red-600 mt-3">{err}</div>}
    </div>
  )
}

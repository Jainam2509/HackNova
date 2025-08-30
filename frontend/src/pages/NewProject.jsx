import React, { useState } from 'react'
import api from '../utils/api'
import { useNavigate } from 'react-router-dom'

export default function NewProject(){
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [baseline, setBaseline] = useState('')
  const nav = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    await api.post('/projects', { name, description, baselineCapacityKgPerDay: Number(baseline) })
    nav('/')
  }

  return (
    <div className="max-w-lg bg-white p-6 rounded shadow mx-auto">
      <h2 className="text-lg font-semibold mb-4">Create Project</h2>
      <form className="space-y-3" onSubmit={submit}>
        <input className="w-full p-2 border rounded" placeholder="Project name" value={name} onChange={e=>setName(e.target.value)} />
        <textarea className="w-full p-2 border rounded" placeholder="Description" value={description} onChange={e=>setDescription(e.target.value)} />
        <input className="w-full p-2 border rounded" placeholder="Baseline capacity (kg/day)" value={baseline} onChange={e=>setBaseline(e.target.value)} />
        <button className="w-full bg-blue-600 text-white py-2 rounded">Create</button>
      </form>
    </div>
  )
}

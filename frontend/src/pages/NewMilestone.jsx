import React, { useState } from 'react'
import api from '../utils/api'
import { useParams, useNavigate } from 'react-router-dom'

export default function NewMilestone(){
  const { id } = useParams()
  const [name, setName] = useState('')
  const [targetValue, setTargetValue] = useState('')
  const [unit, setUnit] = useState('kg')
  const [subsidyAmount, setSubsidyAmount] = useState('')
  const nav = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    await api.post('/milestones', { project: id, name, targetValue: Number(targetValue), unit, subsidyAmount: Number(subsidyAmount) })
    nav(`/projects/${id}`)
  }

  return (
    <div className="max-w-lg bg-white p-6 rounded shadow mx-auto">
      <h2 className="text-lg font-semibold mb-4">Create Milestone</h2>
      <form className="space-y-3" onSubmit={submit}>
        <input className="w-full p-2 border rounded" placeholder="Milestone name" value={name} onChange={e=>setName(e.target.value)} />
        <input className="w-full p-2 border rounded" placeholder="Target value" value={targetValue} onChange={e=>setTargetValue(e.target.value)} />
        <input className="w-full p-2 border rounded" placeholder="Unit (kg)" value={unit} onChange={e=>setUnit(e.target.value)} />
        <input className="w-full p-2 border rounded" placeholder="Subsidy amount (smallest unit, e.g., paise)" value={subsidyAmount} onChange={e=>setSubsidyAmount(e.target.value)} />
        <button className="w-full bg-blue-600 text-white py-2 rounded">Create</button>
      </form>
    </div>
  )
}

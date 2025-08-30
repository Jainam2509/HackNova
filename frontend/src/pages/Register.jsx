import React, { useState } from 'react'
import api from '../utils/api'
import { saveToken } from '../utils/auth'
import { useNavigate } from 'react-router-dom'

export default function Register(){
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('producer')
  const [err, setErr] = useState('')
  const nav = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    setErr('')
    try {
      const { data } = await api.post('/auth/register', { name, email, password, role })
      saveToken(data.token)
      nav('/')
    } catch (e) {
      setErr(e.response?.data?.message || 'Register failed')
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-lg font-semibold mb-4">Register</h2>
      {err && <div className="text-red-600 mb-2">{err}</div>}
      <form onSubmit={submit} className="space-y-3">
        <input className="w-full p-2 border rounded" placeholder="Full name" value={name} onChange={e=>setName(e.target.value)} />
        <input className="w-full p-2 border rounded" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input type="password" className="w-full p-2 border rounded" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
        <select className="w-full p-2 border rounded" value={role} onChange={e=>setRole(e.target.value)}>
          <option value="producer">Producer</option>
          <option value="auditor">Auditor</option>
          <option value="bank">Bank</option>
          <option value="gov">Gov</option>
        </select>
        <button className="w-full bg-green-600 text-white py-2 rounded">Register</button>
      </form>
    </div>
  )
}

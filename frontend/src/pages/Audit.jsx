import React, { useEffect, useState } from 'react'
import api from '../utils/api'

export default function Audit(){
  const [items, setItems] = useState([])
  const [err, setErr] = useState('')

  useEffect(()=> {
    const fetch = async ()=> {
      try {
        const { data } = await api.get('/audit')
        setItems(data)
      } catch (e) {
        setErr(e.response?.data?.message || 'Failed to load')
      }
    }
    fetch()
  },[])

  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">Audit Logs</h2>
      {err && <div className="text-red-600 mb-2">{err}</div>}
      <div className="space-y-2">
        {items.map(it => (
          <div key={it._id} className="bg-white p-3 rounded shadow">
            <div className="text-sm text-gray-600">{new Date(it.createdAt).toLocaleString()} • {it.actor}</div>
            <div className="font-semibold">{it.action}</div>
            <div className="text-xs text-gray-700">{JSON.stringify(it.metadata)}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

import axios from 'axios'
const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000/api'

const instance = axios.create({
  baseURL: API_BASE,
})

export const setToken = (t) => { if (t) instance.defaults.headers.common['Authorization'] = `Bearer ${t}`; else delete instance.defaults.headers.common['Authorization'] }

export default instance

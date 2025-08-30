import api, { setToken } from './api'

const KEY = 'gh2_token'
export const saveToken = (token) => {
  localStorage.setItem(KEY, token)
  setToken(token)
}
export const getToken = () => {
  const t = localStorage.getItem(KEY)
  if (t) setToken(t)
  return t
}
export const logout = () => {
  localStorage.removeItem(KEY)
  setToken(null)
}

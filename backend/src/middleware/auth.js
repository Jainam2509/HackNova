import jwt from 'jsonwebtoken'
import User from '../models/User.js'

export const protect = async (req, res, next) => {
  const auth = req.headers.authorization || ''
  const token = auth.startsWith('Bearer ') ? auth.split(' ')[1] : null
  if (!token) return res.status(401).json({ message: 'No token' })
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(decoded.id).select('-password')
    if (!req.user) return res.status(401).json({ message: 'Invalid token user' })
    next()
  } catch {
    res.status(401).json({ message: 'Invalid token' })
  }
}

export const adminOnly = (req, res, next) => {
  if (req.user?.role === 'admin') return next()
  return res.status(403).json({ message: 'Admin only' })
}

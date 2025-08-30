import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import { audit } from '../services/auditService.js'

const tokenFor = (user) => jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' })

export const register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body
    const exists = await User.findOne({ email })
    if (exists) return res.status(400).json({ message: 'Email in use' })
    const user = await User.create({ name, email, password, role })
    await audit(String(user._id), 'user.register', 'User', String(user._id))
    res.status(201).json({ token: tokenFor(user), user: { id: user._id, name, email, role: user.role } })
  } catch (e) { next(e) }
}

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user || !(await user.matchPassword(password))) return res.status(401).json({ message: 'Invalid credentials' })
    await audit(String(user._id), 'user.login', 'User', String(user._id))
    res.json({ token: tokenFor(user), user: { id: user._id, name: user.name, email, role: user.role } })
  } catch (e) { next(e) }
}

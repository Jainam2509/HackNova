import { Router } from 'express'
import { protect, adminOnly } from '../middleware/auth.js'
import { listAudit } from '../controllers/audit.controller.js'

const r = Router()
r.use(protect, adminOnly)
r.get('/', listAudit)
export default r

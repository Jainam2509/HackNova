import { Router } from 'express'
import { seedAdmin } from '../controllers/admin.controller.js'

const r = Router()
r.post('/seed-admin', seedAdmin)
export default r

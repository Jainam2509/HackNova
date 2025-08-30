import { Router } from 'express'
import { protect } from '../middleware/auth.js'
import { createMilestone, listMilestones } from '../controllers/milestones.controller.js'

const r = Router()
r.use(protect)
r.post('/', createMilestone)
r.get('/:projectId', listMilestones)
export default r

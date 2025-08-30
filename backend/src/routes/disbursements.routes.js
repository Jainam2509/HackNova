import { Router } from 'express'
import { protect } from '../middleware/auth.js'
import { triggerDisbursement } from '../controllers/disbursements.controller.js'

const r = Router()
r.use(protect)
r.post('/:projectId/:milestoneId/trigger', triggerDisbursement)
export default r

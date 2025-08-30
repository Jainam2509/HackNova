import { attemptDisbursement } from '../services/subsidyService.js'

export const triggerDisbursement = async (req, res, next) => {
  try {
    const { projectId, milestoneId } = req.params
    const disb = await attemptDisbursement(projectId, milestoneId)
    res.json(disb)
  } catch (e) { next(e) }
}

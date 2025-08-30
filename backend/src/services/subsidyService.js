import Project from '../models/Project.js'
import Milestone from '../models/Milestone.js'
import { verifyMilestoneOnChain } from './contractService.js'
import { triggerPayout } from './paymentService.js'
import { audit } from './auditService.js'

export const attemptDisbursement = async (projectId, milestoneId) => {
  const project = await Project.findById(projectId)
  const milestone = await Milestone.findById(milestoneId)
  if (!project || !milestone) throw new Error('Project or milestone not found')
  if (!milestone.achieved) throw new Error('Milestone not yet achieved (off-chain)')

  const ok = await verifyMilestoneOnChain(String(project._id), String(milestone._id))
  if (!ok) throw new Error('On-chain verification failed')

  const disb = await triggerPayout(project, milestone)
  await audit('system', 'disbursement.triggered', 'Milestone', String(milestone._id), { disbursementId: disb._id })
  return disb
}

import Milestone from '../models/Milestone.js'
import { audit } from '../services/auditService.js'

export const createMilestone = async (req, res, next) => {
  try {
    const ms = await Milestone.create(req.body)
    await audit(String(req.user._id), 'milestone.create', 'Milestone', String(ms._id), req.body)
    res.status(201).json(ms)
  } catch (e) { next(e) }
}

export const listMilestones = async (req, res, next) => {
  try {
    const items = await Milestone.find({ project: req.params.projectId })
    res.json(items)
  } catch (e) { next(e) }
}

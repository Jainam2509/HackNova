import Project from '../models/Project.js'
import { audit } from '../services/auditService.js'

export const createProject = async (req, res, next) => {
  try {
    const project = await Project.create({ ...req.body, owner: req.user._id })
    await audit(String(req.user._id), 'project.create', 'Project', String(project._id), req.body)
    res.status(201).json(project)
  } catch (e) { next(e) }
}

export const listProjects = async (req, res, next) => {
  try {
    const items = await Project.find({ owner: req.user._id })
    res.json(items)
  } catch (e) { next(e) }
}

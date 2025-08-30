import { Router } from 'express'
import { protect } from '../middleware/auth.js'
import { createProject, listProjects } from '../controllers/projects.controller.js'

const r = Router()
r.use(protect)
r.post('/', createProject)
r.get('/', listProjects)
export default r

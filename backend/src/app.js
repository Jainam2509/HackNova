import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import connectDB from './config/db.js'
import authRoutes from './routes/auth.routes.js'
import projectRoutes from './routes/projects.routes.js'
import milestoneRoutes from './routes/milestones.routes.js'
import disbursementRoutes from './routes/disbursements.routes.js'
import oracleRoutes from './routes/oracle.routes.js'
import auditRoutes from './routes/audit.routes.js'
import healthRoutes from './routes/health.routes.js'
import adminRoutes from './routes/admin.routes.js'
import { errorHandler, notFound } from './middleware/errorHandler.js'

await connectDB()

const app = express()
app.use(helmet())
app.use(cors())
app.use(express.json({ limit: '1mb' }))
app.use(morgan('dev'))

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/projects', projectRoutes)
app.use('/api/milestones', milestoneRoutes)
app.use('/api/disbursements', disbursementRoutes)
app.use('/api/oracle', oracleRoutes)
app.use('/api/audit', auditRoutes)
app.use('/api/health', healthRoutes)
app.use('/api/admin', adminRoutes)

app.use(notFound)
app.use(errorHandler)

export default app

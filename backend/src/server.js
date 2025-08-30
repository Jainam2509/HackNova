import dotenv from 'dotenv'
dotenv.config()

import http from 'http'
import app from './app.js'
import { logger } from './utils/logger.js'

const PORT = process.env.PORT || 4000
const server = http.createServer(app)

server.listen(PORT, () => {
  logger.info(`Server listening on http://localhost:${PORT}`)
})

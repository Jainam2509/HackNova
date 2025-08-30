import { Router } from 'express'
import { oracleCallback } from '../controllers/oracle.controller.js'

// webhook does not require auth but is HMAC-signed
const r = Router()
r.post('/callback', oracleCallback)
export default r

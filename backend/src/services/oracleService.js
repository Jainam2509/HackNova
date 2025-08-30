import crypto from 'crypto'
import Milestone from '../models/Milestone.js'
import { audit } from './auditService.js'

const safeTiming = (a, b) => crypto.timingSafeEqual(Buffer.from(a), Buffer.from(b))

export const handleOracleCallback = async (payload, signature) => {
  const secret = process.env.ORACLE_WEBHOOK_SECRET || ''
  const expected = crypto.createHmac('sha256', secret).update(JSON.stringify(payload)).digest('hex')
  if (!signature || signature.length !== expected.length || !safeTiming(signature, expected)) {
    const err = new Error('Bad signature')
    err.status = 401
    throw err
  }

  const { milestoneId, measuredValue, unit, source, observedAt } = payload
  const ms = await Milestone.findById(milestoneId)
  if (!ms) throw new Error('Milestone not found')

  if (measuredValue >= ms.targetValue) {
    ms.achieved = true
    ms.achievedAt = new Date(observedAt || Date.now())
    ms.oracleProof = { measuredValue, unit, source, observedAt }
    await ms.save()
    await audit('oracle', 'milestone.achieved', 'Milestone', String(ms._id), ms.oracleProof)
  }

  return ms
}

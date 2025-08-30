// Mock bank/government disbursement client.
// Replace with a real integration (e.g., PFMS, RTGS/NEFT gateways, etc.).
import SubsidyDisbursement from '../models/SubsidyDisbursement.js'
import { audit } from './auditService.js'
import { v4 as uuidv4 } from 'uuid'

export const triggerPayout = async (project, milestone) => {
  const disb = await SubsidyDisbursement.create({
    project: project._id,
    milestone: milestone._id,
    status: 'queued'
  })

  // Simulate approval + payment
  disb.status = 'approved'
  await disb.save()
  await audit('bank-mock', 'disbursement.approved', 'SubsidyDisbursement', String(disb._id), { amount: milestone.subsidyAmount })

  // Simulated payment
  disb.status = 'paid'
  disb.paymentRef = uuidv4()
  await disb.save()
  await audit('bank-mock', 'disbursement.paid', 'SubsidyDisbursement', String(disb._id), { paymentRef: disb.paymentRef })

  return disb
}

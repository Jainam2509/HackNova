import mongoose from 'mongoose'

const disbursementSchema = new mongoose.Schema({
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  milestone: { type: mongoose.Schema.Types.ObjectId, ref: 'Milestone', required: true },
  status: { type: String, enum: ['queued', 'approved', 'paid', 'failed'], default: 'queued' },
  paymentRef: String,
  failureReason: String
}, { timestamps: true })

export default mongoose.model('SubsidyDisbursement', disbursementSchema)

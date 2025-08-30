import mongoose from 'mongoose'

const milestoneSchema = new mongoose.Schema({
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  name: { type: String, required: true },
  targetValue: { type: Number, required: true }, // e.g., kg of H2 produced
  unit: { type: String, default: 'kg' },
  dueDate: Date,
  achieved: { type: Boolean, default: false },
  achievedAt: Date,
  oracleProof: { type: Object, default: {} }, // store oracle payload
  subsidyAmount: { type: Number, required: true } // fiat in smallest unit (e.g., paise)
}, { timestamps: true })

export default mongoose.model('Milestone', milestoneSchema)

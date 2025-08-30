import mongoose from 'mongoose'

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  contractAddress: { type: String, default: '' },
  baselineCapacityKgPerDay: Number
}, { timestamps: true })

export default mongoose.model('Project', projectSchema)

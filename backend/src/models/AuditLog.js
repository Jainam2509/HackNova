import mongoose from 'mongoose'

const auditLogSchema = new mongoose.Schema({
  actor: { type: String, default: 'system' }, // user id or system
  action: { type: String, required: true },
  entity: { type: String, required: true },
  entityId: { type: String, required: true },
  metadata: { type: Object, default: {} }
}, { timestamps: true })

export default mongoose.model('AuditLog', auditLogSchema)

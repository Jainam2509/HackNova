import AuditLog from '../models/AuditLog.js'

export const listAudit = async (req, res, next) => {
  try {
    const q = req.query.q
    const find = q ? { action: new RegExp(q, 'i') } : {}
    const items = await AuditLog.find(find).sort({ createdAt: -1 }).limit(200)
    res.json(items)
  } catch (e) { next(e) }
}

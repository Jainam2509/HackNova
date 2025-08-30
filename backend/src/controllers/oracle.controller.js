import { handleOracleCallback } from '../services/oracleService.js'

export const oracleCallback = async (req, res, next) => {
  try {
    const signature = req.headers['x-oracle-signature']
    const ms = await handleOracleCallback(req.body, signature)
    res.json({ ok: true, milestone: ms })
  } catch (e) { next(e) }
}

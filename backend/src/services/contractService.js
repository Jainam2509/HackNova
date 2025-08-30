import { getContract } from '../config/web3.js'

// Minimal example using a read method to attest that a milestone is valid
export const verifyMilestoneOnChain = async (projectId, milestoneId) => {
  const contract = getContract()
  try {
    // This assumes the contract has a view function isMilestoneEligible(projectId, milestoneId) returns (bool)
    const ok = await contract.isMilestoneEligible(projectId, milestoneId)
    return Boolean(ok)
  } catch (e) {
    return false
  }
}

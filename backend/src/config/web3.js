import { ethers } from 'ethers'

export const getProvider = () => new ethers.JsonRpcProvider(process.env.ETH_RPC_URL, Number(process.env.CHAIN_ID || 31337))
export const getWallet = () => new ethers.Wallet(ethers.Wallet.createRandom().privateKey, getProvider()) // dev only

export const getContract = async () => {
  const SubsidyManagerABI = await import('../../contracts/SubsidyManagerABI.json', { assert: { type: 'json' } }).then(module => module.default);
  const address = process.env.CONTRACT_ADDRESS
  const provider = getProvider()
  return new ethers.Contract(address, SubsidyManagerABI, provider)
}

import { ethers } from 'ethers';

export async function getTransactionStatus(transactionHash) {
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  try {
    const transactionReceipt = await provider.getTransactionReceipt(transactionHash);
    return transactionReceipt?.status === 1 ? 'Success' : 'Failed';
  } catch (error) {
    console.error('Error fetching transaction status:', error);
    return 'Error';
  }
}

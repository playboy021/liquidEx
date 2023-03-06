import { ethers } from 'ethers';

export const loadContract = async (address, abi, signer) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  try {
    const contract = new ethers.Contract(address, abi, signer || provider);
    return contract;
  } catch (error) {
    console.log(error)
  }
}

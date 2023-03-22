import { useCallback } from 'react';
import axios from 'axios';
import { ethers } from 'ethers';

const useParaswapSwap = () => {
  const swap = useCallback(async (srcToken, destToken, srcAmount, userAddress, provider, signer) => {
    try {
      // Get a price quote
      const priceResponse = await axios.get(
        `https://paraswap.io/api/v5/prices/swap`,
        {
          params: {
            srcToken,
            destToken,
            srcAmount,
            userAddress,
          },
        },
      );

      const { priceRoute, priceWithSlippage } = priceResponse.data;

      // Build the transaction
      const swapResponse = await axios.post(
        `https://paraswap.io/api/v5/transactions/build`,
        {
          srcToken,
          destToken,
          srcAmount,
          destAmount: priceWithSlippage,
          priceRoute,
          userAddress,
          transaction: {
            gasPrice: '0', // Gas price will be fetched automatically by Paraswap
          },
        },
      );

      const { data: tx } = swapResponse;

      // Sign and send the transaction
      const transaction = {
        to: tx.to,
        data: tx.data,
        value: tx.value,
        gasPrice: ethers.BigNumber.from(tx.gasPrice),
        gasLimit: ethers.BigNumber.from(tx.gasLimit),
      };

      const response = await signer.sendTransaction(transaction);

      return response;
    } catch (error) {
      console.error('Error during token swap:', error);
      throw error;
    }
  }, []);

  return { swap };
};

export default useParaswapSwap;

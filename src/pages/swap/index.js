import useParaswapSwap from "@/components/providers/web3/hooks/useParaswapSwap"
import useParaswapTokens from "@/components/providers/web3/hooks/useParaswapTokens"
import { BridgeLayout } from "@/components/ui/layout"
import { ethers } from "ethers"
import { useState } from "react";

export default function Swap() {
    const { tokens, loading, error } = useParaswapTokens();
    const { swap } = useParaswapSwap();
  
    const [srcToken, setSrcToken] = useState('');
    const [destToken, setDestToken] = useState('');
    const [srcAmount, setSrcAmount] = useState('');
    const [userAddress, setUserAddress] = useState('');
    const [transactionHash, setTransactionHash] = useState('');
    const [swapError, setSwapError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setTransactionHash('');
        setSwapError(null);
    
        try {
          // Connect to the user's wallet
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const userAddress = await signer.getAddress();
          setUserAddress(userAddress);
    
          // Perform the swap
          const tx = await swap(srcToken, destToken, srcAmount, userAddress, provider, signer);
          setTransactionHash(tx.hash);
        } catch (error) {
          console.error('Error during token swap:', error);
          setSwapError(error);
        }
      };

    return(
        <>
        {console.log(tokens)}
            <div className="flex justify-center">
                <div className="lightBlueGlassLessBlur mt-36 rounded-lg container fade-in-slide-up">
                <h1>Token Swap</h1>
                    {loading && <p>Loading tokens...</p>}
                    {error && <p>Error loading tokens: {error.message}</p>}
                    {!loading && (
                        <form onSubmit={handleSubmit}>
                        <label>
                            Source Token:
                            <select value={srcToken} onChange={(e) => setSrcToken(e.target.value)}>
                            <option value="">Select token</option>
                            {tokens.map((token) => (
                                <option key={token.address} value={token.address}>
                                {token.symbol}
                                </option>
                            ))}
                            </select>
                        </label>
                        <br />
                        <label>
                            Destination Token:
                            <select value={destToken} onChange={(e) => setDestToken(e.target.value)}>
                            <option value="">Select token</option>
                            {tokens.map((token) => (
                                <option key={token.address} value={token.address}>
                                {token.symbol}
                                </option>
                            ))}
                            </select>
                        </label>
                        <br />
                        <label>
                            Source Amount:
                            <input
                            type="text"
                            value={srcAmount}
                            onChange={(e) => setSrcAmount(e.target.value)}
                            />
                        </label>
                        <br />
                        <button type="submit">Swap</button>
                        </form>
                    )}
                    {transactionHash && <p>Transaction Hash: {transactionHash}</p>}
                    {swapError && <p>Error during token swap: {swapError.message}</p>}
                </div>
            </div>
        </>
    )
}

Swap.Layout = BridgeLayout

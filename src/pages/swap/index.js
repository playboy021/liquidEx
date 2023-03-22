import { useWalletInfo } from "@/components/hooks/web3";
import useParaswapSwap, { getSwapTransaction } from "@/components/providers/web3/hooks/useParaswapSwap"
import useParaswapTokens from "@/components/providers/web3/hooks/useParaswapTokens"
import { BridgeLayout } from "@/components/ui/layout"
import { useState } from "react";

export default function Swap() {
    const [srcToken, setSrcToken] = useState('MATIC');
    const [destToken, setDestToken] = useState('WBTC');
    const [srcAmount, setSrcAmount] = useState('');
    const [transactionData, setTransactionData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const { tokens } = useParaswapTokens();
    const { account, network } = useWalletInfo();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsLoading(true);
      setError(null);
  
      try {
        const transactionParams = await getSwapTransaction({
          srcToken,
          destToken,
          srcAmount,
          networkID: network?.data, // Polygon Network
          userAddress: account?.data,
        });
        setTransactionData(transactionParams);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };


    return (
        <>
        {console.log(tokens)}
            <div className="flex justify-center">
                <div className="lightBlueGlassLessBlur mt-36 rounded-lg container fade-in-slide-up">
                <h1>Token Swap</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                    <label htmlFor="srcToken">Source Token:</label>
                    <input
                        type="text"
                        id="srcToken"
                        value={srcToken}
                        onChange={(e) => setSrcToken(e.target.value)}
                    />
                    </div>
                    <div>
                    <label htmlFor="destToken">Destination Token:</label>
                    <input
                        type="text"
                        id="destToken"
                        value={destToken}
                        onChange={(e) => setDestToken(e.target.value)}
                    />
                    </div>
                    <div>
                    <label htmlFor="srcAmount">Amount:</label>
                    <input
                        type="text"
                        id="srcAmount"
                        value={srcAmount}
                        onChange={(e) => setSrcAmount(e.target.value)}
                    />
                    </div>
                    <button type="submit">Swap</button>
                </form>
                {isLoading && <p>Loading...</p>}
                {transactionData && (
                    <div>
                    <h2>Transaction Data</h2>
                    <pre>{JSON.stringify(transactionData, null, 2)}</pre>
                    </div>
                )}
                {error && <p>Error: {error}</p>}
                </div>
            </div>
        </>
    )
}

Swap.Layout = BridgeLayout

import { useWalletInfo } from "@/components/hooks/web3";
import useParaswapSwap, { getSwapTransaction } from "@/components/providers/web3/hooks/useParaswapSwap"
import useParaswapTokens from "@/components/providers/web3/hooks/useParaswapTokens"
import { BridgeLayout } from "@/components/ui/layout"
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import Head from "next/head";
import { Button } from "@/components/ui/common";
import SwapAssetsPanelFrom from "@/components/ui/swap/swapAssetsPanelFrom";
import SwapAssetsPanelTo from "@/components/ui/swap/swapAssetsPanelTo";

export default function Swap() {
    const [srcToken, setSrcToken] = useState(null);
    const [destToken, setDestToken] = useState(null);
    const [srcAmount, setSrcAmount] = useState('');
    const [srcDecimals, setSrcDecimals] = useState(0);
    const [destDecimals, setDestDecimals] = useState(0);
    const [transactionData, setTransactionData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [txParams, setTxParams] = useState(null);

    const { tokens } = useParaswapTokens();
    const { account, network } = useWalletInfo();
  
    const handleSubmit = async () => {
      setIsLoading(true);
      setError(null);
  
      try {
        const transactionParams = await getSwapTransaction({
          srcToken: tokens[srcToken]?.address,
          destToken: tokens[destToken]?.address,
          srcAmount,
          networkID: network?.data, // Polygon Network
          userAddress: account?.data,
          srcDecimals: tokens[srcToken]?.decimals,
          destDecimals: tokens[destToken]?.decimals,
        })
        if(transactionParams !== null) {
          setTxParams(transactionParams?.priceRoute);
          setTransactionData(transactionParams);
        }
        
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    const handleTx = async () => {
      try{
        if(transactionData != null) {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const tx = signer.sendTransaction({
            to: transactionData.transactionRequest?.to,
            data: transactionData.transactionRequest?.data,
            value: transactionData.transactionRequest?.value,
            from: transactionData.transactionRequest?.from
          });
          tx.then((tx) => {
            console.log(tx);
          });
          setTransactionData(null);
        }
      } catch (err) {
        console.log(err);
      }
    }

    function getToken(address) {
      for (let i = 0; i < tokens.length; i++) {
        if (tokens[i].address === address) {
          const token = tokens[i]
          console.log('token: ', token)
          return token;
        }
      }
    }

    useEffect(() => {
      setSrcDecimals(getToken(srcToken)?.decimals)
      setDestDecimals(getToken(destToken)?.decimals)
    }, [srcToken, destToken])

    useEffect(() => {
      if(srcToken !== null && destToken !== null && srcAmount !== '') {
        handleSubmit()
      }

    }, [srcToken, destToken, account.data, network.data, srcAmount])

    return (
        <>
          {console.log('txParams: ', txParams)}
          <Head><title>Swap</title></Head>
            <div className="flex justify-center">
              <div className="lightBlueGlassLessBlur mt-36 rounded-2xl container fade-in-slide-up" style={{maxWidth: '500px'}}>

                <div className="w-full p-6 pb-0">
                  <div className="rounded-md h-full">

                    <SwapAssetsPanelFrom
                      //spendFromWallet={true}
                      header={(props) => (
                          <>
                              <SwapAssetsPanelFrom.Panel {...props}
                                srcAmount={srcAmount}
                                setSrcAmount={setSrcAmount}
                                srcToken={srcToken}
                                tokens={tokens}
                              />
                              <SwapAssetsPanelFrom.Header
                                srcToken={srcToken}
                                setSrcToken={setSrcToken}
                                tokens={tokens}
                              />
                          </>
                      )}
                    />

                  </div>
                </div>

                <div className='flex justify-center fill-white p-2'>
                  <div className="rotating-div cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-8 h-8 border-indigo-600 border rounded-lg p-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
                    </svg>
                  </div>
                </div>

                <div className="w-full p-6 pt-0 pb-3">
                  <div className="rounded-md h-full">

                    <SwapAssetsPanelTo
                      //spendFromWallet={true}
                      header={(props) => (
                          <>
                              <SwapAssetsPanelTo.Panel {...props}
                                srcAmount={srcAmount}
                                destToken={destToken}
                                tokens={tokens}
                                txParams={txParams}
                              />
                              <SwapAssetsPanelTo.Header
                                destToken={destToken}
                                setDestToken={setDestToken}
                                tokens={tokens}
                              />
                          </>
                      )}
                    />

                  </div>
                </div>
                
                {/* <div>
                  <label htmlFor="srcToken">Source Token:</label>
                    <select value={srcToken} onChange={(e) => setSrcToken(e.target.value)}>
                      <option value="">Select token</option>
                      {tokens.map((token) => (
                          <option key={token.address} value={token.address}>
                          {token.symbol}
                          </option>
                      ))}
                    </select>
                </div>
                <div>
                  <label htmlFor="destToken">Destination Token:</label>
                    <select value={destToken} onChange={(e) => setDestToken(e.target.value)}>
                      <option value="">Select token</option>
                      {tokens.map((token) => (
                          <option key={token.address} value={token.address}>
                          {token.symbol}
                          </option>
                      ))}
                    </select>
                </div> */}
                {/* <button type="submit"
                  ///onClick={handleTx}
                >Get TX Data</button> */}
                    
                {isLoading && <p>Loading...</p>}
                {transactionData && (
                    <div>
                    <h2>Transaction Data</h2>
                    <pre>{JSON.stringify(transactionData, null, 2)}</pre>
                    </div>
                )}
                {error && <p>Error: {error}</p>}
                <div className="flex justify-center p-6 pt-3 pb-3">
                  <Button
                    onClick={handleTx}
                    className='border-indigo-600 text-lg fontTurrentRoad font-bold'
                    style={{width: '450px'}}
                  >Swap Tokens</Button>
                </div>

              </div>
            </div>
        </>
    )
}

Swap.Layout = BridgeLayout

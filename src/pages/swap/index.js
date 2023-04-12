import { useWalletInfo } from "@/components/hooks/web3";
import useParaswapSwap, { getSwapTransaction } from "@/components/providers/web3/hooks/useParaswapSwap"
import useParaswapTokens from "@/components/providers/web3/hooks/useParaswapTokens"
import { BridgeLayout } from "@/components/ui/layout"
import { useEffect, useState, useRef } from "react";
import { ethers } from "ethers";
import Head from "next/head";
import { Button } from "@/components/ui/common";
import SwapAssetsPanelFrom from "@/components/ui/swap/swapAssetsPanelFrom";
import SwapAssetsPanelTo from "@/components/ui/swap/swapAssetsPanelTo";
import { ChevronDownIcon } from "@heroicons/react/solid";
import ConfirmSwapModal from "@/components/ui/swap/confirmSwapModal";
import { getTransactionStatus } from "@/utils/getTransactionStatus";
import Loader, { LoaderSmall, LoaderXS } from "@/components/ui/common/loader";

export default function Swap() {

    const [isLoading, setIsLoading] = useState(false);
    const [srcAmount, setSrcAmount] = useState('');
    const [srcDecimals, setSrcDecimals] = useState(0);
    const [destDecimals, setDestDecimals] = useState(0);
    const [transactionData, setTransactionData] = useState(null);
    const [srcToken, setSrcToken] = useState(null);
    const [destToken, setDestToken] = useState(null);
    const [error, setError] = useState(null);
    const [txHash, setTxHash] = useState(null);
    const [txParams, setTxParams] = useState(null);
    const [approvalAddress, setApprovalAddress] = useState(null);
    const [displayMoreInfo, setDisplayMoreInfo] = useState(true);
    const [open, setOpen] = useState(false)
    


    function openModal() {
        setOpen(true)
    }


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
        } else {
          setTxParams(null);
          setTransactionData(null);
        }
        
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    async function approvalHandler(e) {
      //setApprovalInProgress(true)
      e.preventDefault()
      const ERC20ABI = require('./../../components/ui/bridge//bridgeAssetsPanel/abi/Token.json');
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const fromAddress = await provider.getSigner()

      const amountToTransfer = ethers.utils.parseUnits(srcAmount, tokens[srcToken]?.decimals)
      const Token = new ethers.Contract(tokens[srcToken]?.address, ERC20ABI, fromAddress)
      let transaction
      try {
          transaction = await Token.connect(fromAddress).approve(approvalAddress, amountToTransfer)
          await transaction.wait()
      } catch (error) {
          console.log(error)
          //setApprovalInProgress(false)
      }
      //setSelectedTokenAllowance(amount)
      //setApprovalInProgress(false)
      setApprovalAddress(null)
  }

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
            setTxHash(tx.hash);
            console.log(tx);
          });
          // setSrcAmount(''); fix this
        }
      } catch (err) {
        console.log(err);
      }
    }

    function getToken(address) {
      for (let i = 0; i < tokens.length; i++) {
        if (tokens[i].address === address) {
          const token = tokens[i]
          return token;
        }
      }
    }

    function extractTokenAddress(errorMessage) {
      const regex = /\(0x[a-fA-F0-9]{40}\)/; // Regular expression to match a token address in the error message
      const match = errorMessage.match(regex);
    
      if (match) {
        const tokenAddress = match[0].slice(1, -1); // Remove the parentheses from the matched string
        return tokenAddress;
      }
    
      return null; // If no token address is found, return null
    }

    useEffect(() => {
      setSrcDecimals(getToken(srcToken)?.decimals)
      setDestDecimals(getToken(destToken)?.decimals)
    }, [srcToken, destToken])

    useEffect(() => {
      if (srcToken !== null && destToken !== null && srcAmount !== '') {
        // Function to handle the interval
        const handleInterval = () => {
          handleSubmit();
        };
    
        // Call the function initially
        handleInterval();
    
        // Set up the interval to call the function every 10 seconds (10000 ms)
        const intervalId = setInterval(handleInterval, 10000);
    
        // Clean up the interval when the component is unmounted
        return () => {
          clearInterval(intervalId);
        };
      }
    }, [srcToken, destToken, account.data, network.data, srcAmount]);

    // useEffect(() => {
    //   if(srcToken !== null && destToken !== null && srcAmount !== '') {
    //     handleSubmit()
    //   }
    // }, [srcToken, destToken, account.data, network.data, srcAmount])

    useEffect(() => {
      
      if(error !== null) {
        const tokenAddress = extractTokenAddress(error);
        setApprovalAddress(tokenAddress);
      } else {
        setApprovalAddress(null);
      }
    }, [error, txParams])

    useEffect(() => {
      if(error !== null) {
        setTxParams(null);
      } 
    }, [error])

    useEffect(() => {
      if (txHash === null) {
        return;
      }

      async function fetchTransactionStatus() {
        const intervalId = setInterval(async () => {
          const status = await getTransactionStatus(txHash);
          console.log(`Transaction status: ${status}`);

          if (status === 'Success' || status === 'Failed') {
            setTxHash(null);
            setTransactionData(null);
            clearInterval(intervalId); // Clear the interval when the desired conditions are met
          }
        }, 18000);
      }

      fetchTransactionStatus()
    }, [txHash])

    return (
        <>
          {console.log('txParams: ', txParams)}
          {console.log('txHash: ', txHash)}
          {console.log('error: ', error)}
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
                                txParams={txParams}
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
                    
                {/* {isLoading && <p>Loading...</p>}
                {transactionData && (
                    <div>
                    <h2>Transaction Data</h2>
                    <pre>{JSON.stringify(transactionData, null, 2)}</pre>
                    </div>
                )}
                {error && <p>Error: {error}</p>} */}
                <div className="flex justify-center p-6 pt-3 pb-6">
                  {approvalAddress !== null ?
                    <Button
                      onClick={approvalHandler}
                      className='border-indigo-600 text-lg fontTurrentRoad font-bold'
                      style={{width: '450px'}}
                    >Approve_Tokens</Button> : srcToken === null || destToken === null || (srcAmount === '' && txParams === null) ?
                    <Button
                      className='border-indigo-600 text-lg fontTurrentRoad font-bold'
                      style={{width: '450px'}}
                      disabled={true}
                    >Set Swap Amount</Button> : txParams === null ?
                    <Button
                      className='border-indigo-600 text-lg fontTurrentRoad font-bold'
                      style={{width: '450px'}}
                      disabled={true}
                    >Loading Tx...</Button> :
                    <Button
                      onClick={openModal}
                      className='border-indigo-600 text-lg fontTurrentRoad font-bold'
                      style={{width: '450px'}}
                      disabled={srcToken === null || destToken === null || srcAmount === '' || txParams === null}
                    >Confirm_Swap</Button>
                  }
                  
                </div>

              </div>
              
            </div>
            <div className="flex justify-center mt-4">
              {srcToken && destToken && srcAmount !== '' && txParams !== null && displayMoreInfo == true ?
                <div className="rounded-2xl container cursor-pointer" style={{maxWidth: '500px'}} onClick={() => {setDisplayMoreInfo(!displayMoreInfo)}}>
                <div className="w-full p-6 pt-0 pb-2">
                  <div className="bg-white bg-opacity-40 rounded-lg h-full items-center border-1 border-indigo-600">
                    <div>
                        <div className='flex justify-between'>
                            <h4 className="text-indigo-600 font-bold">More info: </h4>
                            <ChevronDownIcon width={18} style = {{transform: 'rotate(180deg)' }}
                            />
                        </div>
                    </div>
                    <hr className="h-px my-2 bg-indigo-600 border-0 dark:bg-indigo-700"/>
                  </div>
                  <div className="pl-2 pr-2 text-sm fade-in-slide-up">
                    <div className="flex justify-between">
                      <div>From: </div>
                      <div><span className='font-bold'>${txParams && parseFloat(txParams.srcUSD).toFixed(2)}</span> {srcToken && tokens[srcToken]?.symbol}</div>
                    </div>
                    <div className="flex justify-between">
                      <div>To: </div>
                      <div><span className='font-bold'>${txParams && parseFloat(txParams.destUSD).toFixed(2)}</span> {srcToken && tokens[destToken]?.symbol}</div>
                    </div>
                    <div className="flex justify-between">
                      <div>TxCost: </div>
                      <div><span className='font-bold'>${txParams && parseFloat(txParams.gasCostUSD).toFixed(6)}</span></div>
                    </div>
                    <div className="flex justify-between">
                      <div>Slippage: </div>
                        <div><span className='font-bold'>{transactionData?.slippage && transactionData?.slippage} %</span></div>
                      
                    </div>
                    <div className="flex justify-between">
                      <div>Route: </div>
                        <div className="flex">{srcToken && tokens[srcToken]?.symbol} 
                          <div className="specialPadding">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="4.5" stroke="currentColor" className="w-3 h-3">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>
                          </div>
                          {destToken && tokens[destToken]?.symbol}
                        </div>
                    </div>
                  </div>
                </div>
              </div> : srcToken && destToken && srcAmount !== '' && txParams !== null && displayMoreInfo == false ? 
              <div className="rounded-2xl container cursor-pointer" style={{maxWidth: '500px'}} onClick={() => {setDisplayMoreInfo(!displayMoreInfo)}}>
              <div className="w-full p-6 pt-0 pb-2">
                <div className="bg-white bg-opacity-40 rounded-lg h-full items-center border-1 border-indigo-600">
                  <div>
                      <div className='flex justify-between'>
                          <h4 className="text-indigo-600 font-bold">More info: </h4>
                          <div className="flex fade-in-slide-up text-sm specialPadding">
                            <div className="mr-2">
                              <span className='font-bold'>{txParams && srcAmount}</span> {srcToken && tokens[srcToken]?.symbol}
                            </div>
                            <div className="specialPadding mr-2">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="4.5" stroke="currentColor" className="w-3 h-3">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                              </svg>
                            </div>
                            <div className="mr-2">
                              <span className='font-bold'>{txParams && parseFloat(ethers.utils.formatUnits(txParams?.destAmount, tokens[destToken]?.decimals)).toFixed(4)}</span> {srcToken && tokens[destToken]?.symbol}
                            </div>
                            <div className="mr-2"><span className="font-bold">${txParams && parseFloat(txParams.gasCostUSD).toFixed(6)}</span> TxCost</div>
                            {/* <div className="mr-2">${txParams && parseFloat(txParams.destUSD).toFixed(2)}</div> */}
                          </div>
                          <ChevronDownIcon width={18} //style = {{transform: 'rotate(180deg)' }}
                          />
                      </div>
                  </div>
                  <hr className="h-px my-2 bg-indigo-600 border-0 dark:bg-indigo-700"/>
                </div>
              </div>
            </div> : null
            }
            
              <ConfirmSwapModal 
                open={open}
                txParams={txParams}
                srcAmount={srcAmount}
                srcToken={srcToken}
                destToken={destToken}
                tokens={tokens}
                handleTx={handleTx}
                transactionData={transactionData}
                setTransactionData={setTransactionData}
                txHash={txHash}
                setTxHash={setTxHash}
                setSrcAmount={setSrcAmount}
                setOpen={setOpen}
              />
            </div>
            
        </>
    )
}

Swap.Layout = BridgeLayout

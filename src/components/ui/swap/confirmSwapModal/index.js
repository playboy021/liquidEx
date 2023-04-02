import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/solid';
import { useWalletInfo } from '@/components/hooks/web3';
import useParaswapTokens from '@/components/providers/web3/hooks/useParaswapTokens';
import { ethers } from 'ethers';
import { Button } from '../../common';


export default function ConfirmSwapModal({open, closeModal, txParams, srcAmount, srcToken, destToken, tokens, handleTx, transactionData}) {

    const [displayMoreInfo, setDisplayMoreInfo] = useState(true)

    return (
        <>
            <Transition appear show={open} as={Fragment}>
                <Dialog as="div" className="fixed inset-0 z-30" onClose={() => { closeModal()}}>
                    <div className="fixed inset-0 bg-black/30 blur" aria-hidden="true" />

                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="bg-opacity-25 bg-gray-500" />
                    </Transition.Child>

                    <div className="fixed inset-0">

                        <div className="flex items-center justify-center min-h-full p-1 text-center">


                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >

                                <Dialog.Panel className="w-full max-w-md  p-5 mb-8 ml-1 mr-1 overflow-hidden text-left align-middle transition-all transform rounded-2xl lightBlueGlassMoreBlur bridgeTokenSearchGlow" 
                                    style={{
                                    //     minWidth: '380px',
                                    //     height: "505px",
                                    minWidth: "550px",
                                    //     top: '100px'

                                    //     // height: "55vh",
                                    //     // width: "38vh"
                                    }} 
                                >


                                    <Dialog.Title
                                        as="h1"
                                        className="mt-1 mb-4 text-xl font-bold text-white flex justify-between"
                                    >
                                    </Dialog.Title>
                                    {srcToken && destToken && srcAmount !== '' && txParams !== null && displayMoreInfo == true ?
                                    <div className="rounded-2xl container cursor-pointer" 
                                        style={{maxWidth: '550px'}} 
                                        onClick={() => {setDisplayMoreInfo(!displayMoreInfo)}}
                                    >
                                        <div className="w-full p-6 pt-0 pb-2">
                                            <div className="rounded-lg h-full items-center border-1 border-indigo-600 m-2">
                                                <div>
                                                    <div className='flex justify-between'>
                                                        <h4 className="text-indigo-600 font-bold">More info: </h4>
                                                        <div className="flex fade-in-slide-up text-sm specialPadding text-gray-50">
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
                                            <Button
                                                onClick={() => {handleTx(); closeModal()}}
                                                className='border-indigo-600 text-lg fontTurrentRoad font-bold'
                                                style={{width: '460px'}}
                                            >Confirm_Swap</Button>
                                        </div>
                                    </div> : srcToken && destToken && srcAmount !== '' && txParams !== null && displayMoreInfo == false ?
                                    <div className="rounded-2xl container cursor-pointer" style={{maxWidth: '500px'}} onClick={() => {setDisplayMoreInfo(!displayMoreInfo)}}>
                                    <div className="w-full p-6 pt-0 pb-2">
                                      <div className="rounded-lg h-full items-center border-1 border-indigo-600">
                                        <div>
                                            <div className='flex justify-between'>
                                                <h4 className="text-indigo-600 font-bold">More info: </h4>
                                                <ChevronDownIcon width={18} style = {{transform: 'rotate(180deg)' }}
                                                />
                                            </div>
                                        </div>
                                        <hr className="h-px my-2 bg-indigo-600 border-0 dark:bg-indigo-700"/>
                                      </div>
                                      <div className="pl-2 pr-2 text-sm fade-in-slide-up text-gray-50">
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
                                      <Button
                                        onClick={() => {handleTx(); closeModal()}}
                                        className='border-indigo-600 text-lg fontTurrentRoad font-bold mt-2'
                                        style={{width: '460px'}}
                                    >Confirm_Swap</Button>
                                    </div>
                                    
                                  </div>
                                   : null }
                                </Dialog.Panel>

                            </Transition.Child>


                        </div>
                    </div>
                </Dialog>
            </Transition >
        </>
    )
}

import { ChevronDownIcon } from '@heroicons/react/solid'
import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { ButtonSmall } from '../../common/button'
import { useWalletInfo } from '@/components/hooks/web3'
import { ethers } from 'ethers'
import SwapAssetsModalTo from '../swapAssetsModalTo'

const SwapAssetsPanelTo = (
    {
    header,
    disabled,
}
) => {
    // console.log('###################', currency);
    return (
        <div className="rounded-lg bg-white bg-opacity-60 p-3 pt-0 pb-0 flex flex-col">
            {/* original className="rounded-[14px] bg-[#1D2231] p-3 flex flex-col gap-4 swap_prnt" */}
            {header(
                {
                disabled,
            }
            )}
            <div className="flex gap-1 justify-between px-1.5 float-right flex-row-reverse items-start">

            </div>
        </div>
    )
}

export const InputPanel = ({}) => {

    const [selectedTokenBalance, setSelectedTokenBalance] = useState('')

    const { account, network } = useWalletInfo()

    // useEffect(() => {
    //     async function getBalance() {
    //         const ERC20ABI = require('../../bridge/bridgeAssetsPanel/abi/Token.json')
    //         const provider = new ethers.providers.Web3Provider(window.ethereum)
    //         const fromAddress = await provider.getSigner()
    //         if (account != null && (network.data)?.toString() != destinationChain) {
    //             try {
    //                 const signerAddress = await fromAddress?.getAddress()
    //                 if (selectedToken != '' && tokens[selectedToken]?.isNative !=
    //                     "NATIVE") {
    //                     try {
    //                         let Token = new ethers.Contract(tokens[selectedToken]?.srcAddress, ERC20ABI, fromAddress)
    //                         const result = await Token.connect(fromAddress).balanceOf(signerAddress)
    //                         const balance = ethers.utils.formatUnits(result, tokens[selectedToken]?.originalDecimals)

    //                         setSelectedTokenBalance(balance)
    //                     } catch (error) {
    //                         console.log(error)
    //                     }

    //                 } else if (tokens[selectedToken]?.isNative ==
    //                     "NATIVE") {
    //                     const getBalance = async (address) => {
    //                         const provider = new ethers.providers.Web3Provider(window.ethereum);
    //                         const balance = await provider.getBalance(address);
    //                         const balanceInEth = ethers.utils.formatEther(balance);
    //                         setSelectedTokenBalance(balanceInEth)
    //                     }
    //                     getBalance(signerAddress)
    //                 }
    //             } catch (error) {
    //                 console.log(error)
    //             }
    //         }
    //     }

    //     getBalance()

    // }, [selectedToken, tokens, network.data, account.data, amount])

    return (
        <>
            <div className='text-2xl leading-7 tracking-[-0.01em] relative flex items-baseline flex-grow gap-3 font-bold'>
                <>
                    <input
                        //value={amount}
                        // universal input options
                        inputMode="decimal"
                        title="Token Amount"
                        autoComplete="off"
                        autoCorrect="off"
                        // text-specific options
                        type="number"
                        pattern="^[0-9]*[.,]?[0-9]*$"
                        placeholder='0.00'
                        min={0}
                        minLength={1}
                        maxLength={79}
                        spellCheck="false"
                        disabled={true}
                        //onChange={e => setAmount(e.target.value)}
                        className=
                        'relative font-bold outline-none border-none flex-auto overflow-hidden overflow-ellipsis placeholder-low-emphesis focus:placeholder-primary bridgeInputTransparent text-indigo-600 text-3xl bg-opacity-50 pt-2 placeholder-gray-400 px-1'
                        style={{ top: '4px'}}
                    />
                </>
                <div className='text-sm leading-5 absolute mt-8 text-secondary top-margin hover:shadow-md rounded-lg px-1' style={{ top: '20px' }}>
                        <div className='pt-2 cursor-pointer' //onClick={() => {setAmount(selectedTokenBalance)}}
                        >
                            <span className='text-gray-400 fontTurrentRoad font-bold'>Balance:&nbsp;</span><span className='text-indigo-600'>0.00</span>
                        </div>
                </div>
            </div>
            
        </>
    )
}

export const SwapAssetsPanelToHeader = ({tokens, destToken, setDestToken}) => {

    const [open, setOpen] = useState(false)

    const { account, network } = useWalletInfo()
    
    function closeModal() {
        setOpen(false)
    }

    function openModal() {
        setOpen(true)
    }

    useEffect(() => {
        function getDestToken() {
            for (let i = 0; i < Object.keys(tokens).length; i++) {
                const key = Object.keys(tokens)[i]
                if(tokens[key]?.symbol == 'fUSDT' || tokens[key]?.symbol == 'USDT'){
                    setDestToken(key)
                }
            }
        }
        
        getDestToken()
    }, [tokens, network.data])

    return (
        <>
            {console.log('destTokenObject', tokens[destToken])}
            <div className="flex flex-row-reverse items-end justify-between float-right gap-2">
                {account?.data == undefined ?
                    <ButtonSmall
                        className="flex items-center gap-2 shadow-md cursor-pointer text-high-emphesis hover:bg-dark-700 p-0 m-0 relative border-indigo-600"
                        style={{ zIndex: '1' , bottom: '22px', left: '-4px'}}
                        //onClick={openModal}
                        type='button'
                        disabled={true}
                    >
                        <img src='https://assets.coingecko.com/coins/images/11939/large/SHIBLOGO.png' width='24px' height='24px' alt='' />
                        <span>SHIB</span>
                        <ChevronDownIcon width={18} />
                    </ButtonSmall> 
                    : 
                    destToken === null ?
                        <ButtonSmall
                            className="flex items-center gap-2 shadow-md cursor-pointer text-high-emphesis hover:bg-dark-700 p-0 m-0 relative border-indigo-600 bg-opacity-0 hover:shadow-lg"
                            // original className="bannerSwapCurrency flex items-center gap-2 px-2 py-1 shadow-md cursor-pointer text-high-emphesis bg-[#292D3C] hover:bg-dark-700 pb-1"
                            style={{ zIndex: '1' , bottom: '22px', left: '-4px'}}
                            onClick={openModal}
                            variant='light'
                            type='button'
                        >
                            <div className='flex items-center text-gray-400'>
                                Select Token
                            </div>
                            <ChevronDownIcon width={18} />
                        </ButtonSmall> :
                        <ButtonSmall
                            className="flex items-center gap-2 shadow-md cursor-pointer text-high-emphesis hover:bg-dark-700 p-0 m-0 relative border-indigo-600 hover:shadow-lg"
                            // original className="bannerSwapCurrency flex items-center gap-2 px-2 py-1 shadow-md cursor-pointer text-high-emphesis bg-[#292D3C] hover:bg-dark-700 pb-1"
                            style={{ zIndex: '1' , bottom: '22px', left: '-4px'}}
                            onClick={openModal}
                            type='button'
                        >
                            <img src={tokens[destToken]?.img || tokens[destToken]?.logoURI} width='24px' height='24px' alt='' />
                            <span>{tokens[destToken]?.symbol}</span>
                            <ChevronDownIcon width={18} />
                        </ButtonSmall>
                } 
            </div>
            <SwapAssetsModalTo
                closeModal={closeModal}
                open={open}
                setOpen={setOpen}
                setDestToken={setDestToken}
            />
        </>
    )
}

SwapAssetsPanelTo.Header = SwapAssetsPanelToHeader
SwapAssetsPanelTo.Panel = InputPanel

export default SwapAssetsPanelTo

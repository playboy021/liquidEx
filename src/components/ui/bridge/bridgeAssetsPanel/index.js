import { ChevronDownIcon } from '@heroicons/react/solid'
import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { ButtonSmall } from '../../common/button'
import { useWalletInfo } from '@/components/hooks/web3'
import BridgeAssetsModal from '../bridgeAssetsModal'

const BridgeAssetPanel = (
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

export const InputPanel = ({amount, setAmount}) => {




    return (
        <>
            <div className='text-2xl leading-7 tracking-[-0.01em] relative flex items-baseline flex-grow gap-3 font-bold'>
                <>
                    <input
                        value={amount}
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
                        onChange={e => setAmount(e.target.value)}
                        className=
                        'relative font-bold outline-none border-none flex-auto overflow-hidden overflow-ellipsis placeholder-low-emphesis focus:placeholder-primary bridgeInputTransparent text-indigo-600 text-3xl bg-opacity-50 pt-2 placeholder-gray-400'
                        style={{ top: '4px'}}
                    />
                </>
                <div className='text-sm leading-5 absolute mt-8 text-secondary top-margin' style={{ top: '20px' }}>
                        <div className='pt-2'>
                            <span className='text-gray-400 fontTurrentRoad font-bold'>Balance:&nbsp;</span><span className='text-indigo-600'>0.00</span>
                        </div>
                </div>
            </div>
        </>
    )
}

export const BridgeAssetPanelHeader = ({  selectedToken, setSelectedToken, destinationChain, setTokens, tokens, amount }) => {

    let [open, setOpen] = useState(false)

    const { network, account } = useWalletInfo()

    function closeModal() {
        setOpen(false)
    }

    function openModal() {
        setOpen(true)
    }

    const bridgeURL = `https://bridgeapi.anyswap.exchange/v4/tokenlistv4/${network.data}`

    async function getBridgeParams() {
        try {
            const { data, status } = await axios.get(bridgeURL, {
                headers: {
                    Accept: 'application/json',
                }
            })
            return data
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return error.message
            } else {
                return 'An unexpected error occurred'
            }
        }
    }

    async function formatBridgeData() {
        const res = await getBridgeParams()
        const data = {}
        const tokens = Object.keys(res);
        for (let i = 0; i < tokens.length; i++) {
            const currentTokenData = res[tokens[i]]
            const currentDestinationChainTokens = Object?.keys(currentTokenData.destChains)
            if (currentDestinationChainTokens.includes(destinationChain)){
                const logoUrl = res[tokens[i]].logoUrl
                const isNative = res[tokens[i]].tokenType
                const srcAddress = res[tokens[i]].address
                const originalSymbol = res[tokens[i]].symbol
                const originalDecimals = res[tokens[i]].decimals
                const newTokenData = currentTokenData.destChains[destinationChain][Object.keys(currentTokenData.destChains[destinationChain])[0]]
                newTokenData.srcAddress = srcAddress
                newTokenData.logoUrl = logoUrl;
                newTokenData.isNative = isNative
                newTokenData.originalDecimals = originalDecimals
                newTokenData.originalSymbol = originalSymbol
                data[tokens[i]] = newTokenData;

                if (data[tokens[i]]?.symbol == 'USDC') {
                    setSelectedToken(tokens[i])
                }
                    
                setTokens(data)
            }
        }
    }

    useEffect(() => {
        getBridgeParams()
        formatBridgeData()
    },[network.data, destinationChain])

    useEffect(() => {
        setSelectedToken('')
    }, [destinationChain, network.data])


    // useEffect(() => {
    //     setAnyToken(tokens[selectedToken]?.fromanytoken.address)
    //     setUnderlyingToken(tokens[selectedToken]?.underlying.address)
    //     setRouterContract(tokens[selectedToken]?.router)
    // }, [selectedToken, tokens])

    // useEffect(() => {
    //     if (tokens[selectedToken]?.symbol == undefined) {
    //         setSelectedToken(pops)
    //     }
    // }, [bridgedTo, chainId, tokens[selectedToken]])

    // useEffect(() => {
    //     getBridge()
    //     getData()

    // }, [bridgedTo, chainId, amount, pops])


    return (
        <>
            <div className="flex flex-row-reverse items-end justify-between float-right gap-2">
                {account?.data == undefined || (network.data)?.toString() == destinationChain ?
                    <ButtonSmall
                        className="flex items-center gap-2 shadow-md cursor-pointer text-high-emphesis hover:bg-dark-700 p-0 m-0 relative border-indigo-600"
                        // original className="bannerSwapCurrency flex items-center gap-2 px-2 py-1 shadow-md cursor-pointer text-high-emphesis bg-[#292D3C] hover:bg-dark-700 pb-1"
                        style={{ zIndex: '1' , bottom: '22px'}}
                        onClick={openModal}
                        type='button'
                        disabled={true}
                    >
                        <img src='https://assets.coingecko.com/coins/images/11939/large/SHIBLOGO.png' width='24px' height='24px' alt='' />
                        <span>SHIB</span>
                        <ChevronDownIcon width={18} />
                    </ButtonSmall> : 
                    selectedToken == '' || tokens[selectedToken] == undefined ?
                        <ButtonSmall
                            className="flex items-center gap-2 shadow-md cursor-pointer text-high-emphesis hover:bg-dark-700 p-0 m-0 relative border-indigo-600 bg-opacity-0 hover:shadow-lg"
                            // original className="bannerSwapCurrency flex items-center gap-2 px-2 py-1 shadow-md cursor-pointer text-high-emphesis bg-[#292D3C] hover:bg-dark-700 pb-1"
                            style={{ zIndex: '1' , bottom: '22px'}}
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
                            style={{ zIndex: '1' , bottom: '22px'}}
                            onClick={openModal}
                            type='button'
                        >
                            <img src={tokens[selectedToken]?.logoUrl} width='24px' height='24px' alt='' />
                            <span>{tokens[selectedToken]?.originalSymbol}</span>
                            <ChevronDownIcon width={18} />
                        </ButtonSmall>
                } 
            </div>
            <BridgeAssetsModal
                closeModal={closeModal}
                open={open}
                tokens={tokens}
                setOpen={setOpen}
                setSelectedToken={setSelectedToken}
            />
        </>
    )
}

BridgeAssetPanel.Header = BridgeAssetPanelHeader
BridgeAssetPanel.Panel = InputPanel

export default BridgeAssetPanel

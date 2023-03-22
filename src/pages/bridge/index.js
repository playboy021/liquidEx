import BridgeAssetPanel from "@/components/ui/bridge/bridgeAssetsPanel"
import BridgeFromSelect from "@/components/ui/bridge/bridgeFrom"
import BridgeToSelect from "@/components/ui/bridge/bridgeTo"
import { Button } from "@/components/ui/common"
import { BridgeLayout } from "@/components/ui/layout"
import Image from "next/image"
import { useEffect, useState } from "react"
import { ChevronDownIcon } from "@heroicons/react/solid"
import { useWalletInfo } from "@/components/hooks/web3"
import Loader, { LoaderSmall, LoaderXS } from "@/components/ui/common/loader"
import BridgeConfirmationModal from "@/components/ui/bridge/bridgeConfirmationModal"
import { ethers } from "ethers"

export default function Bridge() {
    const { network, account } = useWalletInfo()

    const [destinationChain, setDestinationChain] = useState('137')
    const [tokens, setTokens] = useState([])
    const [selectedToken, setSelectedToken] = useState('')
    const [selectedTokenAllowance, setSelectedTokenAllowance] = useState('')
    const [amount, setAmount] = useState('')
    const [anyToken, setAnyToken] = useState('')
    const [underlyingToken, setUnderlyingToken] = useState('')
    const [routerContract, setRouterContract] = useState('')
    const [openInfoTab, setOpenInfoTab] = useState(false)
    const [openConformationModal, setOpenConformationModal] = useState(false)
    const [approvalInProgress, setApprovalInProgress] = useState(false)
    const [approvalDone, setApprovalDone] = useState(false)

    async function approvalHandler(e) {
        setApprovalInProgress(true)
        e.preventDefault()
        const ERC20ABI = require('./../../components/ui/bridge//bridgeAssetsPanel/abi/Token.json');
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const fromAddress = await provider.getSigner()

        const amountToTransfer = ethers.utils.parseUnits(amount, tokens[selectedToken]?.decimals)
        const Token = new ethers.Contract(tokens[selectedToken]?.srcAddress, ERC20ABI, fromAddress)
        let transaction
        try {
            transaction = await Token.connect(fromAddress).approve(routerContract, amountToTransfer)
            await transaction.wait()
        } catch (error) {
            console.log(error)
            setApprovalInProgress(false)
        }
        setSelectedTokenAllowance(amount)
        setApprovalInProgress(false)
    }
    
    useEffect(() => {
        setAnyToken(tokens[selectedToken]?.fromanytoken.address)
        setUnderlyingToken(tokens[selectedToken]?.underlying.address)
        setRouterContract(tokens[selectedToken]?.router)
    }, [selectedToken, tokens])

    useEffect(() => {
        setAmount('')
    }, [selectedToken, destinationChain, network.data])

    useEffect(() => {
        async function checkAllowance() {
            try {
                if (selectedToken != '' && account.data != undefined && routerContract != '' && tokens != []) {
                    const ERC20ABI = require('./../../components/ui/bridge//bridgeAssetsPanel/abi/Token.json');
                    const provider = new ethers.providers.Web3Provider(window.ethereum)
                    const fromAddress = await provider.getSigner()
                    const Token = new ethers.Contract(tokens[selectedToken]?.srcAddress, ERC20ABI, fromAddress)

                    const res = await Token.connect(fromAddress).allowance(account.data, routerContract) 
                    const formattedRes = ethers.utils.formatUnits(res, tokens[selectedToken]?.decimals)
                    setSelectedTokenAllowance(formattedRes)                    
                }
            } catch (error) {
                console.log(error)
            }
        }

        checkAllowance()

    }, [selectedToken, account.data, routerContract, tokens, destinationChain, network.data])

    return(
        <>
            <div className="flex justify-center">
                <div className="lightBlueGlassLessBlur mt-36 rounded-lg container fade-in-slide-up">
                    <div className="w-full p-6 pb-2">
                        <div className="rounded-md h-full">
                        <BridgeAssetPanel
                            //spendFromWallet={true}
                            header={(props) => (
                                <>
                                    <BridgeAssetPanel.Panel {...props}
                                    amount={amount}
                                    setAmount={setAmount}
                                    selectedToken={selectedToken}
                                    tokens={tokens}
                                    destinationChain={destinationChain}
                                    />
                                    <BridgeAssetPanel.Header
                                        destinationChain={destinationChain}
                                        setTokens={setTokens}
                                        tokens={tokens}
                                        selectedToken={selectedToken}
                                        setSelectedToken={setSelectedToken}
                                        amount={amount}
                                    />
                                </>
                            )}
                        />
                        </div>
                    </div>
                    <div className="w-full p-6 pt-0 pb-2">
                        <div className="bg-white bg-opacity-60 p-6 rounded-lg h-full flex justify-between items-center">
                            <div className="cursor-pointer">
                                <BridgeFromSelect />
                            </div>
                            <div className="flex border shadow-md border-gray-500 p-1 max-h-7 hover:border-indigo-600 cursor-pointer">
                                <Image
                                    src="/img/swapIcon.svg"
                                    alt="swapicon"
                                    width="16"
                                    height="16"
                                />
                            </div>
                            <div className="cursor-pointer">
                                <BridgeToSelect 
                                    destinationChain={destinationChain}
                                    setDestinationChain={setDestinationChain}
                                />
                            </div>
                        </div>
                    </div>
                    
                    { amount == '' ?
                     <></> : selectedToken == '' || (network.data).toString() == destinationChain ?
                     <div className="w-full p-6 pt-0 pb-2">
                        <div className="hover:shadow-md bg-white bg-opacity-60 p-4 pb-2 rounded-lg h-full flex items-center cursor-pointer justify-center" onClick={() => {setOpenInfoTab(!openInfoTab)}}>
                                <div>
                                    <LoaderSmall/>
                                </div>
                        </div> 
                    </div> : openInfoTab == true ?
                    <div className="w-full p-6 pt-0 pb-2">
                        <div className="hover:shadow-md bg-white bg-opacity-60 p-3 rounded-lg cursor-pointer" onClick={() => {setOpenInfoTab(!openInfoTab)}}>
                            <div>
                                <div className='flex justify-between'>
                                    <h4 className="text-indigo-600 font-bold">Important: </h4>
                                    <ChevronDownIcon width={18} style = {{transform: 'rotate(180deg)' }}/>
                                </div>
                            </div>
                            
                            {/* <hr className='borderBrdgRate' /> */}
                            <div className='mt-1 ml-5' style={{ fontSize: '14px' }}>
                                <span>&#x2022; Minimum Crosschain Amount is <b className="text-indigo-600">{tokens[selectedToken]?.MinimumSwap <= '1' ?
                                    Number(parseFloat(tokens[selectedToken]?.MinimumSwap).toFixed(4)).toLocaleString("fi-FI") : Number(parseFloat(tokens[selectedToken]?.MinimumSwap).toFixed(2)).toLocaleString("fi-FI")} {tokens[selectedToken]?.originalSymbol}</b></span><br />
                                <span>&#x2022; Maximum Crosschain Amount is <b className="text-indigo-600">{Number(Math.round(tokens[selectedToken]?.MaximumSwap)).toLocaleString("fi-FI")} {tokens[selectedToken]?.originalSymbol}</b></span><br />
                                <span>&#x2022; Crosschain Fee is <b className="text-indigo-600">{Number(tokens[selectedToken]?.SwapFeeRatePerMillion).toLocaleString("fi-FI")} %</b></span><br />
                                <div className='mt-1 mb-1 ml-4'>
                                    <span>&#x2022; Minimum Crosschain Fee is <b className="text-indigo-600">{(tokens[selectedToken]?.MinimumSwapFee) <= '1' ?
                                        Number(parseFloat(tokens[selectedToken]?.MinimumSwapFee).toFixed(4)).toLocaleString("fi-FI") : Number(parseFloat(tokens[selectedToken]?.MinimumSwapFee).toFixed(2)).toLocaleString("fi-FI")} {tokens[selectedToken]?.originalSymbol}</b></span><br />
                                    <span>&#x2022; Maximum Crosschain Fee is <b className="text-indigo-600">{Number(Math.round(tokens[selectedToken]?.MaximumSwapFee)).toLocaleString("fi-FI")} {tokens[selectedToken]?.originalSymbol}</b></span><br />
                                </div>
                                <span>&#x2022; Estimated Time of Crosschain Arrival is <b className="text-indigo-600">10-30 min</b></span><br />
                                <span>&#x2022; Crosschain amount larger than <b className="text-indigo-600">{Number(Math.round(tokens[selectedToken]?.BigValueThreshold)).toLocaleString("fi-FI")} {tokens[selectedToken]?.originalSymbol}</b> could take up to <b className="text-indigo-600">24 hours</b></span><br />
                            </div>
                        </div>
                    </div> :
                    <div className="w-full p-6 pt-0 pb-2">
                        <div className="hover:shadow-md bg-white bg-opacity-60 p-3 rounded-lg h-full flex justify-between items-center cursor-pointer" onClick={() => {setOpenInfoTab(!openInfoTab)}}>
                            <div style={{ fontSize: '14px' }}>
                                {/* {amount <= tokens[selectedToken]?.MinimumSwap ?
                                <>Minimum Crosschain Amount is <b>{tokens[selectedToken]?.MinimumSwap <= '1' ?
                                    parseFloat(tokens[selectedToken]?.MinimumSwap).toFixed(4) : parseFloat(tokens[selectedToken]?.MinimumSwap).toFixed(2)} {tokens[selectedToken]?.symbol}</b></> : */}
                                <>Minimum Amount is <b className="text-indigo-600">{tokens[selectedToken]?.MinimumSwap <= '1' ?
                                    Number(parseFloat(tokens[selectedToken]?.MinimumSwap).toFixed(4)).toLocaleString("fi-FI") : Number(parseFloat(tokens[selectedToken]?.MinimumSwap).toFixed(2)).toLocaleString("fi-FI")} {tokens[selectedToken]?.originalSymbol}</b></>
                                {/* } */}
                                <span style={{ fontSize: '12px' }} className='text-[#7f7f7f]'>&nbsp;(Minimum / Average Fee is <b className="text-indigo-600">{tokens[selectedToken]?.MinimumSwapFee <= '1' ?
                                    Number(parseFloat(tokens[selectedToken]?.MinimumSwapFee).toFixed(4)).toLocaleString("fi-FI") : Number(parseFloat(tokens[selectedToken]?.MinimumSwapFee).toFixed(2)).toLocaleString("fi-FI")}</b> / <b className="text-indigo-600">{tokens[selectedToken]?.SwapFeeRatePerMillion}</b> % <b className="text-indigo-600">{tokens[selectedToken]?.originalSymbol}</b>)</span>
                            </div>
                            <ChevronDownIcon width={18} />
                        </div>
                    </div> 
                    }
                    

                    {account.data == undefined ?
                        <div className="w-full p-6 pt-0">
                            <Button
                                className='w-full border-indigo-600 text-lg fontTurrentRoad font-bold'
                                disabled={true}
                            >
                                Connect to Metamask
                            </Button>
                        </div> 

                        // : chainSwitch == true ?
                        // <div className="w-full p-6 pt-0">
                        //     <Button
                        //         className='w-full border-indigo-600 text-lg fontTurrentRoad font-bold'
                        //         disabled={true}
                        //     >
                        //         <LoaderSmall />&nbsp;Switching Chains
                        //     </Button>
                        // </div> : tooMuchDecimals == true ?
                        // <div className="w-full p-6 pt-0">
                        //     <Button
                        //         className='w-full border-indigo-600 text-lg fontTurrentRoad font-bold'
                        //         disabled={true}
                        //     >
                        //         Too many Decimal places
                        //     </Button> 
                        // </div> 

                        : approvalInProgress == true ?
                        <div className="w-full p-6 pt-0">
                            <Button
                                className='w-full border-indigo-600 text-lg fontTurrentRoad font-bold inline-flex justify-center items-center'
                                disabled={true}
                            >
                                <LoaderXS />&nbsp;'&gt; Approving_Tokens'
                            </Button> 
                        </div> 
                        // : tokens[selectedToken]?.routerABI == 'sendTransaction' ?
                        // <div className="w-full p-6 pt-0">
                        //     <Button
                        //         className='w-full border-indigo-600 text-lg fontTurrentRoad font-bold'
                        //         disabled={true}
                        //     >
                        //        Deprecated method (Needs to be fixed)
                        //     </Button>
                        // </div> 
                        : Number(amount) > Number(selectedTokenAllowance) ?
                        <div className="w-full p-6 pt-0">
                            <Button
                                className='w-full border-indigo-600 text-lg fontTurrentRoad font-bold'
                                onClick={approvalHandler}
                                // disabled={
                                //     chainId.toString() == bridgedTo
                                //         || amount == ''
                                //         || Number(amount) < Number(tokens[selectedToken]?.MinimumSwap)
                                //         || Number(amount) > Number(tokens[selectedToken]?.MaximumSwap)
                                //         || Number(selectedTokenBalance) < Number(amount)
                                //         || chainId.toString() == bridgedTo
                                //         || amount <= '0.0000000000000000000000' ? true : false}
                            >
                                '&gt; Approve_Tokens'
                            </Button>
                        </div> :
                        <div className="w-full p-6 pt-0">
                            <Button
                                className='w-full border-indigo-600 text-lg fontTurrentRoad font-bold'
                                onClick={() => {
                                    setOpenConformationModal(true)
                                }}
                                // disabled={
                                //     chainId.toString() == bridgedTo
                                //         || amount == ''
                                //         || Number(amount) < Number(tokens[selectedToken]?.MinimumSwap)
                                //         || Number(amount) > Number(tokens[selectedToken]?.MaximumSwap)
                                //         || Number(selectedTokenBalance) < Number(amount)
                                //         || chainId.toString() == bridgedTo
                                //         || amount <= '0.0000000000000000000000' ? true : false}
                            >
                                '&gt; Bridge_Funds'
                            </Button>
                        </div>
                    }
                </div>
                <BridgeConfirmationModal 
                    openConformationModal={openConformationModal}
                    setOpenConformationModal={setOpenConformationModal}
                    amount={amount}
                    tokens={tokens}
                    selectedToken={selectedToken}
                    destinationChain={destinationChain}
                    routerContract={routerContract}
                    anyToken={anyToken}
                    underlyingToken={underlyingToken}
                    setAmount={setAmount}
                />
            </div>
        </>
    )
}

Bridge.Layout = BridgeLayout

import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState, useEffect } from 'react'
import { Button } from '../../common';
import { useWalletInfo } from '@/components/hooks/web3';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Check from '@mui/icons-material/Check';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { StepIconProps } from '@mui/material/StepIcon';


export default function BridgeConfirmationModal({openConformationModal, setOpenConformationModal, amount, tokens, selectedToken, destinationChain}) {
    const [transactionMode, setTransactionMode] = useState(false)
    const [balanceAfterFee, setBalanceAfterFee] = useState('')
    const [chainInfo, setChainInfo] = useState([])
    const [APIstatus, setAPIStatus] = useState([])

    const { network, account } = useWalletInfo()

    function closeModal() {
        setTransactionMode(false)
        setOpenConformationModal(false)
    }

    const chainIdUrl = 'https://bridgeapi.anyswap.exchange/data/bridgeChainInfo'

    useEffect(() => {

        async function getChain() {
            try {
                const { data } = await axios.get(
                    chainIdUrl,
                    {
                        headers: {
                            Accept: 'application/json',
                        }
                    },
                )
                setChainInfo(data)
                //console.log(JSON.stringify(data, null, 4))

                //console.log('response staus is: ', status)

                return data
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    //console.log('error message: ', error.message)
                    return error.message
                } else {
                    //console.log('unexpected error: ', error)
                    return 'An unexpected error occurred'
                }
            }
        }

        getChain()

    }, [destinationChain, network.data, openConformationModal])

    useEffect(() => {
        function getAmount() {
            const afterFee = amount - tokens[selectedToken]?.MinimumSwapFee
            setBalanceAfterFee(afterFee.toString())
        }

        getAmount()
    }, [destinationChain, network.data, openConformationModal])


    return (
        <>
            <Transition appear show={openConformationModal} as={Fragment}>
                <Dialog as="div" className="relative z-30" onClose={() => { closeModal(); }} >
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

                                <Dialog.Panel className="w-full max-w-md  p-5 mb-8 ml-1 mr-1 overflow-hidden text-left align-middle transition-all transform rounded-2xl lightBlueGlass bridgeTokenSearchGlow" style={{
                                    minHeight: '474px',
                                    minWidth: '379px',
                                    maxHeight: "568px",
                                    maxWidth: "450px"

                                    // minHeight: '50vh',
                                    // minWidth: '40vh',
                                    // maxHeight: "60vh",
                                    // maxWidth: "50vh"
                                }} >


                                    <Dialog.Title
                                        as="h1"
                                        className="mt-1 mb-2 text-xl font-bold text-center text-white"
                                    >
                                        {transactionMode == true ?
                                            <>Transaction Details</>
                                            : <>Bridging Information</>}
                                    </Dialog.Title>
                                    {transactionMode == true ?
                                        <div className='bg-white bg-opacity-60 border-indigo-600 border text-indigo-800 rounded-lg text-center pt-1 pb-1'>Transaction in Progress</div>
                                        :
                                        <div className='bg-white bg-opacity-60 border-indigo-600 border rounded-lg text-center pt-1 pb-1 text-red-600'>Please review and confirm the details</div>}
                                    <div className='rounded-lg bg-white bg-opacity-60 text-indigo-800 border-indigo-600 border mt-4 mb-4'>
                                        <h2 style={{ fontSize: '20px', fontWeight: 'bold' }} className='mt-2 ml-2'>From</h2>
                                        <div className='flex justify-between mt-4 ml-2 mr-2' style={{ fontSize: '15px' }}>
                                            <div className='flex justify-start'><img src={chainInfo[network.data]?.logoUrl} width='24px' height='24px' alt='' />&nbsp;<span className='mt-1'>{chainInfo[network.data]?.name}</span></div>
                                            <div className='mt-1'>- {amount} {tokens[selectedToken]?.originalSymbol}</div>
                                        </div>
                                        {transactionMode == true ?
                                            <div className='flex justify-between mt-2 mb-2 ml-2 mr-2' style={{ fontSize: '15px' }}>
                                                <div>Tx Hash:</div>
                                                {/* <div><a href={`${chainInfo[network.data]?.explorer.tx}${transactionHash}`} target='_blank' rel="noreferrer"><b>{transactionHash.slice(0, 6) + '...' + transactionHash.slice(60, 66)}</b></a></div> */}
                                                <div>...</div>
                                            </div> 
                                            :
                                            null
                                        }
                                        <div className='flex justify-between mt-2 mb-2 ml-2 mr-2' style={{ fontSize: '15px' }}>
                                            {transactionMode == true ?
                                                <div>From:</div> : <div>Address:</div>}
                                            <div><a href={`${chainInfo[network.data]?.explorer.address}${account.data}`} target='_blank' rel="noreferrer"><b>{(account.data)?.slice(0, 6) + '...' + (account.data)?.slice(38, 42)}</b></a></div>
                                        </div>

                                    </div>
                                    <div className='flex justify-center mb-4 fill-white '>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-8 h-8 border-indigo-600 border rounded-lg p-1">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
                                        </svg>
                                    </div>
                                    <div className='rounded-lg bg-white bg-opacity-60 text-indigo-800 border-indigo-600 border'>
                                        <h2 style={{ fontSize: '20px', fontWeight: 'bold' }} className='mt-2 ml-2'>To</h2>
                                        <div className='flex justify-between mt-4 ml-2 mr-2' style={{ fontSize: '15px' }}>
                                            <div className='flex justify-start'><img src={chainInfo[destinationChain]?.logoUrl} width='24px' height='24px' alt='' />&nbsp;<span className='mt-1'>{chainInfo[destinationChain]?.name}</span></div>
                                            <div className='mt-1'>+ {balanceAfterFee} {tokens[selectedToken]?.symbol}</div>
                                        </div>
                                        {transactionMode == true ?
                                            <div className='flex justify-between mt-2 mb-2 ml-2 mr-2' style={{ fontSize: '15px' }}>
                                                <div>Tx Hash:</div>
                                                {APIstatus.info?.swaptx == undefined ?
                                                    <div><b>...</b></div>
                                                    :
                                                    <div><a href={`${chainInfo[destinationChain]?.explorer.tx}${APIstatus.info?.swaptx}`} target='_blank' rel="noreferrer"><b>{(APIstatus.info?.swaptx)?.slice(0, 6) + '...' + (APIstatus.info?.swaptx)?.slice(60, 66)}</b></a></div>}

                                            </div> 
                                            :
                                            null
                                        }

                                        <div className='flex justify-between mt-2 mb-2 ml-2 mr-2' style={{ fontSize: '15px' }}>
                                            {transactionMode == true ?
                                                <div>Receive:</div> : <div>Address:</div>}
                                            <div><a href={`${chainInfo[destinationChain]?.explorer.address}${account.data}`} target='_blank' rel="noreferrer"><b>{(account.data)?.slice(0, 6) + '...' + (account.data)?.slice(38, 42)}</b></a></div>
                                        </div>
                                    </div>
                                    {transactionMode == true ?
                                        null :
                                        <><div className='flex justify-between mt-2 ml-2 mr-2 text-indigo-800' style={{ fontSize: '15px' }}>
                                            <div>
                                                Crosschain Fee:
                                            </div>
                                            <div>
                                                {tokens[selectedToken]?.MinimumSwapFee <= '1' ?
                                                    Number(parseFloat(tokens[selectedToken]?.MinimumSwapFee).toFixed(4)).toLocaleString("fi-FI") : Number(parseFloat(tokens[selectedToken]?.MinimumSwapFee).toFixed(2)).toLocaleString("fi-FI")} {tokens[selectedToken]?.originalSymbol}&nbsp;
                                                ({tokens[selectedToken]?.SwapFeeRatePerMillion}%)
                                            </div>
                                        </div>
                                            <div className='flex justify-between mt-1 mb-2 ml-2 mr-2 text-indigo-800' style={{ fontSize: '15px' }}>
                                                <div>
                                                    Estimated time of arrival:
                                                </div>
                                                <div>
                                                    3-30 min
                                                </div>
                                            </div>
                                        </>}
                                    {/* {transactionMode == true && bridgingFailed == true ?
                                        < div className='mt-4 mr-3 bg-white bg-opacity-60 rounded-lg text-center text-red-400 pt-1 pb-1'>
                                            <h2>Bridging Failed</h2>
                                        </div> : null} */}
                                    {transactionMode == true && Number(amount) > Number(tokens[selectedToken]?.BigValueThreshold) ?
                                        < div className='mt-4 bg-white bg-opacity-60 rounded-lg text-center pt-1 pb-1 text-indigo-800 border border-indigo-600'>
                                            <h2>Bridging this Amount will take up to 24h</h2>
                                        </div> : null}
                                    {transactionMode == true ?
                                        < div className='mt-4 mr-2'>

                                            {/* < Stepper alternativeLabel activeStep={step} connector={<QontoConnector />}>
                                                {steps.map((label) => (
                                                    <Step key={label}>
                                                        <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
                                                    </Step>
                                                ))}
                                            </Stepper> */}
                                        </div>
                                        :
                                        <Button
                                            fullWidth
                                            className="mt-3 font-bold w-full fontTurrentRoad border-indigo-600"
                                            onClick={() => { setTransactionMode(true); }}
                                            // disabled={
                                            //     chainId.toString() == bridgedTo
                                            //         || amount == ''
                                            //         || Number(amount) < Number(tokens[selectedToken]?.MinimumSwap)
                                            //         || Number(amount) > Number(tokens[selectedToken]?.MaximumSwap)
                                            //         || Number(selectedTokenBalance) < Number(amount)
                                            //         || chainId.toString() == bridgedTo
                                            //         || amount <= '0.0000000000000000000000' ? true : false}
                                        >
                                            '&gt; Confirm_Swap'
                                        </Button>}

                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition >
        </>
    )
}

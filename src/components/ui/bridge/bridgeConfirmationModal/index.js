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
import { LoaderXS } from '../../common/loader';
import { ethers } from 'ethers';

const steps = ['Sent', 'Confirming', 'Routing', 'Success'];

export default function BridgeConfirmationModal({openConformationModal, setOpenConformationModal, amount, tokens, selectedToken, destinationChain, routerContract, anyToken, setAmount}) {
    const [transactionMode, setTransactionMode] = useState(false)
    const [step, setStep] = useState(2)
    const [balanceAfterFee, setBalanceAfterFee] = useState('')
    const [chainInfo, setChainInfo] = useState([])
    const [transactionHash, setTransactionHash] = useState('')
    const [APIstatus, setAPIStatus] = useState([])

    const { network, account } = useWalletInfo()

    function closeModal() {
        setTransactionMode(false)
        setOpenConformationModal(false)
    }

    async function bridgeHandler() {
        const ERC20ABI = require('./abi/Token.json');
        const RouterABI = require('./abi/Router.json')
        const SwapoutABI = require('./abi/Swapout.json')
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const fromAddress = await provider.getSigner()
        const destAddress = await fromAddress.getAddress()

        const amountToTransfer = ethers.utils.parseUnits(amount, tokens[selectedToken]?.decimals)
        const toAddress = tokens[selectedToken]?.DepositAddress

        let Token = new ethers.Contract(
            tokens[selectedToken]?.srcAddress,
            ERC20ABI,
            fromAddress
        )

        let Router = new ethers.Contract(
            routerContract,
            RouterABI,
            fromAddress
        )

        let Swapout = new ethers.Contract(
            routerContract,
            SwapoutABI,
            fromAddress
        )

        console.log(tokens[selectedToken]?.routerABI)

        if (tokens[selectedToken]?.routerABI == 'transfer(toAddress,amount)') { // Wokrs ! 
            try {
                Token.transfer(toAddress, amountToTransfer, { gasLimit: 200000 }).then((transfer) => {
                    //console.dir(transfer)
                    setTransactionHash(transfer.hash)
                    transfer.wait().then((transferResult) => {
                        //console.log(transferResult.hash)
                    })
                        .catch((error) => {
                            console.log(error)
                        })
                })
                    .catch((error) => {
                        console.log(error)
                    })
            } catch (error) {
                console.log(error)
            }

        } else if (tokens[selectedToken]?.routerABI == 'sendTransaction') { // Works !
            try {
                fromAddress.sendTransaction({ from: destAddress, to: toAddress, value: amountToTransfer, gasLimit: 200000 }).then((transfer) => {
                    //console.dir(transfer)
                    setTransactionHash(transfer.hash)
                })
            } catch (error) {
                console.log(error)
            }

        } else if (tokens[selectedToken]?.routerABI == 'anySwapOutUnderlying(fromanytoken,toAddress,amount,toChainID)') { // Works !
            try {
                console.log(tokens[selectedToken]?.name)
                Router.anySwapOutUnderlying(anyToken, destAddress, amountToTransfer, Number(destinationChain), { gasLimit: 200000 }).then((transfer) => {
                    //console.dir(transfer)
                    setTransactionHash(transfer.hash)
                    transfer.wait().then((transferResult) => {
                        //console.log(transferResult.hash)
                    })
                        .catch((error) => {
                            console.log(error)
                        })
                })
                    .catch((error) => {
                        console.log(error)
                    })
            } catch (error) {
                console.log(error)
            }
            // transaction = await Router.connect(fromAddress).anySwapOutUnderlying(anyToken, destAddress, amountToTransfer, Number(bridgedTo), { gasLimit: 200000 })
            // setTransactionHash(transaction.hash)
            // await transaction.wait()

        } else if (tokens[selectedToken]?.routerABI == 'anySwapOut(fromanytoken,toAddress,amount,toChainID)') { // Works !
            try {
                Router.anySwapOut(anyToken, destAddress, amountToTransfer, Number(destinationChain), { gasLimit: 200000 }).then((transfer) => {
                    //console.dir(transfer)
                    setTransactionHash(transfer.hash)
                    transfer.wait().then((transferResult) => {
                        //console.log(transferResult.hash)
                    })
                        .catch((error) => {
                            console.log(error)
                        })
                })
                    .catch((error) => {
                        console.log(error)
                    })
            } catch (error) {
                console.log(error)
            }
            // transaction = await Router.connect(fromAddress).anySwapOut(anyToken, destAddress, amountToTransfer, Number(bridgedTo), { gasLimit: 200000 })
            // setTransactionHash(transaction.hash)
            // await transaction.wait()

        }
        else if (tokens[selectedToken]?.routerABI == 'Swapout(amount,toAddress)') { // Works !
            try {
                //Router.Swapout(amountToTransfer, destAddress, { gasLimit: 200000 })
                Swapout.Swapout(amountToTransfer, destAddress, { gasLimit: 200000 }).then((transfer) => {
                    //console.dir(transfer)
                    setTransactionHash(transfer.hash)
                    transfer.wait().then((transferResult) => {
                        //console.log(transferResult.hash)
                    })
                        .catch((error) => {
                            console.log(error)
                        })
                })
                    .catch((error) => {
                        console.log(error)
                    })
            } catch (error) {
                console.log(error)

            }

        }
        else if (tokens[selectedToken]?.routerABI == 'anySwapOutNative(fromanytoken,toAddress,toChainID,{value: amount})') { // Works !
            try {
                Router.anySwapOutNative(anyToken, destAddress, Number(destinationChain), { value: amountToTransfer, gasLimit: 200000 }).then((transfer) => {
                    //console.dir(transfer)
                    setTransactionHash(transfer.hash)
                    transfer.wait().then((transferResult) => {
                        //console.log(transferResult.hash)
                    })
                        .catch((error) => {
                            console.log(error)
                        })
                })
                    .catch((error) => {
                        console.log(error)
                    })
            } catch (error) {
                console.log(error)
            }
        }

    }

    /// MUI Stepper

    const QontoConnector = styled(StepConnector)(({ theme }) => ({
        [`&.${stepConnectorClasses.alternativeLabel}`]: {
            top: 10,
            left: 'calc(-50% + 16px)',
            right: 'calc(50% + 16px)',
        },
        [`&.${stepConnectorClasses.active}`]: {
            [`& .${stepConnectorClasses.line}`]: {
                borderColor: '#4f46e5', //#4f46e5
            },
        },
        [`&.${stepConnectorClasses.completed}`]: {
            [`& .${stepConnectorClasses.line}`]: {
                borderColor: '#4f46e5',
            },
        },
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
            borderTopWidth: 3,
            borderRadius: 1,
        },
    }));

    const QontoStepIconRoot = styled('div')(
        ({ theme, ownerState }) => ({
            color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
            display: 'flex',
            height: 22,
            alignItems: 'center',
            ...(ownerState.active && {
                color: '#4f46e5',
            }),
            '& .QontoStepIcon-completedIcon': {
                color: '#4f46e5',
                zIndex: 1,
                fontSize: 18,
            },
            '& .QontoStepIcon-circle': {
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: 'currentColor',
            },
        }),
    );

    function QontoStepIcon(props) {
        const { active, completed, className } = props;

        return (
            <QontoStepIconRoot ownerState={{ active }} className={className}>
                {completed ? (
                    <Check className="QontoStepIcon-completedIcon" />
                ) : active ? (
                    <LoaderXS/>
                ) :
                    (
                        <div className="QontoStepIcon-circle" />
                    )}
            </QontoStepIconRoot>
        );
    }

    ///

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
                <Dialog as="div" className="relative z-30" onClose={() => { closeModal(); setAmount('')}} >
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

                                <Dialog.Panel className="w-full max-w-md  p-5 mb-8 ml-1 mr-1 overflow-hidden text-left align-middle transition-all transform rounded-2xl lightBlueGlassMoreBlur bridgeTokenSearchGlow" style={{
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
                                                <div><a href={`${chainInfo[network.data]?.explorer.tx}${transactionHash}`} target='_blank' rel="noreferrer"><b>{transactionHash.slice(0, 6) + '...' + transactionHash.slice(60, 66)}</b></a></div>
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

                                            < Stepper alternativeLabel activeStep={step} connector={<QontoConnector />}>
                                                {steps.map((label) => (
                                                    <Step key={label}>
                                                        <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
                                                    </Step>
                                                ))}
                                            </Stepper>
                                        </div>
                                        :
                                        <Button
                                            className="mt-3 font-bold w-full fontTurrentRoad border-indigo-600"
                                            onClick={() => { bridgeHandler(); setTransactionMode(true) }}
                                            // disabled={
                                            //     chainId.toString() == destinationChain
                                            //         || amount == ''
                                            //         || Number(amount) < Number(tokens[selectedToken]?.MinimumSwap)
                                            //         || Number(amount) > Number(tokens[selectedToken]?.MaximumSwap)
                                            //         || Number(selectedTokenBalance) < Number(amount)
                                            //         || chainId.toString() == destinationChain
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

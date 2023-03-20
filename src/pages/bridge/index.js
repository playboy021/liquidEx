import BridgeAssetPanel from "@/components/ui/bridge/bridgeAssetsPanel"
import BridgeFromSelect from "@/components/ui/bridge/bridgeFrom"
import BridgeToSelect from "@/components/ui/bridge/bridgeTo"
import { Button, Loader } from "@/components/ui/common"
import { BridgeLayout } from "@/components/ui/layout"
import Image from "next/image"
import { useState } from "react"
import { ChevronDownIcon } from "@heroicons/react/solid"
import { useWalletInfo } from "@/components/hooks/web3"
import { LoaderSmall } from "@/components/ui/common/loader"

export default function Bridge() {
    const { network } = useWalletInfo()

    const [destinationChain, setDestinationChain] = useState('137')
    const [tokens, setTokens] = useState([])
    const [selectedToken, setSelectedToken] = useState('')
    const [amount, setAmount] = useState('')
    const [openInfoTab, setOpenInfoTab] = useState(false)

    return(
        <>
            <div className="flex justify-center">
                <div className="lightBlueGlassLessBlur mt-28 rounded-lg container">
                    <div className="w-full p-6 pb-2">
                        <div className="rounded-md h-full">
                        <BridgeAssetPanel
                            //spendFromWallet={true}
                            header={(props) => (
                                <>
                                    <BridgeAssetPanel.Panel {...props}
                                    amount={amount}
                                    setAmount={setAmount}
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
                        <div className="bg-white bg-opacity-60 p-4 pb-2 rounded-lg h-full flex items-center cursor-pointer justify-center" onClick={() => {setOpenInfoTab(!openInfoTab)}}>
                                <div className="">
                                    <LoaderSmall/>
                                </div>
                        </div> 
                    </div> 
                    :
                     <div className="w-full p-6 pt-0 pb-2">
                        <div className="bg-white bg-opacity-60 p-3 rounded-lg h-full flex justify-between items-center cursor-pointer" onClick={() => {setOpenInfoTab(!openInfoTab)}}>
                                <div className="flex justify-between">
                                    <span className="text-indigo-600 font-bold">Important:</span>
                                    <ChevronDownIcon width={18} />
                                </div>
                        </div>
                    </div> 
                    }
                    
                    
                    <div className="w-full p-6 pt-0">
                        <Button className='w-full border-indigo-600 text-lg fontTurrentRoad font-bold'>'&gt; Bridge_Funds'</Button>
                    </div>
                </div>
            </div>
        </>
    )
}

Bridge.Layout = BridgeLayout

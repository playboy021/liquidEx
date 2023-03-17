import BridgeAssetPanel from "@/components/ui/bridge/bridgeAssetsPanel"
import BridgeFromSelect from "@/components/ui/bridge/bridgeFrom"
import BridgeToSelect from "@/components/ui/bridge/bridgeTo"
import { Button } from "@/components/ui/common"
import { BridgeLayout } from "@/components/ui/layout"
import Image from "next/image"
import { useState } from "react"

export default function Bridge() {
    const [destinationChain, setDestinationChain] = useState('137')
    const [tokens, setTokens] = useState({})

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
                                    />
                                    <BridgeAssetPanel.Header
                                        destinationChain={destinationChain}
                                        setTokens={setTokens}
                                        tokens={tokens}
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
                    <div className="w-full p-6 pt-0">
                        <Button className='w-full border-indigo-600 text-lg fontTurrentRoad font-bold'>'&gt; Bridge_Funds'</Button>
                    </div>
                </div>
            </div>
        </>
    )
}

Bridge.Layout = BridgeLayout

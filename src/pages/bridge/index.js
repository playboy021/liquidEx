import { BridgeAssetPanel } from "@/components/ui/bridge"
import { Button, Container } from "@/components/ui/common"
import { BridgeLayout } from "@/components/ui/layout"

export default function Bridge() {

    return(
        <>
            <div className="flex justify-center">
                <div className="lightBlueGlassLessBlur mt-28 rounded-lg container">
                    <div className="w-full p-6 pb-2">
                        <div className="bg-white p-6 rounded-md h-full">
                            <BridgeAssetPanel/>
                        </div>
                    </div>
                    <div className="w-full p-6 pt-0 pb-2">
                        <div className="bg-white p-6 rounded-md h-full">
                            <h1 className="text-4xl text-center">Bridge</h1>
                        </div>
                    </div>
                    <div className="w-full p-6 pt-0">
                        <Button className='w-full border-indigo-600 text-lg'>Bridge Funds</Button>
                    </div>
                </div>
            </div>
        </>
    )
}

Bridge.Layout = BridgeLayout

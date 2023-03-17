import BridgeAssetPanel from "@/components/ui/bridge/bridgeAssetsPanel"
import { Button } from "@/components/ui/common"
import { BridgeLayout } from "@/components/ui/layout"

export default function Bridge() {

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
                                        // selectedToken={selectedToken}
                                        // tokens={tokens}
                                        // amount={amount}
                                        // setAmount={setAmount}
                                        // selectedTokenBalance={selectedTokenBalance}
                                    />
                                    <BridgeAssetPanel.Header
                                        // bridgedTo={bridgedTo}
                                        // chainId={chainId}
                                        // tokens={tokens}
                                        // setTokens={setTokens}
                                        // selectedToken={selectedToken}
                                        // setSelectedToken={setSelectedToken}
                                        // account={account}
                                        // anyToken={anyToken}
                                        // setAnyToken={setAnyToken}
                                        // underlyingToken={underlyingToken}
                                        // setUnderlyingToken={setUnderlyingToken}
                                        // routerContract={routerContract}
                                        // setRouterContract={setRouterContract}
                                        // chainTo={chainTo}
                                        // chainFrom={chainFrom}
                                        // amount={amount}
                                        // setAmount={setAmount}
                                    />
                                </>
                            )}
                            // currency={currencies[Field.INPUT] ?? Object.values(defaultTokens).find(token => token.isNative)}
                            // value={formattedAmounts[Field.INPUT]}
                            // onChange={useChange}
                            // onSelect={handleInputSelect}
                            // inputType={Field.INPUT}
                        />
                        </div>
                    </div>
                    <div className="w-full p-6 pt-0 pb-2">
                        <div className="bg-indigo-200 p-6 rounded-lg h-full">
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

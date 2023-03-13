import { normalizeOwnedItem } from "@/utils/normalize"
import useSWR from "swr"

export const handler = (web3, contract) => account => {
    const swrRes = useSWR(() => 
        (web3 && contract && account) ? `web3/managedItems/${account}` : null,
        async () => {
            const items = []

            const itemCount = await contract.getItemCount()

            for (let i = Number(itemCount) - 1; i >= 0 ; i--) {
                const itemHash = await contract.getItemHashAtIndex(i)
                const item = await contract.getItemByHash(itemHash)
                
                if (item) {
                    const normalize = normalizeOwnedItem(web3)({ hash: itemHash }, item)
                    items.push(normalize)
                }
            }

            return items
        }
    )

    return swrRes
}

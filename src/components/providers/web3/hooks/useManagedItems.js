import { createItemHash } from "@/utils/hash"
import { normalizeOwnedItem } from "@/utils/normalize"
import useSWR from "swr"

export const handler = (web3, contract) => account => {
    const swrRes = useSWR(() => 
        (web3 && contract && account) ? `web3/managedItems/${account}` : null,
        async () => {
            const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

            return items
        }
    )

    return swrRes
}

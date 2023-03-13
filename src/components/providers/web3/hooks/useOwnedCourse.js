import { createItemHash } from "@/utils/hash"
import { normalizeOwnedItem } from "@/utils/normalize"
import useSWR from "swr"

export const handler = (web3, contract) => (course, account) => {
    const swrRes = useSWR(() => 
        (web3 && contract && account) ? `web3/ownedCourse/${account}` : null,
        async () => {

            const itemHash = createItemHash(web3)(course.id, account)

            const ownedItem = await contract.getItemByHash(itemHash)

            if(
                ownedItem.owner === "0x0000000000000000000000000000000000000000"
            ) {
                return null
            }
            

            return normalizeOwnedItem(web3)(course, ownedItem)
        }
    )

    return swrRes
}

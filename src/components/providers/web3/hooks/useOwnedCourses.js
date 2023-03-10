import { createItemHash } from "@/utils/hash"
import { normalizeOwnedItem } from "@/utils/normalize"
import { ethers } from "ethers"
import useSWR from "swr"

export const handler = (web3, contract) => (courses, account) => {
    const swrRes = useSWR(() => 
        (web3 && contract && account) ? `web3/ownedCourses/${account}` : null,
        async () => {
            const ownedItems = []

            for (let i = 0; i < courses.length; i++) {
                const course = courses[i]

                if (!course.id) { continue }

                const itemHash = createItemHash(web3)(course.id, account)

                const ownedItem = await contract.getItemByHash(itemHash)

                if(
                    ownedItem.owner !== "0x0000000000000000000000000000000000000000"
                ) {
                    const normalized = normalizeOwnedItem(web3)(course, ownedItem)
                    ownedItems.push(normalized)
                }
            }

            return ownedItems
        }
    )

    return swrRes
}

import { normalizeOwnedItem } from "@/utils/normalize"
import { ethers } from "ethers"
import useSWR from "swr"

export const handler = (web3, contract) => (course, account) => {
    const swrRes = useSWR(() => 
        (web3 && contract && account) ? `web3/ownedCourse/${account}` : null,
        async () => {
            const hexItemIdWithPadding = ethers.utils.hexZeroPad(ethers.utils.hexlify(ethers.utils.toUtf8Bytes(course.id)), 16)

            const itemHash = ethers.utils.solidityKeccak256(
                ["bytes16", "address"],
                [hexItemIdWithPadding, account]
            )

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

import { ethers } from "ethers"
import useSWR from "swr"

export const handler = (web3, contract) => (courses, account) => {
    const swrRes = useSWR(() => 
        (web3 && contract && account) ? "web3/ownedCourses" : null,
        async () => {
            const ownedItems = []

            for (let i = 0; i < courses.length; i++) {
                const course = courses[i]
                // console.log('course', courses[i])

                if (!course.id) { continue }
                
                const hexItemIdWithPadding = ethers.utils.hexZeroPad(ethers.utils.hexlify(ethers.utils.toUtf8Bytes(course.id)), 16)
                // console.log('hexItemIdWithPadding', hexItemIdWithPadding)

                const itemHash = ethers.utils.solidityKeccak256(
                    ["bytes16", "address"],
                    [hexItemIdWithPadding, account]
                )
                // console.log('itemHash', itemHash)

                const ownedItem = await contract.getItemByHash(itemHash)
                // console.log('ownedItem', ownedItem)
                if(
                    ownedItem.owner !== "0x0000000000000000000000000000000000000000"
                ) {
                    ownedItems.push(ownedItem)
                }
            }

            return ownedItems
        }
    )

    return swrRes
}

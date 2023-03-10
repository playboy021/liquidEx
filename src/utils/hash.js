import { ethers } from "ethers"

export const createItemHash = (web3) => (itemId, account) => {
    const hexItemIdWithPadding = ethers.utils.hexZeroPad(ethers.utils.hexlify(ethers.utils.toUtf8Bytes(itemId)), 16)
    const itemHash = ethers.utils.solidityKeccak256(
        ["bytes16", "address"],
        [hexItemIdWithPadding, account]
    )

    return itemHash
}

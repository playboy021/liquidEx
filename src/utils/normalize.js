import { ethers } from "ethers"

export const ITEM_STATE = {
    0: 'PURCHASED',
    1: 'ACTIVATED',
    2: 'DEACTIVATED',
}

export const normalizeOwnedItem = (web3) => (item, ownedItem) => {
    return {
        ...item,
        id: ownedItem.id,
        proof: ownedItem.proof,
        owner: ownedItem.owner,
        price: ethers.utils.formatEther(ownedItem.price),
        state: ITEM_STATE[ownedItem.state],
    }
}

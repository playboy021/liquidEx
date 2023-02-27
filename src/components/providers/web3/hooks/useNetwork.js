import useSWR from 'swr'
import { ethers } from "ethers"
import { useEffect } from 'react';

export const handler = (web3, provider) => () => {

    const { mutate, ...rest } = useSWR(() => 
        web3 ? 'web3/network' : null,
        async () => {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const chainId = (await provider.getNetwork()).chainId
            return chainId
        }
    )

        useEffect(() => {
        provider &&
            provider.on('chainChanged', 
            chainId => {
                mutate(parseInt(chainId, 16))
            })
        }, [web3])

    return {
        network: {
            mutate,
            ...rest
        }
    }
}

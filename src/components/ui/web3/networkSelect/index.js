import Image from 'next/image'
import React from 'react'
import Select from 'react-select'

const options = [
    {
        label: (
            <div className="crnc_options">
                <Image src="/img/avx_ic.svg" alt="" height={28} width={28} /> <p>Avalanche</p>
            </div>
        ),
        value: 43114,
    },
    {
        label: (
            <div className="crnc_options">
                <Image src="/img/bsc_ic.svg" alt="" height={28} width={28} /> <p>BNB Smart Chain</p>
            </div>
        ),
        value: 56,
    },
    {
        label: (
            <div className="crnc_options">
                <Image src="/img/matic.svg" alt="" height={28} width={28} /> <p>Polygon</p>
            </div>
        ),
        value: 137,
    },
    {
        label: (
            <div className="crnc_options">
                <Image src="/img/fantom.svg" alt="" height={28} width={28} /> <p>Fantom</p>
            </div>
        ),
        value: 250,
    },
    {
        label: (
            <div className="crnc_options">
                <Image src="/img/optimism.svg" alt="" height={28} width={28} /> <p>Optimism</p>
            </div>
        ),
        value: 10,
    },
    {
        label: (
            <div className="crnc_options">
                <Image src="/img/arbitrum.svg" alt="" height={28} width={28} /> <p>Arbitrum</p>
            </div>
        ),
        value: 42161
    },
    {
        label: (
            <div className="crnc_options">
                <Image src="/img/ethereum.svg" alt="" height={28} width={28} /> <p>Ethereum</p>
            </div>
        ),
        value: 1,
    },

]

function ChainSelect({ onChange }) {
    // const { chainId, library, account } = useActiveWeb3React()

    // if (!chainId) return null

    return (
        <div
            className="flex items-center text-sm font-bold border-2 rounded cursor-pointer pointer-events-auto select-none border-[#131928] bg-[#131928] hover:bg-dark-900 whitespace-nowrap z-20"
        // onClick={() => toggleNetworkModal()}
        >
            <div className="grid items-center justify-center grid-flow-col text-sm rounded pointer-events-auto bg-[#131928] auto-cols-max text-secondary crncy_select_prnt opacity-100">
                {/*@ts-ignore TYPE NEEDS FIXING*/}
                {/* <Image src={NETWORK_ICON[chainId]} alt="Switch Network" className="rounded-md" width="22px" height="22px" /> */}
                <Select
                    isSearchable={false}
                    onChange={async (e) => onChange(e.value)}
                    options={options}
                    className="crncy_select"
                    placeholder="Client"
                    classNamePrefix="crncy_select_brdg"
                    value={options.filter(e => e.value == chainId)[0]}
                />
            </div>
        </div>
    )
}

export default ChainSelect

import { useWalletInfo } from '@/components/hooks/web3'
import Image from 'next/image'
import React from 'react'
import Select from 'react-select'

export const SUPPORTED_NETWORKS = {
    // [ChainId.ETHEREUM]: {
    //   chainId: '0x1',
    //   chainName: 'Ethereum',
    //   nativeCurrency: {
    //     name: 'Ethereum',
    //     symbol: 'ETH',
    //     decimals: 18,
    //   },
    //   rpcUrls: ['https://mainnet.infura.io/v3'],
    //   blockExplorerUrls: ['https://etherscan.com'],
    // },
    // [ChainId.FANTOM]: {
    //   chainId: '0xfa',
    //   chainName: 'Fantom',
    //   nativeCurrency: {
    //     name: 'Fantom',
    //     symbol: 'FTM',
    //     decimals: 18,
    //   },
    //   rpcUrls: ['https://rpcapi.fantom.network'],
    //   blockExplorerUrls: ['https://ftmscan.com'],
    // },
    56 : {
      chainId: '0x38',
      chainName: 'Binance Smart Chain Mainnet',
      nativeCurrency: {
        name: 'Binance Coin',
        symbol: 'BNB',
        decimals: 18,
      },
      rpcUrls: [
        "https://bsc-dataseed1.binance.org",
        "https://bsc-dataseed2.binance.org",
        "https://bsc-dataseed3.binance.org",
        "https://bsc-dataseed4.binance.org",
        "https://bsc-dataseed1.defibit.io",
        "https://bsc-dataseed2.defibit.io",
        "https://bsc-dataseed3.defibit.io",
        "https://bsc-dataseed4.defibit.io",
        "https://bsc-dataseed1.ninicoin.io",
        "https://bsc-dataseed2.ninicoin.io",
        "https://bsc-dataseed3.ninicoin.io",
        "https://bsc-dataseed4.ninicoin.io",
        "wss://bsc-ws-node.nariox.org"
      ],
      blockExplorerUrls: ['https://bscscan.com'],
    },
    // [ChainId.MATIC]: {
    //   chainId: '0x89',
    //   chainName: 'Matic',
    //   nativeCurrency: {
    //     name: 'Matic',
    //     symbol: 'MATIC',
    //     decimals: 18,
    //   },
    //   rpcUrls: ['https://polygon-rpc.com'], // ['https://matic-mainnet.chainstacklabs.com/'],
    //   blockExplorerUrls: ['https://polygonscan.com'],
    // },
    // [ChainId.HECO]: {
    //   chainId: '0x80',
    //   chainName: 'Heco',
    //   nativeCurrency: {
    //     name: 'Heco Token',
    //     symbol: 'HT',
    //     decimals: 18,
    //   },
    //   rpcUrls: ['https://http-mainnet.hecochain.com'],
    //   blockExplorerUrls: ['https://hecoinfo.com'],
    // },
    // [ChainId.XDAI]: {
    //   chainId: '0x64',
    //   chainName: 'xDai',
    //   nativeCurrency: {
    //     name: 'xDai Token',
    //     symbol: 'xDai',
    //     decimals: 18,
    //   },
    //   rpcUrls: ['https://rpc.xdaichain.com'],
    //   blockExplorerUrls: ['https://blockscout.com/poa/xdai'],
    // },
    // [ChainId.HARMONY]: {
    //   chainId: '0x63564C40',
    //   chainName: 'Harmony',
    //   nativeCurrency: {
    //     name: 'One Token',
    //     symbol: 'ONE',
    //     decimals: 18,
    //   },
    //   rpcUrls: [
    //     'https://api.harmony.one',
    //     'https://s1.api.harmony.one',
    //     'https://s2.api.harmony.one',
    //     'https://s3.api.harmony.one',
    //   ],
    //   blockExplorerUrls: ['https://explorer.harmony.one/'],
    // },
    // [ChainId.AVALANCHE]: {
    //   chainId: '0xA86A',
    //   chainName: 'Avalanche Mainnet C-Chain',
    //   nativeCurrency: {
    //     name: 'Avalanche Token',
    //     symbol: 'AVAX',
    //     decimals: 18,
    //   },
    //   rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'],
    //   blockExplorerUrls: ['https://snowtrace.io'],
    // },
    // [ChainId.OKEX]: {
    //   chainId: '0x42',
    //   chainName: 'OKEx',
    //   nativeCurrency: {
    //     name: 'OKEx Token',
    //     symbol: 'OKT',
    //     decimals: 18,
    //   },
    //   rpcUrls: ['https://exchainrpc.okex.org'],
    //   blockExplorerUrls: ['https://www.oklink.com/okexchain'],
    // },
    // [ChainId.ARBITRUM]: {
    //   chainId: '0xA4B1',
    //   chainName: 'Arbitrum',
    //   nativeCurrency: {
    //     name: 'Ethereum',
    //     symbol: 'ETH',
    //     decimals: 18,
    //   },
    //   rpcUrls: ['https://arb1.arbitrum.io/rpc'],
    //   blockExplorerUrls: ['https://arbiscan.io'],
    // },
    // [ChainId.CELO]: {
    //   chainId: '0xA4EC',
    //   chainName: 'Celo',
    //   nativeCurrency: {
    //     name: 'Celo',
    //     symbol: 'CELO',
    //     decimals: 18,
    //   },
    //   rpcUrls: ['https://forno.celo.org'],
    //   blockExplorerUrls: ['https://explorer.celo.org'],
    // },
    // [ChainId.MOONRIVER]: {
    //   chainId: '0x505',
    //   chainName: 'Moonriver',
    //   nativeCurrency: {
    //     name: 'Moonriver',
    //     symbol: 'MOVR',
    //     decimals: 18,
    //   },
    //   rpcUrls: ['https://rpc.moonriver.moonbeam.network'],
    //   blockExplorerUrls: ['https://moonriver.moonscan.io'],
    // },
    // [ChainId.FUSE]: {
    //   chainId: '0x7A',
    //   chainName: 'Fuse',
    //   nativeCurrency: {
    //     name: 'Fuse',
    //     symbol: 'FUSE',
    //     decimals: 18,
    //   },
    //   rpcUrls: ['https://rpc.fuse.io'],
    //   blockExplorerUrls: ['https://explorer.fuse.io'],
    // },
    // [ChainId.TELOS]: {
    //   chainId: '0x28',
    //   chainName: 'Telos',
    //   nativeCurrency: {
    //     name: 'Telos',
    //     symbol: 'TLOS',
    //     decimals: 18,
    //   },
    //   rpcUrls: ['https://mainnet.telos.net/evm'],
    //   blockExplorerUrls: ['https://rpc1.us.telos.net/v2/explore'],
    // },
    // [ChainId.PALM]: {
    //   chainId: '0x2A15C308D',
    //   chainName: 'Palm',
    //   nativeCurrency: {
    //     name: 'Palm',
    //     symbol: 'PALM',
    //     decimals: 18,
    //   },
    //   rpcUrls: ['https://palm-mainnet.infura.io/v3/da5fbfafcca14b109e2665290681e267'],
    //   blockExplorerUrls: ['https://explorer.palm.io'],
    // },
    // [ChainId.MOONBEAM]: {
    //   chainId: '0x504',
    //   chainName: 'Moonbeam',
    //   nativeCurrency: {
    //     name: 'Glimmer',
    //     symbol: 'GLMR',
    //     decimals: 18,
    //   },
    //   rpcUrls: ['https://rpc.api.moonbeam.network'],
    //   blockExplorerUrls: ['https://moonbeam.moonscan.io'],
    // },
    // [ChainId.OPTIMISM]: {
    //   chainId: '0xA',
    //   chainName: 'Optimism',
    //   nativeCurrency: {
    //     name: 'Eth',
    //     symbol: 'ETH',
    //     decimals: 18,
    //   },
    //   rpcUrls: [
    //     "https://opt-mainnet.g.alchemy.com/v2/5MH6DrsQh41RWFFWP58-qZ6ODW0W846Y",
    //     "https://mainnet.optimism.io/",
    //     "https://opt-mainnet.g.alchemy.com/v2/demo",
    //     "https://optimism-mainnet.public.blastapi.io",
    //     "https://rpc.ankr.com/optimism",
    //     "https://1rpc.io/op"
    //   ],
    //   blockExplorerUrls: ['https://optimistic.etherscan.io/'],
    // },
  }

const options = [
  {
      label: (
          <div className="crnc_options cursor-pointer">
              <Image src="/img/ethereum.svg" alt="" height={28} width={28} /> <p className='fontTurrentRoad pl-1'>Goerli</p>
          </div>
      ),
      value: 5,
  },
  {
    label: (
      <div className="crnc_options cursor-pointer">
        <Image src="/img/avx_ic.svg" alt="" height={28} width={28} /> <p className='fontTurrentRoad pl-1'>Avalanche</p>
      </div>
    ),
    value: 43114,
  },
  {
    label: (
      <div className="crnc_options cursor-pointer">
        <Image src="/img/matic.svg" alt="" height={28} width={28} /> <p className='fontTurrentRoad pl-1'>Polygon</p>
      </div>
    ),
    value: 137,
  },
  {
    label: (
      <div className="crnc_options cursor-pointer">
        <Image src="/img/bsc_ic.svg" alt="" height={28} width={28} /> <p className='fontTurrentRoad pl-1'>BNB Smart Chain</p>
      </div>
    ),
    value: 56,
  },
  {
    label: (
      <div className="crnc_options cursor-pointer">
        <Image src="/img/fantom.svg" alt="" height={28} width={28} /> <p className='fontTurrentRoad pl-1'>Fantom</p>
      </div>
    ),
    value: 250,
  },
  {
    label: (
      <div className="crnc_options cursor-pointer">
        <Image src="/img/ethereum.svg" alt="" height={28} width={28} /> <p className='fontTurrentRoad pl-1'>Ethereum</p>
      </div>
    ),
    value: 1,
  },
  {
    label: (
      <div className="crnc_options cursor-pointer">
        <Image src="/img/arbitrum.svg" alt="" height={28} width={28} /> <p className='fontTurrentRoad pl-1'>Arbitrum</p>
      </div>
    ),
    value: 42161
  },
  {
    label: (
      <div className="crnc_options cursor-pointer">
        <Image src="/img/optimism.svg" alt="" height={28} width={28} /> <p className='fontTurrentRoad pl-1'>Optimism</p>
      </div>
    ),
    value: 10,
  }
]

function ChainSelect({ onChange }) {

    const { network, account } = useWalletInfo()

    // const { chainId, library, account } = useActiveWeb3React()

    if (!network.data) return null

    return (
        <div
            className="flex items-center rounded cursor-pointer pointer-events-auto select-none whitespace-nowrap z-20"
        // onClick={() => toggleNetworkModal()}
        >
            <div className="grid items-center justify-center grid-flow-col text-sm rounded pointer-events-auto bg-[#131928] auto-cols-max text-secondary crncy_select_prnt opacity-100">
                {/*@ts-ignore TYPE NEEDS FIXING*/}
                {/* <Image src={NETWORK_ICON[chainId]} alt="Switch Network" className="rounded-md" width="22px" height="22px" /> */}
                <Select
                    isSearchable={false}
                    onChange={async (e) => {
                        let key = e.value
                        console.debug(`Switching to chain ${key}`, SUPPORTED_NETWORKS[key])
                        const params = SUPPORTED_NETWORKS[key]
                        console.log(params, key)
                        try {
                            await ethereum.request({
                                method: 'wallet_switchEthereumChain',
                                params: [{ chainId: `0x${key.toString(16)}` }],
                              });
                        } catch (switchError) {
                          // This error code indicates that the chain has not been added to MetaMask.
                          // @ts-ignore TYPE NEEDS FIXING
                          // if (switchError.code === 4902 || switchError.code === -32603) {
                          //   try {
                              // TODO fix this stupid hack
                              // await ethereum.request({
                              //   method: 'wallet_addEthereumChain',
                              //   params: [
                              //     {
                              //       chainId: '0x38',
                              //       chainName: 'Binance Smart Chain Mainnet',
                              //       nativeCurrency: {
                              //         name: 'Binance Coin',
                              //         symbol: 'BNB',
                              //         decimals: 18,
                              //       },
                              //       rpcUrls: [
                              //         "https://bsc-dataseed1.binance.org",
                              //         "https://bsc-dataseed2.binance.org",
                              //         "https://bsc-dataseed3.binance.org",
                              //         "https://bsc-dataseed4.binance.org",
                              //         "https://bsc-dataseed1.defibit.io",
                              //         "https://bsc-dataseed2.defibit.io",
                              //         "https://bsc-dataseed3.defibit.io",
                              //         "https://bsc-dataseed4.defibit.io",
                              //         "https://bsc-dataseed1.ninicoin.io",
                              //         "https://bsc-dataseed2.ninicoin.io",
                              //         "https://bsc-dataseed3.ninicoin.io",
                              //         "https://bsc-dataseed4.ninicoin.io",
                              //         "wss://bsc-ws-node.nariox.org"
                              //       ],
                              //       blockExplorerUrls: ['https://bscscan.com'],
                              //     },
                              //   ],
                              // });
                        
                          // } catch (addError) {
                          //   // handle "add" error
                          //   console.error(`Add chain error ${addError}`)
                          // }
                          // }
                          console.error(`Switch chain error ${switchError}`)
                          // handle other "switch" errors
                        }}
                      }
                    //}
                    options={options}
                    className="crncy_select"
                    placeholder="Client"
                    classNamePrefix="crncy_select_brdg"
                    value={options.filter(e => e.value == network.data)[0]}
                    //value={options[5]}
                />
            </div>
        </div>
    )
}

export default ChainSelect

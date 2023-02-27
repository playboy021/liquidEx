import { useWeb3 } from "@/components/providers";

export default function WalletBar({account, network, isLoading, hasInitialResponse}) {

  const networkInfo = {
    1: 'ETHEREUM MAINNET',
    5: 'GOERLI TESTNET',
    1337: 'LOCALHOST',
    137: 'POLYGON MATIC',
    250: 'FANTOM',
    43114: 'AVALANCHE',
    80001: 'MUMBAI',
    42161: 'ARBITRUM',
    56: 'Binance Smart Chain',
    97: 'Binance Smart Chain Testnet',
    1666600000: 'HARMONY',
    4242: 'Gauss Induction Labs',
  }

  const { requireInstall } = useWeb3()

  const targetNetwork = 5

  const changeNetwork = async () => {
    try {
      await ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x5' }],
      });
    } catch (switchError) {
      // This error code indicates that the chain has not been added to MetaMask.
      if (switchError.code === 4902) {
        try {
          await ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: '0x5',
                chainName: 'Goerli Testnet',
                rpcUrls: ['https://goerli.infura.io/v3/'],
                nativeCurrency: {
                  name: 'Goerli ETH',
                  symbol: 'goETH',
                  decimals: 18,
                },
                blockExplorerUrls: ['https://goerli.etherscan.io/'],
              },
            ],
          });
        } catch (addError) {
          console.log(addError)
        }
      }
      // handle other "switch" errors
    }
  }

  return (
    <section className="text-white bg-indigo-600 rounded-md">
      <div className="p-8">
        <h1 className="text-2xl">Hello, {network === undefined ? 'please use "Install Metamask" button.' : account.data === undefined ? 'please use "Connect Wallet" button.' : account.data}</h1>
        <h2 className="subtitle mb-5 text-xl">{account.data === undefined ? null : 'I hope you are having a great day!'}</h2>
        <div className="flex justify-between items-center">
          <div className="sm:flex sm:justify-center lg:justify-start">
            <div className="rounded-md shadow">
              <a href="#" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-black bg-white hover:bg-gray-100 md:py-4 md:text-lg md:px-10">
                Learn how to purchase
              </a>
            </div>
          </div>
          <div>
              { 
                network === undefined ? null :
                network !== targetNetwork && !isLoading ? 
                <div className="text-red-600 bg-red-300 rounded-lg p-4 text-center">
                  <div>
                    <strong className="text-lg font-bold p-1">{networkInfo[network]}</strong> network is not supported.
                  </div>
                  <div>
                    Please swtich network to <strong className="text-lg font-bold cursor-pointer hover:text-red-300 rounded-md hover:bg-red-600 p-1" onClick={changeNetwork}>{networkInfo[targetNetwork]}</strong>
                  </div> 
                </div> :
                <div>
                  <span className="text-md">Currently on </span>
                    <strong className="text-2xl">{networkInfo[network]}</strong>
                </div>
              }
          </div>
        </div>
      </div>
    </section>
  )
}

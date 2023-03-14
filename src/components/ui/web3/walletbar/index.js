import { useWalletInfo } from "@/components/hooks/web3";
import { useWeb3 } from "@/components/providers";
import { Button } from "../../common";

export default function WalletBar() {

  const { account, network } = useWalletInfo()

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
    <div className="text-white bg-indigo-600 rounded-md">
      <div className="p-8">
        <h1 className="text-base xs:text-2xl break-words">Hello, {network.data === undefined ? 'please use "Install Metamask" button.' : account.data === undefined ? 'please use "Connect Wallet" button.' : <a className="btn btn-one" href={`https://goerli.etherscan.io/address/${account.data}`} target="_blank"><span className="p-2">{account.data}</span></a>}</h1>
        <h2 className="subtitle mb-5 text-xl">{account.data === undefined ? null : 'I hope you are having a great day!'}</h2>
        <div className="flex justify-between items-center">
          <div className="sm:flex sm:justify-center lg:justify-start">
            <Button variant="light" className="mr-2 text-base xs:text-lg button" data-hover='Pay with Crypto' data-active='$$$'>
              <span>Learn how to purchase</span>
            </Button>
          </div>
          <div>
              { 
                network.data === undefined ? null :
                network.data !== targetNetwork && !network.isLoading ? 
                <div className="text-red-900 bg-red-200 rounded-lg p-4 text-center mb-4">
                  <div>
                    <strong className="text-lg font-bold p-1">{networkInfo[network.data]}</strong> network is not supported.
                  </div>
                  <div>
                    Please swtich network to <strong className="text-lg font-bold cursor-pointer hover:text-red-200 rounded-md hover:bg-red-900 p-1" onClick={changeNetwork}>{networkInfo[targetNetwork]}</strong>
                  </div> 
                </div> :
                null
              }
              {network === undefined || account.data === undefined ? null : 
              <div className='text-center'>
                <span className="text-md">Currently on </span>
                  <strong className="text-2xl">{networkInfo[network.data]}</strong>
              </div>}
          </div>
        </div>
      </div>
    </div>
  )
}

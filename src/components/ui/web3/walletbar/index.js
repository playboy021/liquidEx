export default function WalletBar({account, network}) {

  const networkInfo = {
    1: 'MAINNET',
    5: 'GOERLI',
    1337: 'LOCALHOST',
    137: 'POLYGON',
    250: 'FANTOM',
    43114: 'AVALANCHE',
    80001: 'MUMBAI',
    42161: 'ARBITRUM',
    56: 'Binance Smart Chain',
    97: 'Binance Smart Chain Testnet',
    1666600000: 'HARMONY',
  }

  return (
    <section className="text-white bg-indigo-600 rounded-md">
      <div className="p-8">
        <h1 className="text-2xl">Hello, {account.data === undefined ? 'please use "Connect Wallet" button.' : account.data}</h1>
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
            <div><span className="text-md">Currently on </span><strong className="text-2xl">{networkInfo[network]}</strong></div>
          </div>
        </div>
      </div>
    </section>
  )
}

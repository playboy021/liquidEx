import { useWeb3 } from "@/components/providers"
import Button from "../button"
import { useAccount } from '@components/hooks/web3'
import ActiveLink from "../link"
import Loader, { LoaderSmall } from "../loader"

export default function Navbar() {
  const { connect, isLoading, web3 } = useWeb3()
  const { account } = useAccount()

  return (
    <section>
      <div className="relative pt-6 fontTurrentRoad">
        <nav className="relative" aria-label="Global">
          <div className="flex flex-col xs:flex-row justify-between items-center">
            <div className="lightBlueGlass rounded-lg p-4 flex text-center">
              <ActiveLink href="/" >
                <a
                  className="font-medium ml-8 mr-8 text-white hover:text-gray-900">
                  Home
                </a>
              </ActiveLink>
              <ActiveLink href="/marketplace" >
                <a
                  className="font-medium mr-8 text-white hover:text-gray-900">
                  Marketplace
                </a>
              </ActiveLink>
              <ActiveLink href="/bridge" >
                <a
                  className="font-medium mr-8 text-white hover:text-gray-900">
                  Bridge
                </a>
              </ActiveLink>
              <ActiveLink href="/swap" >
                <a
                  className="font-medium mr-8 text-white hover:text-gray-900">
                  Swap
                </a>
              </ActiveLink>
            </div>
            <div className="text-center lightBlueGlass rounded-lg flex items-center">
              <ActiveLink href="/wishlist" >
                <a
                  className="font-medium sm:mr-8 mr-2 sm:ml-8 ml-2 text-white hover:text-gray-900  p-1">
                    CHAINSLCTBTN
                  {/* use React Select */}
                </a>
              </ActiveLink>
              
              { isLoading ?
                <Button
                  disabled={true}
                  className='border-indigo-600 pt-2 pb-2'
                >
                  <div className="pt-2">
                    <LoaderSmall />
                  </div>
                </Button> 
                : web3 != null ? account.data ?
                <Button
                  className="cursor-default button border-indigo-600 
                  h-14"
                  data-hover={account.isAdmin ? 'Admin Privileges' : 'User Privileges'}
                  data-active={account.isAdmin ? 'You Awesome' : 'You Meh'}
                >
                  <span>{account.data.slice(0, 6) + '...' + account.data.slice(-4)}</span>
                </Button> :
              <Button
                onClick={connect}
                className='border-indigo-600'
              >
                Connect Wallet
              </Button> :
                <Button
                  onClick={() => window.open('https://metamask.io/download.html', '_blank')}
                  className='border-indigo-600'
                >
                  Install Metamask
                </Button>
              }
              
            </div>
          </div>
        </nav>
      </div>
    </section>
  )
}

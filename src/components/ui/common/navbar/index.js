import { useWeb3 } from "@/components/providers"
import Link from "next/link"
import Button from "../button"
import { useAccount } from "@/components/hooks/web3/useAccount"

export default function Footer() {
  const { connect, isLoading, isWeb3Loaded } = useWeb3()
  const { account } = useAccount()

  return (
    <section>
      <div className="relative pt-6 px-4 sm:px-6 lg:px-8">
        <nav className="relative" aria-label="Global">
          <div className="flex justify-between items-center">
            <div>
              <Link href="/" >
                <a
                  className="font-medium mr-8 text-gray-500 hover:text-gray-900">
                  Home
                </a>
              </Link>
              <Link href="/marketplace" >
                <a
                  className="font-medium mr-8 text-gray-500 hover:text-gray-900">
                  Marketplace
                </a>
              </Link>
              <Link href="/" >
                <a
                  className="font-medium mr-8 text-gray-500 hover:text-gray-900">
                  Blogs
                </a>
              </Link>
            </div>
            <div>
              <Link href="/" >
                <a
                  className="font-medium mr-8 text-gray-500 hover:text-gray-900">
                  Wishlist
                </a>
              </Link>
              
              { isLoading ?
                <Button
                  disabled={true}
                >
                  Loading...
                </Button> : isWeb3Loaded ? account.data ?
                <Button
                  className="cursor-default button"
                  data-hover={account.isAdmin ? 'Admin Privileges' : 'User Privileges'}
                  data-active={account.isAdmin ? 'You Awesome' : 'You Meh'}
                >
                  <span>{account.data.slice(0, 6) + '...' + account.data.slice(-4)}</span>
                </Button> :
                <Button
                onClick={connect}
              >
                Connect Wallet
              </Button> :
                <Button
                  onClick={() => window.open('https://metamask.io/download.html', '_blank')}
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

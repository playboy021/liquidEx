import { useWeb3 } from "@/components/providers"
import Button from "../button"
import { useAccount } from '@components/hooks/web3'
import ActiveLink from "../link"
import Loader, { LoaderSmall } from "../loader"
import { NetworkSelector } from "../../web3"
import { useEffect, useState } from "react"

export default function Navbar() {
  const { connect, isLoading, web3 } = useWeb3()
  const { account } = useAccount()
  const [openNav, setOpenNav] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.location.pathname !== '/') {
        setOpenNav(true)
      }
    }
  }, [])

  return (
    <section>
      <div className="relative pt-6 fontTurrentRoad">
        <nav className="relative" aria-label="Global">
          <div className="flex flex-col xs:flex-row justify-between items-center">
              
              
              <div className="lightBlueGlassLessBlur rounded-lg flex text-center">
              <Button className={`fontTurrentRoad font-bold text-xl flex flex-col p-0 border-transparent navLogo ${openNav == true ? `bg-opacity-0 text-indigo-600 hover:text-white hover:bg-indigo-600` : `hover:bg-opacity-0 hover:text-indigo-600 bg-indigo-600 text-white`}`} onClick={() => setOpenNav(!openNav)}
                //data-hover={openNav == true ? `'>Close'` : `'>Open'`} 
                //data-active={openNav == true ? `'>Close'` : `'>Open'`}
              >
                <span>'&gt;Liquid_EX'</span>
              </Button>
              { openNav == true ? 
              <>
               <ActiveLink href="/" >
               <a
                 className="font-medium mr-8 text-white hover:text-gray-900 p-4">
                    Home
                  </a>
                </ActiveLink>
                <ActiveLink href="/marketplace" >
                  <a
                    className="font-medium mr-8 text-white hover:text-gray-900 p-4">
                    Marketplace
                  </a>
                </ActiveLink>
                <ActiveLink href="/bridge" >
                  <a
                    className="font-medium mr-8 text-white hover:text-gray-900 p-4">
                    Bridge
                  </a>
                </ActiveLink>
                <ActiveLink href="/swap" >
                  <a
                    className="font-medium mr-8 text-white hover:text-gray-900 p-4">
                    Swap
                  </a>
                </ActiveLink>
                </> : null
              }
                
            </div>
            <div className="text-center lightBlueGlassLessBlur rounded-lg flex items-center z-20">
              <div className="p-1">
                <NetworkSelector/>
              </div>
                  {/* use React Select */}
              
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
                  className="cursor-default button1 border-indigo-600 
                  h-14"
                  data-hover={account.isAdmin ? 'Admin Privileges' : 'User Privileges'}
                  data-active={account.isAdmin ? 'You Awesome' : 'You Meh'}
                >
                  <span>{account.data.slice(0, 6) + '...' + account.data.slice(-4)}</span>
                </Button> :
              <Button
                onClick={connect}
                className='border-indigo-600 h-14'
              >
                Connect Wallet
              </Button> :
                <Button
                  onClick={() => window.open('https://metamask.io/download.html', '_blank')}
                  className='border-indigo-600 h-14'
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

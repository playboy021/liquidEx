import { Web3Provider } from "@components/providers"
import { Navbar, Footer } from "@components/ui/common"

export default function BridgeLayout({children}) {
  return (
    <Web3Provider>
      <div className="max-w-7xl mx-auto px-4 fitBridge">
        <Navbar />
        <div>
          {children}
        </div>
      </div>
      <Footer />
    </Web3Provider>
  )
}

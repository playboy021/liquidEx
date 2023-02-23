import { Breadcrumbs, Footer, Hero, Navbar } from "@/components/common";
import { CourseList } from "@/components/course";
import { OrderCard } from "@/components/order";
import { WalletInfo, EthRates } from "@/components/web3";

export default function Home() {
  return (
    <div>
      <div className="relative bg-white overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4">
          
          <Navbar />
          
          <div className="fit">

            <Hero />            

            <Breadcrumbs />            

            <WalletInfo />

            <EthRates />

            <OrderCard />

            <CourseList />

          </div>
        </div>
        
        <Footer/>
        
      </div>
    </div>
  )
}

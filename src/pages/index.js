import { Breadcrumbs, Hero } from "@/components/common";
import { CourseList } from "@/components/course";
import { BaseLayout } from "@/components/layout";
import { OrderCard } from "@/components/order";
import { WalletInfo, EthRates } from "@/components/web3";

export default function Home() {
  return (
    <BaseLayout>

      <Hero />            

      <Breadcrumbs />            

      <WalletInfo />

      <EthRates />

      <OrderCard />

      <CourseList />

    </BaseLayout>
  )
}

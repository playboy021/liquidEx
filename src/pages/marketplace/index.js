import { useAccount } from "@/components/hooks/web3/useAccount"
import { useNetwork } from "@/components/hooks/web3/useNetwork"
import { WalletBar } from "@/components/ui/web3"
import { CourseList } from "@components/ui/course"
import { BaseLayout } from "@components/ui/layout"
import { getAllCourses } from "@content/courses/fetcher"

export function getStaticProps() {
    const { data } = getAllCourses()
    return {
        props: {
            courses: data
        }
    }
}

export default function Marketplace({courses}) {

    const { account } = useAccount()
    const { network } = useNetwork()

    return (
        <>
            <div className='py-4'>
                <WalletBar
                    account={account}
                    network={network.data}
                />
            </div>

            <CourseList
                courses={courses}
            />
        </>
  )
}

Marketplace.Layout = BaseLayout

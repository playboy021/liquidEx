import { useAccount, useOwnedCourses } from "@/components/hooks/web3";
import { Button, Message } from "@/components/ui/common";
import { OwnedCourseCard } from "@/components/ui/course";
import { BaseLayout } from "@/components/ui/layout";
import { MarketHeader } from "@/components/ui/marketplace";
import { getAllCourses } from "@/content/courses/fetcher";

export function getStaticProps() {
    const { data } = getAllCourses()
    return {
        props: {
            courses: data
        }
    }
}

export default function OwnedCourses({courses}) {
    const { account } = useAccount()
    const { ownedCourses } = useOwnedCourses(courses, account.data)

    return (
        <>
            {console.log('ownedCourses', ownedCourses.data)}
            <div className='py-4'>
                <MarketHeader />
            </div>
            
            <section className='grid grid-cols-1'>
                <OwnedCourseCard>
                    <Message>
                        <span>You have not purchased any courses yet.</span>
                    </Message>
                    <Button>
                        <span>View Item</span>
                    </Button>
                </OwnedCourseCard>
            </section>
        </>
    )
}

OwnedCourses.Layout = BaseLayout

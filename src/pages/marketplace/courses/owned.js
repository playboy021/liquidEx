import { useAccount, useOwnedCourses } from "@/components/hooks/web3";
import { Button, Loader, Message } from "@/components/ui/common";
import { LoaderBig } from "@/components/ui/common/loader";
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
            <MarketHeader />
            
            <section className='grid grid-cols-1'>
                {ownedCourses.data == undefined ? 
                <div className="w-full flex justify-center mt-8">
                    <LoaderBig />
                </div>
                :
                ownedCourses.data?.map((course) => 
                    <OwnedCourseCard
                        key={course.id}
                        course={course}
                    >
                        {/* <Message>
                            <span>You have not purchased any courses yet.</span>
                        </Message> */}
                        <Button>
                            <span>View Item</span>
                        </Button>
                    </OwnedCourseCard>
                )}
                
            </section>
        </>
    )
}

OwnedCourses.Layout = BaseLayout

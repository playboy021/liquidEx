import { useAccount, useOwnedCourses } from "@/components/hooks/web3";
import { Button, Loader, Message } from "@/components/ui/common";
import { LoaderBig } from "@/components/ui/common/loader";
import { OwnedCourseCard } from "@/components/ui/course";
import { BaseLayout } from "@/components/ui/layout";
import { MarketHeader } from "@/components/ui/marketplace";
import { getAllCourses } from "@/content/courses/fetcher";
import { useRouter } from "next/router";
import Link from "next/link";

export function getStaticProps() {
    const { data } = getAllCourses()
    return {
        props: {
            courses: data
        }
    }
}

export default function OwnedCourses({courses}) {
    const router = useRouter()
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
                : ownedCourses.hasInitialResponse && (!ownedCourses.data || ownedCourses?.data.length === 0) ?
                <div>
                    <Message type="WARNING">
                        You don't own any items yet.
                        <Link href='/marketplace'>
                            <a>&nbsp;
                                <span className="font-normal hover:underline"><i>Browse Marketplace</i></span>
                            </a>
                        </Link>
                    </Message>
                </div> :
                ownedCourses.data?.map((course) => 
                    <OwnedCourseCard
                        key={course.id}
                        course={course}
                    >
                        <Button onClick={() => router.push(`/courses/${course?.slug}`)}>
                            <span>View Item</span>
                        </Button>
                    </OwnedCourseCard>
                )}
                
            </section>
        </>
    )
}

OwnedCourses.Layout = BaseLayout

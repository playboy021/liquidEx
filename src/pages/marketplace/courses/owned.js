import { useAccount, useOwnedCourses } from "@/components/hooks/web3";
import { Button, Loader, Message } from "@/components/ui/common";
import { LoaderBig } from "@/components/ui/common/loader";
import { OwnedCourseCard } from "@/components/ui/course";
import { BaseLayout } from "@/components/ui/layout";
import { MarketHeader } from "@/components/ui/marketplace";
import { getAllCourses } from "@/content/courses/fetcher";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";

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
            <Head><title>Marketplace</title></Head>
            <MarketHeader />
            <section className='grid grid-cols-1'>
                { account.isEmpty ? <Message type="INFO">Please connect to Metamask</Message> :
                ownedCourses.data == undefined ? 
                <div className="w-full flex justify-center mt-8">
                    <LoaderBig />
                </div>
                : ownedCourses.isEmpty ?
                <div>
                    <Message type="WARNING">
                        You don&apos;t own any items yet.
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

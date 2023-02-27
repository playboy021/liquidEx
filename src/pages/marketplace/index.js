import { useAccount } from '@components/hooks/web3'
import { useNetwork } from '@components/hooks/web3'
import { WalletBar } from "@/components/ui/web3"
import { CourseCard, CourseList } from "@components/ui/course"
import { BaseLayout } from "@components/ui/layout"
import { getAllCourses } from "@content/courses/fetcher"
import { Button } from '@/components/ui/common'
import { OrderModal } from '@/components/ui/order'
import { useState } from 'react'

export function getStaticProps() {
    const { data } = getAllCourses()
    return {
        props: {
            courses: data
        }
    }
}

export default function Marketplace({courses}) {

    const [selectedCourse, setSelectedCourse] = useState(null)

    const { account } = useAccount()
    const { network } = useNetwork()

    return (
        <>
            <div className='py-4'>
                <WalletBar
                    account={account}
                    network={network.data}
                    isLoading={network.isLoading}
                    hasInitialResponse={network.hasInitialResponse}
                />
            </div>

            <CourseList
                courses={courses}
            >
                {
                    (course) => 
                        <CourseCard 
                            key={course.id} 
                            course={course}
                            Footer={() => 
                            <div className='mt-4'>
                                <Button 
                                    variant='light'
                                    onClick={() => setSelectedCourse(course)}
                                >
                                    Purchase
                                </Button>
                            </div>}
                        />
                }
            </CourseList>
            { selectedCourse &&
            <OrderModal 
                course={selectedCourse}
                setSelectedCourse={setSelectedCourse}
            />
            }
        </>
  )
}

Marketplace.Layout = BaseLayout

import { useWalletInfo } from '@components/hooks/web3'
import { CourseCard, CourseList } from "@components/ui/course"
import { BaseLayout } from "@components/ui/layout"
import { getAllCourses } from "@content/courses/fetcher"
import { Button } from '@/components/ui/common'
import { OrderModal } from '@/components/ui/order'
import { useState } from 'react'
import { MarketHeader } from '@/components/ui/marketplace'

export function getStaticProps() {
    const { data } = getAllCourses()
    return {
        props: {
            courses: data
        }
    }
}

export default function BuyCourses({courses}) {

    const [selectedCourse, setSelectedCourse] = useState(null)

    const { canPurchase } = useWalletInfo()

    return (
        <>
            <div className='py-4'>
                <MarketHeader />
            </div>

            <CourseList
                courses={courses}
            >
                {
                    (course) => 
                        <CourseCard 
                            disabled={!canPurchase}
                            key={course.id} 
                            course={course}
                            Footer={() => 
                            <div className='mt-4'>
                                <Button 
                                    variant='light'
                                    disabled={!canPurchase}
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

BuyCourses.Layout = BaseLayout

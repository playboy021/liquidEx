import { useWalletInfo } from '@components/hooks/web3'
import { CourseCard, CourseList } from "@components/ui/course"
import { BaseLayout } from "@components/ui/layout"
import { getAllCourses } from "@content/courses/fetcher"
import { Button } from '@/components/ui/common'
import { OrderModal } from '@/components/ui/order'
import { useState } from 'react'
import { MarketHeader } from '@/components/ui/marketplace'
import { useWeb3 } from '@/components/providers'
import { ethers } from 'ethers'

export function getStaticProps() {
    const { data } = getAllCourses()
    return {
        props: {
            courses: data
        }
    }
}

export default function Marketplace({courses}) {
    const { web3 } = useWeb3()
    const { canPurchase, account } = useWalletInfo()
    
    const [selectedCourse, setSelectedCourse] = useState(null)

    const purchaseItem = (order) => {
        const hexItemId = ethers.utils.hexlify(ethers.utils.toUtf8Bytes(selectedCourse.id));
        console.log('hexItemId: ', hexItemId) // looks good so far fix rest below

        // const orderHash = ethers.utils.solidityKeccak256(
        //     { ['bytes16']: [hexItemId] },
        //     { ['address']: [account.data] },
        // )
        // console.log('orderHash: ', orderHash)

        // const emailHash = ethers.utils.solidityKeccak256(
        //     order.email
        // )
        // console.log('emailHash: ', emailHash)

        // const proof = ethers.utils.solidityKeccak256(
        //     { ['bytes32']: [emailHash] },
        //     { ['bytes32']: [orderHash] }
        // )
        // console.log('proof: ', proof)

        // emailHash + itemHash
    }

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
                onSubmit={purchaseItem}
                course={selectedCourse}
                setSelectedCourse={setSelectedCourse}
            />
            }
        </>
  )
}

Marketplace.Layout = BaseLayout

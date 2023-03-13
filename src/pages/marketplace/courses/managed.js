import { useAccount, useManagedItems } from "@/components/hooks/web3";
import { Button } from "@/components/ui/common";
import { LoaderBig } from "@/components/ui/common/loader";
import { CourseFilter, ManagedItemCard, OwnedCourseCard } from "@/components/ui/course";
import { BaseLayout } from "@/components/ui/layout";
import { MarketHeader } from "@/components/ui/marketplace";
import { useState } from "react";

export default function ManagedCourses() {
    const [email, setEmail] = useState('')

    const { account } = useAccount()
    const { managedItems } = useManagedItems(account.data)

    const verifyItem = (email, {hash, proof}) => {
        console.log('email', email)
        console.log('hash', hash)
        console.log('proof', proof)
    }

    return (
        <>
            <MarketHeader />
            <CourseFilter />
            
            <section className='grid grid-cols-1'>
                { managedItems.data == undefined ? 
                    <div className="w-full flex justify-center mt-8">
                        <LoaderBig />
                    </div> :
                    managedItems.data && managedItems.data.map(item => 
                        <ManagedItemCard key={item.ownedItemId} item={item}>
                            <div className="flex mr-2 relative rounded-md">
                                <input 
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    type="text"
                                    name="account"
                                    id="account"
                                    className="w-96 foucs:ring-indigo-500 shadow-md focus:border-indigo-500 block sm:text-sm border-gray-300 rounded-md pl-7 p-4"
                                    placeholder='0x2341ab...'
                                />
                                <Button 
                                    className='ml-3' 
                                    onClick={() => verifyItem(email, {
                                        hash: item.hash, proof: item.proof
                                    })}
                                >
                                    Verify
                                </Button>
                            </div>
                        </ManagedItemCard>
                )}
            </section>
        </>
    )
}

ManagedCourses.Layout = BaseLayout

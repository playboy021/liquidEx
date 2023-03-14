import { useAccount, useManagedItems } from "@/components/hooks/web3";
import { Button, Message } from "@/components/ui/common";
import { LoaderBig } from "@/components/ui/common/loader";
import { CourseFilter, ManagedItemCard } from "@/components/ui/course";
import { BaseLayout } from "@/components/ui/layout";
import { MarketHeader } from "@/components/ui/marketplace";
import { ethers } from "ethers";
import { useState } from "react";

const VerificationInput = ({onVerify}) => {
    const [email, setEmail] = useState('')

    return (
        <div className="flex mr-2 relative rounded-md">
            <input 
                value={email}
                onChange={({target: {value}}) => setEmail(value)}
                type="email"
                name="account"
                id="account"
                className="w-96 foucs:ring-indigo-500 shadow-md focus:border-indigo-500 block sm:text-sm border-gray-300 rounded-md pl-7 p-4 text-black"
                placeholder='placeholder@mail.com'
            />
            <Button 
                className='ml-3' 
                onClick={() => onVerify(email)}
            >
                Verify
            </Button>
        </div>
    )
}

export default function ManagedCourses() {
    const [proofOfOwnership, setProofOfOwnership] = useState({})

    const { account } = useAccount()
    const { managedItems } = useManagedItems(account.data)

    const verifyItem = (email, {hash, proof}) => {
        const emailHash = ethers.utils.solidityKeccak256(
            ['string'], [email]
        )

        const proofToCheck = ethers.utils.solidityKeccak256(
            ['bytes32', 'bytes32'],
            [emailHash, hash]
        )

        // One method to verify the proof
        // if (proofToCheck === proof) {
        //     alert('Item is verified!')
        // } else {
        //     alert('Item is not verified!')
        // }

        // Another method to verify the proof
        proofToCheck === proof ?
            setProofOfOwnership({
                [hash]: true
            }) :
            setProofOfOwnership({
                [hash]: false
            })

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

                            <VerificationInput onVerify={email => {
                                verifyItem(email, {hash: item.hash, proof: item.proof})
                            }} />

                            { proofOfOwnership[item.hash] &&
                                <div className="mt-4">
                                    <Message>
                                        Item is verified!
                                    </Message>
                                </div>
                            }
                            { proofOfOwnership[item.hash] == false &&
                                <div className="mt-4">
                                    <Message type="ERROR" >
                                        Item is not verified!
                                    </Message>
                                </div>
                            }
                        </ManagedItemCard>
                )}
            </section>
        </>
    )
}

ManagedCourses.Layout = BaseLayout

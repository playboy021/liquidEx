import { Button } from "@/components/ui/common";
import { CourseFilter, OwnedCourseCard } from "@/components/ui/course";
import { BaseLayout } from "@/components/ui/layout";
import { MarketHeader } from "@/components/ui/marketplace";

export default function ManageCourses() {

    return (
        <>
            <div className='py-4'>
                <MarketHeader />
                <CourseFilter />
            </div>
            
            <section className='grid grid-cols-1'>
                <OwnedCourseCard>
                    <div className="flex mr-2 relative rounded-md">
                        <input 
                            type="text"
                            name="account"
                            id="account"
                            className="w-96 foucs:ring-indigo-500 shadow-md focus:border-indigo-500 block sm:text-sm border-gray-300 rounded-md pl-7 p-4"
                            placeholder='0x2341ab...'
                        />
                        <Button>
                            Verify
                        </Button>
                    </div>
                </OwnedCourseCard>
            </section>
        </>
    )
}

ManageCourses.Layout = BaseLayout

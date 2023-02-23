import { Modal } from "@/components/common"
import { CourseHero, Curriculum, Keypoints } from "@/components/course"
import { BaseLayout } from "@/components/layout"

export default function Course() {

    const lectures = [
      "How to init App",
      "How to get a help",
      "Introduction to Solidity",
      "Programing in C++",
      "How to write For Loops",
      "Safe operator",
    ]
  
    return (
      <BaseLayout>

        <div className="pt-4">
          <CourseHero />
        </div>

        <Keypoints />

        <div className="pb-4">
          <Curriculum 
            lectures={lectures}
          />
        </div>

        <Modal />

      </BaseLayout>
    )
}

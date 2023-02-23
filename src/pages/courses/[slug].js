import { Modal } from "@/components/common"
import { CourseHero, Curriculum, Keypoints } from "@/components/course"
import { BaseLayout } from "@/components/layout"
import { getAllCourses } from "@/content/fetcher"

export function getStaticPaths() {
  const { data } = getAllCourses()
  
  return {
    paths: data.map((course) => ({
      params: { slug: course.slug },
    })),
    fallback: false,
  }
}

export function getStaticProps({ params }) {
  const { data } = getAllCourses()

  const course = data.filter(course => course.slug === params.slug)[0] 

  return {
    props: {
      course
    }
  }
}

export default function Course({ course }) {

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
          <CourseHero 
            title={course.title}
            description={course.description}
            coverImage={course.coverImage}
          />
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

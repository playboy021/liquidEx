import { Hero } from "@components/ui/common"
import { CourseList } from "@components/ui/course"
import { BaseLayout } from "@components/ui/layout"
import { getAllCourses } from "@content/courses/fetcher"

export function getStaticProps() {
  const { data } = getAllCourses()
  return {
    props: {
      courses: data
    }
  }
}

export default function Home({courses}) {

  return (
    <>
      <Hero />

      <CourseList
        courses={courses}
      />
    </>
  )
}

Home.Layout = BaseLayout

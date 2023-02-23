import { Hero } from "@/components/common";
import { CourseList } from "@/components/course";
import { BaseLayout } from "@/components/layout";
import { getAllCourses } from "@/content/fetcher";

export function getStaticProps() {
  const { data, courseMap } = getAllCourses()
  return {
    props: {
      courses: data,
      courseMap
    }
  }
}

export default function Home({ courses, courseMap }) {
  return (
    <BaseLayout>

      <Hero />            

      <CourseList 
        courses={courses}
      />

    </BaseLayout>
  )
}

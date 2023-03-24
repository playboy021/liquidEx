import { Hero } from "@components/ui/common"
import { CourseCard, CourseList } from "@components/ui/course"
import { BaseLayout } from "@components/ui/layout"
import { getAllCourses } from "@content/courses/fetcher"
import Head from 'next/head'

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
      <Head><title>Home</title></Head>
      <Hero />

      <CourseList
          courses={courses}
      >
        {
            (course) => 
                <CourseCard 
                    key={course.id} 
                    course={course}
                />
        }
      </CourseList>
    </>
  )
}

Home.Layout = BaseLayout

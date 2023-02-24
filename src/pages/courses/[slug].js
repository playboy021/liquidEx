import { Modal } from "@components/ui/common";
import {
  CourseHero,
  Curriculum,
  Keypoints
} from "@components/ui/course";
import { BaseLayout } from "@components/ui/layout";
import { getAllCourses } from "@content/courses/fetcher";

const lectures = [
  "How to init App",
  "How to get a help",
  "Introduction to Solidity",
  "Programing in C++",
  "How to write For Loops",
  "Safe operator",
]

export function getStaticPaths() {
  const { data } = getAllCourses()

  return {
    paths: data.map(c => ({
      params: {
        slug: c.slug
      }
    })),
    fallback: false
  }
}


export function getStaticProps({params}) {
  const { data } = getAllCourses()
  const course = data.filter(c => c.slug === params.slug)[0]

  return {
    props: {
      course
    }
  }
}

export default function Course({course}) {

  return (
    <>
      <div className="py-4">
        <CourseHero
          title={course.title}
          description={course.description}
          image={course.coverImage}
        />
      </div>

      <Keypoints
        points={course.wsl}
      />

      <Curriculum
        locked={true}
        lectures={lectures}
      />
      
      <Modal />
    </>
  )
}

Course.Layout = BaseLayout

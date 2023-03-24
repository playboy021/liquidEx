import { useAccount, useOwnedCourse } from "@/components/hooks/web3";
import { Message, Modal } from "@components/ui/common";
import {
  CourseHero,
  Curriculum,
  Keypoints
} from "@components/ui/course";
import { BaseLayout } from "@components/ui/layout";
import { getAllCourses } from "@content/courses/fetcher";
import Head from "next/head";

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
  
  const { account } = useAccount()
  const { ownedCourse } = useOwnedCourse(course, account.data)

  const itemState =  ownedCourse.data?.state
  const isLocked = !itemState || itemState === '' || itemState === ('purchased').toUpperCase() || itemState === ('deactivated').toUpperCase()

  return (
    <>
      <Head><title>{course.title}</title></Head>
      <div className="py-4">
        <CourseHero
          hasOwner={!!ownedCourse.data}
          title={course.title}
          description={course.description}
          image={course.coverImage}
        />
      </div>

      <Keypoints
        points={course.wsl}
      />

        {  itemState &&
          <div>
            { itemState === ('purchased').toUpperCase() &&
          
                <Message type="WARNING">
                  You have purchased this item waiting for vendors response. This could take up to 24 hours. <i className="block font-normal">In case of any questions, please contact <a className="hover:text-green-600 hover:underline cursor-pointer">companymail@mail.com</a></i>
                </Message>
              
            }
            { itemState === ('activated').toUpperCase() &&
          
                <Message type="INFO">
                  Vendor has accepted your order and is currently shipping your item. ETA is 2 weeks. <i className="block font-normal">In case of any questions, please contact <a className="hover:text-indigo-600 hover:underline cursor-pointer">companymail@mail.com</a></i>
                </Message>
              
            }
            { itemState === ('deactivated').toUpperCase() &&
          
                <Message type="ERROR">
                  There was an issue with your order, please be patient the vendor is resolving this issue. <i className="block font-normal">In case of any questions, please contact <a className="hover:text-red-600 hover:underline cursor-pointer">companymail@mail.com</a></i>
                </Message>
              
            }
          </div>
        }

      <Curriculum
        hasOwner={!!ownedCourse.data}
        locked={isLocked}
        itemState={itemState}
        lectures={lectures}
      />
      
      <Modal />
    </>
  )
}

Course.Layout = BaseLayout

import courses from './index.json'

export const getAllCourses = () => {
  return {
    data: courses,
    courseMap: courses.reduce((acc, course, i) => {
        acc[course.id] = course
        acc[course.id].index = i
        return acc
    }, {})
  }
}

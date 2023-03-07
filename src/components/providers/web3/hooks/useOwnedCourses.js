import useSWR from "swr"

export const handler = (web3, contract) => (courses, account) => {
    const swrRes = useSWR(() => 
        (web3 && contract && account) ? "web3/ownedCourses" : null,
        () => {
            const ownedItems = []

            for (let i = 0; i < courses.length; i++) {
                const course = courses[i]
                ownedItems.push(course.id)
            }

            return ownedItems
        }
    )

    return swrRes
}

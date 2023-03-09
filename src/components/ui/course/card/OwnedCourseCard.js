import Image from 'next/image'

const STATE_COLORS = {
  PURCHASED: 'bg-green-100 text-green-800 hover:bg-green-200',
  ACTIVATED: 'bg-blue-100 text-blue-800 hover:bg-blue-200',
  DEACTIVATED: 'bg-red-100 text-red-800 hover:bg-red-200',
}

export default function OwnedCourseCard({children, course}) {

  const stateColor = STATE_COLORS[course?.state]

  return (
    <div className="bg-white border shadow overflow-hidden sm:rounded-lg mb-3">
      {course?.state}
      <div className='flex'>
        <div className='flex-1'>
          <div className='h-full next-image-wrapper'>
            <Image 
              className='object-cover'
              src={course.coverImage}
              width='45'
              height='45'
              layout='responsive'
            />
          </div>
        </div>
        <div className='flex-4'>
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              <span>{course?.title}</span>
              <span className={`${stateColor} rounded-lg text-xs m-2 px-1 cursor-pointer`}>{course?.state}</span>
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              {course?.price} ETH
            </p>
          </div>

          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-9 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Item ID
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {course?.ownedItemId && (course.ownedItemId).toString()}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-9 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Proof
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {course?.proof}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:px-6">
                {children}
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  )
}


const Item = ({title, value, bgColor}) => {

    return(
        <div className={`bg-${bgColor} px-4 py-5 sm:grid sm:grid-cols-9 sm:gap-4 sm:px-6`}>
            <div className="text-sm font-medium text-gray-500">
                {title}
            </div>
            <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {value}
            </div>
        </div>
    )
}

export default function MangedItemCard({children, item}) {

  return (
    <div className="bg-white border shadow overflow-hidden sm:rounded-lg mb-3">
        <div className="border-t border-gray-200">
            <Item 
                title='Item ID' 
                value={item?.ownedItemId && (item.ownedItemId).toString()} 
                bgColor='indigo-100'
            />
            
            <Item 
                title='Proof' 
                value={item?.proof} 
                bgColor='white'
            />

            <Item 
                title='Owner' 
                value={item?.owner} 
                bgColor='indigo-100'
            />

            <Item 
                title='Price' 
                value={item?.price} 
                bgColor='white'
            />

            <Item 
                title='Status' 
                value={item?.state} 
                bgColor='indigo-100'
            />
            
            <div className="bg-white px-4 py-5 sm:px-6">
                {children}
            </div>
        </div>
    </div>
  )
}

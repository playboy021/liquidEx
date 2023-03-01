export default function Breadcrumbs() {

  return (
    <nav aria-label="breadcrumb">
      <ol className="flex leading-none text-gray-500 divide-x divide-indigo-600">
        <li className="pr-4 hover:text-gray-900"><a href="#">Buy</a></li>
        <li className="px-4 hover:text-gray-900"><a href="#">My Orders</a></li>
        <li className="px-4 hover:text-gray-900"><a href="#">All Orders</a></li>
      </ol>
    </nav>
  )
}

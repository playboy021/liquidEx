import ActiveLink from "../link"

export default function Breadcrumbs({items}) {

  return (
    <nav aria-label="breadcrumb">
      <ol className="flex leading-none text-gray-500 divide-x divide-indigo-600">
        { items.map((item, index) =>
          <li key={item.href} className={`${index === 0 ? 'pr-4' : 'px-4'} hover:text-gray-900`}>
            <ActiveLink href={item.href}>
              <a>{item.value}</a>
            </ActiveLink>
          </li>
        )}
      </ol>
    </nav>
  )
}

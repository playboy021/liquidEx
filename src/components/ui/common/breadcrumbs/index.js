import React from "react"
import ActiveLink from "../link"

export default function Breadcrumbs({items, isAdmin}) {

  return (
    <nav aria-label="breadcrumb">
      <ol className="flex leading-none text-gray-500 divide-x divide-indigo-600">
        { items.map((item, index) =>
          <React.Fragment key={item.href}>
            { !item.requireAdmin &&
              <li className={`${index === 0 ? 'pr-4' : 'px-4'} hover:text-gray-900`}>
                <ActiveLink href={item.href}>
                  <a>{item.value}</a>
                </ActiveLink>
              </li>
            }
            { item.requireAdmin && isAdmin &&
              <li className={`${index === 0 ? 'pr-4' : 'px-4'} hover:text-gray-900`}>
                <ActiveLink href={item.href}>
                  <a>{item.value}</a>
                </ActiveLink>
              </li>
            }
          </React.Fragment>
        )}
      </ol>
    </nav>
  )
}

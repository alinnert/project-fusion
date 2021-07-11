import classNames from 'classnames'
import { useRouter } from 'next/router'
import { Fragment, MouseEvent, ReactElement } from 'react'
import { Category } from '../../redux/categories'
import { LinkListItem } from './LinkListItem'

export interface LinkItem {
  id: string
  name: string
  icon?: ReactElement
  iconColor?: string
}

export type CategorizedLinkItems = Array<[Category, LinkItem[]]>

export type LinkListPrefixedItems = Array<LinkItem>

interface Props {
  items?: CategorizedLinkItems
  prefixedItems?: LinkListPrefixedItems
  showIcons?: boolean
  defaultIcon?: ReactElement | null
  urlPrefix?: string
  currentId?: LinkItem['id'] | null
}

export function VerticalLinkList({
  items = [],
  prefixedItems = [],
  showIcons = false,
  defaultIcon = null,
  urlPrefix = '',
  currentId,
}: Props): ReactElement {
  const router = useRouter()

  function handleItemClick(item: LinkItem, event: MouseEvent<HTMLDivElement>) {
    const url = item.id.startsWith('/') ? item.id : `${urlPrefix}${item.id}`
    router.push(url)
  }

  function createLinkListItem(item: LinkItem) {
    return (
      <LinkListItem
        key={item.id}
        icon={showIcons ? item.icon ?? defaultIcon : undefined}
        iconColor={item.iconColor}
        onClick={(event) => handleItemClick(item, event)}
        current={item.id === currentId}
      >
        {item.name}
      </LinkListItem>
    )
  }

  return (
    <div className="mx-2 my-2 flex flex-col gap-y-1">
      {prefixedItems.map((item) => createLinkListItem(item)) ?? null}

      {items
        // Nur Kategorien anzeigen, denen auch Gruppen zugeordnet sind.
        .filter(([category, links]) => links.length > 0)
        .map(([category, links]) => (
          <Fragment key={category.id}>
            <div
              className={classNames(
                'flex items-center gap-x-1',
                'mt-6 first:mt-0 mb-1',
              )}
            >
              <div className="w-3 h-px bg-neutral-300" />
              <div className="text-sm font-semibold text-brand-600">
                {category.name}
              </div>
              <div className="flex-1 h-px bg-neutral-300" />
            </div>
            <div>{links.map((group) => createLinkListItem(group))}</div>
          </Fragment>
        ))}
    </div>
  )
}

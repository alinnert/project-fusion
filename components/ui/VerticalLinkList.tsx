import { useRouter } from 'next/router'
import React, { Fragment, MouseEvent, ReactElement } from 'react'
import { LinkListItem } from './LinkListItem'
import { TextDivider } from './TextDivider'

export interface LinkCategory {
  id: string
  name: string
}

export interface LinkItem {
  id: string
  name: string
  icon?: ReactElement
  iconColor?: string
}

export type CategorizedLinkItems = Array<[LinkCategory, LinkItem[]]>

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
        .filter(([_category, links]) => links.length > 0)
        .map(([category, links]) => (
          <Fragment key={category.id}>
            <TextDivider
              label={category.name}
              color="brand"
              className="not-first:mt-6 mb-1"
            />

            <div className="flex flex-col gap-y-1">
              {links.map((group) => createLinkListItem(group))}
            </div>
          </Fragment>
        ))}
    </div>
  )
}

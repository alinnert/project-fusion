import React, { Fragment, ReactElement, ReactNode } from 'react'
import { useNavigate } from 'react-router'
import { LinkListItem } from './LinkListItem'
import { TextDivider } from './TextDivider'

export type LinkCategory = { id: string; name: string }

export type LinkItem = {
  id: string | null
  name: string
  icon?: ReactElement
  iconColor?: string
  secondaryLabel?: (isCurrent: boolean) => ReactNode
}

export type CategorizedLinkItems = Array<[LinkCategory, LinkItem[]]>

export type LinkListPrefixedItems = Array<LinkItem>

type Props = {
  items?: CategorizedLinkItems
  prefixedItems?: LinkListPrefixedItems
  showIcons?: boolean
  defaultIcon?: ReactElement | null
  urlPrefix?: string
  currentId?: LinkItem['id'] | null
  onItemClick?: (item: LinkItem) => void
}

export function LinkList({
  items = [],
  prefixedItems = [],
  showIcons = false,
  defaultIcon = null,
  urlPrefix = '',
  currentId,
  onItemClick,
}: Props): ReactElement {
  const navigate = useNavigate()

  function handleItemClick(item: LinkItem): void {
    onItemClick?.(item)
    navigate(item.id === null ? urlPrefix : `${urlPrefix}/${item.id}`)
  }

  function createLinkListItem(item: LinkItem): ReactElement {
    const isCurrent = item.id === currentId
    const secondaryLabel = item.secondaryLabel?.(isCurrent)

    return (
      <LinkListItem
        key={item.id}
        icon={showIcons ? (item.icon ?? defaultIcon) : undefined}
        iconColor={item.iconColor}
        onClick={() => handleItemClick(item)}
        current={isCurrent}
      >
        <div className="grid grid-cols-[1fr,auto] items-center">
          <div>{item.name}</div>

          {secondaryLabel !== null && secondaryLabel !== undefined ? (
            <div className="ml-2">{secondaryLabel}</div>
          ) : null}
        </div>
      </LinkListItem>
    )
  }

  return (
    <div className="my-2 flex flex-col gap-y-0.5 px-2">
      {prefixedItems.map((item) => createLinkListItem(item)) ?? null}

      {items
        // Nur Kategorien anzeigen, denen auch Gruppen zugeordnet sind.
        .filter(([, links]) => links.length > 0)
        .map(([category, links]) => (
          <Fragment key={category.id}>
            {category.id !== '' ? (
              <TextDivider
                label={category.name}
                color="brand"
                className="mb-1 not-first:mt-6"
              />
            ) : null}

            {links.map((group) => createLinkListItem(group))}
          </Fragment>
        ))}
    </div>
  )
}

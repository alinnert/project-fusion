import { useRouter } from 'next/router'
import { Fragment, MouseEvent, ReactElement } from 'react'
import { Category } from '../../redux/categories'
import { LinkListItem } from './LinkListItem'

export interface BasicLinkItem {
  id: string
  name: string
}

export type LinkListItems<T extends BasicLinkItem> = Array<[Category, Array<T>]>

export type LinkListPrefixedItems = Array<BasicLinkItem>

interface Props<T extends BasicLinkItem> {
  items?: LinkListItems<T>
  prefixedItems?: LinkListPrefixedItems
  urlPrefix?: string
  currentId?: T['id'] | null
}

export function VerticalLinkList<T extends BasicLinkItem>({
  items = [],
  prefixedItems = [],
  urlPrefix = '',
  currentId,
}: Props<T>): ReactElement {
  const router = useRouter()

  function handleItemClick(
    item: BasicLinkItem,
    event: MouseEvent<HTMLDivElement>,
  ) {
    const url = item.id.startsWith('/') ? item.id : `${urlPrefix}${item.id}`
    router.push(url)
  }

  return (
    <div className="mx-2 my-2 flex flex-col gap-y-1">
      {prefixedItems.map((item) => (
        <LinkListItem
          key={item.id}
          onClick={(event) => handleItemClick(item, event)}
          current={item.id === currentId}
        >
          {item.name}
        </LinkListItem>
      )) ?? null}

      {items
        .filter(([category, links]) => links.length > 0)
        .map(([category, links]) => (
          <Fragment key={category.id}>
            <div
              className={[
                'flex items-center gap-x-1',
                'mt-6 first:mt-0 mb-1',
              ].join(' ')}
            >
              <div className={['w-3 h-px bg-neutral-300'].join(' ')} />
              <div className="text-sm font-semibold text-brand-600">
                {category.name}
              </div>
              <div className={['flex-1', 'h-px', 'bg-neutral-300'].join(' ')} />
            </div>
            <div>
              {links.map((group) => (
                <LinkListItem
                  key={group.id}
                  current={group.id === currentId}
                  onClick={(event) => handleItemClick(group, event)}
                >
                  {group.name}
                </LinkListItem>
              ))}
            </div>
          </Fragment>
        ))}
    </div>
  )

  function createLinkListItem(item: T) {
    return (
      <LinkListItem
        key={item.id}
        onClick={(event) => handleItemClick(item, event)}
        current={item.id === currentId}
      >
        {item.name}
      </LinkListItem>
    )
  }
}

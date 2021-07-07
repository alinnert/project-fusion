import { useRouter } from 'next/router'
import { MouseEvent, ReactElement } from 'react'
import { LinkListItem } from './LinkListItem'

export interface LinkItem {
  id: string
  name: string
}

interface Props<T extends LinkItem> {
  items: Array<T>
  createLink: (item: T) => string
  currentId?: T['id'] | null
}

export function VerticalLinkList<T extends LinkItem>({
  items,
  createLink,
  currentId,
}: Props<T>): ReactElement {
  const router = useRouter()

  function handleItemClick(item: T, event: MouseEvent<HTMLDivElement>) {
    router.push(createLink(item))
  }

  return (
    <div className="mx-2 my-2 flex flex-col gap-y-1">
      {items.map((item) => (
        <LinkListItem
          key={item.id}
          onClick={(event) => handleItemClick(item, event)}
          current={item.id === currentId}
        >
          {item.name}
        </LinkListItem>
      ))}
    </div>
  )
}

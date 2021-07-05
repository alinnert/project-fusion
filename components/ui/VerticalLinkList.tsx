import { useRouter } from 'next/router'
import { MouseEvent, ReactElement, useState } from 'react'
import { ProjectGroup } from '../../types/FileData'
import { LinkListItem } from './LinkListItem'

interface Props<T> {
  items: Array<ProjectGroup>
  currentId?: ProjectGroup['id'] | null
}

export function VerticalLinkList<T>({
  items,
  currentId,
}: Props<T>): ReactElement {
  const router = useRouter()

  function handleItemClick(
    item: ProjectGroup,
    event: MouseEvent<HTMLDivElement>,
  ) {
    router.push(item.id)
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

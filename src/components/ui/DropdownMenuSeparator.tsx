import { FC } from 'react'

export interface DropdownMenuItemSeparator {
  type: 'separator'
}

interface Props {}

export const DropdownMenuSeparator: FC<Props> = ({}) => {
  return <div className="mx-2 my-1 h-px bg-neutral-400" />
}

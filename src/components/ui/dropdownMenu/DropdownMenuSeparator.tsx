import React, { FC } from 'react'

export type DropdownMenuItemSeparator = {
  type: 'separator'
}

export const DropdownMenuSeparator: FC = ({}) => {
  return <div className="mx-2 my-1 h-px bg-neutral-400" />
}

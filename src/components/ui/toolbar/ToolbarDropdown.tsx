import React, { FC, ReactElement } from 'react'
import { DropdownMenu, DropdownMenuItem } from '../dropdownMenu/DropdownMenu'

export type ToolbarDropdownItem = {
  type: 'dropdown'
  label: string
  icon?: ReactElement
  items: DropdownMenuItem[]
}

export const ToolbarDropdown: FC<ToolbarDropdownItem> = ({
  label,
  icon,
  items,
}) => {
  return (
    <DropdownMenu items={items} icon={icon} buttonType="default">
      {label}
    </DropdownMenu>
  )
}

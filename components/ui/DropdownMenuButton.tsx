import classNames from 'classnames'
import React, { FC, ReactElement } from 'react'
import { matchBoolToString, matchUnionToString } from '../../utils/match'
import { DropdownMenuItem, DropdownMenuItemButtonType } from './DropdownMenu'
import { Heroicon } from './Heroicon'
import { PlaceholderIcon } from './PlaceholderIcon'

export interface DropdownMenuItemButton {
  type: 'button'
  label: string
  icon?: ReactElement
  buttonType?: DropdownMenuItemButtonType
  action?: () => void
}

interface Props {
  isActive: boolean
  item: DropdownMenuItem
}

export const DropdownMenuButton: FC<Props> = ({ isActive, item }) => {
  const handleItemClick = () => {
    if (item.type !== 'button') return
    return item.action?.()
  }

  if (item.type === 'button') {
    const buttonType = item.buttonType ?? 'default'

    return (
      <div
        onClick={handleItemClick}
        className={classNames(
          'flex items-center',
          'py-1 pl-1 pr-12 rounded',

          matchUnionToString(buttonType, {
            default: matchBoolToString(
              isActive,
              'bg-gradient-brand text-white',
              'text-neutral-700',
            ),
            delete: matchBoolToString(
              isActive,
              'bg-gradient-danger text-white',
              'text-danger-800',
            ),
          }),
        )}
      >
        <div className="mr-2">
          {item.icon !== undefined ? (
            <Heroicon icon={item.icon} />
          ) : (
            <PlaceholderIcon />
          )}
        </div>

        <div className="text-sm font-semibold">{item.label}</div>
      </div>
    )
  }

  if (item.type === 'separator') {
    return <div className="h-px bg-neutral-500" />
  }

  return null
}

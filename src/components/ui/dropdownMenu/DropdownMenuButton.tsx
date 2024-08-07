import { CheckIcon } from '@heroicons/react/16/solid'
import classNames from 'classnames'
import React, { FC, ReactElement } from 'react'
import { mapUnionToString } from '../../../utils/map'
import { Heroicon } from '../Heroicon'
import { PlaceholderIcon } from '../PlaceholderIcon'
import { DropdownMenuItem, DropdownMenuItemButtonType } from './DropdownMenu'

export type DropdownMenuItemButton = {
  type: 'button'
  label: string
  icon?: ReactElement
  buttonType?: DropdownMenuItemButtonType
  checked?: boolean
  action?: () => void
}

type Props = {
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
          'rounded py-1.5 pl-2 pr-12',

          mapUnionToString(buttonType, {
            default: classNames(
              'active:bg-gradient-brand-active active:text-white',
              {
                'bg-gradient-brand text-white': isActive,
                'text-neutral-700': !isActive,
              },
            ),
            delete: classNames(
              'active:bg-gradient-danger-active active:text-white',
              {
                'bg-gradient-danger text-white': isActive,
                'text-danger-800': !isActive,
              },
            ),
          }),
        )}
      >
        <div className="mr-2">
          {item.icon !== undefined ? (
            <Heroicon icon={item.icon} iconType="micro" />
          ) : item.checked ? (
            <Heroicon icon={<CheckIcon />} iconType="micro" />
          ) : (
            <PlaceholderIcon />
          )}
        </div>

        <div className="text-base leading-none">{item.label}</div>
      </div>
    )
  }

  if (item.type === 'separator') {
    return <div className="h-px bg-neutral-500" />
  }

  return null
}

import { ArrowSmRightIcon } from '@heroicons/react/solid'
import classNames from 'classnames'
import React, { FC, ReactElement, useMemo } from 'react'
import { matchBoolToString, matchUnionToString } from '../../utils/match'
import { Heroicon } from './Heroicon'

export type DropdownMenuItemType = 'default' | 'delete'

export interface DropdownMenuItem {
  label: string
  icon?: ReactElement
  type?: DropdownMenuItemType
  action?: () => void
}

interface Props extends DropdownMenuItem {
  isActive: boolean
}

export const DropdownMenuItem: FC<Props> = ({
  isActive,
  label,
  icon,
  type = 'default',
  action,
}) => {
  const handleItemClick = () => action?.()

  return (
    <div
      onClick={handleItemClick}
      className={classNames(
        'flex items-center',
        'py-1 pl-1 pr-12 rounded',

        matchUnionToString(type, {
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
      {icon !== undefined ? (
        <div className="mr-2">
          <Heroicon icon={icon} />
        </div>
      ) : null}

      <div className="text-sm font-semibold">{label}</div>
    </div>
  )
}

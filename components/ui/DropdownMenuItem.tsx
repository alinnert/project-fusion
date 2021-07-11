import { ArrowSmRightIcon } from '@heroicons/react/solid'
import classNames from 'classnames'
import React, { FC, ReactElement, useMemo } from 'react'
import { matchBool } from '../../tools/match'
import { Heroicon } from './Heroicon'

interface Props {
  isActive: boolean
  label: string
  icon?: ReactElement
  action?: () => void
}

export const DropdownMenuItem: FC<Props> = ({
  isActive,
  label,
  icon,
  action,
}) => {
  const replacedLabel = useMemo(() => {
    return label.includes('->') ? label.split('->') : label
  }, [label])

  const handleItemClick = () => action?.()

  return (
    <div
      onClick={handleItemClick}
      className={classNames(
        'flex items-center',
        'py-2 pl-2 pr-12 rounded',
        matchBool(
          isActive,
          'bg-gradient-brand text-white',
          'text-neutral-700',
        ),
        'active:hover:bg-brand-700',
      )}
    >
      {icon !== undefined ? (
        <div className="mr-3">
          <Heroicon icon={icon} />
        </div>
      ) : null}

      <div className="text-sm font-semibold">
        {Array.isArray(replacedLabel) ? (
          <div className="flex">
            {replacedLabel[0]}
            <div className="mx-1">
              <Heroicon icon={<ArrowSmRightIcon />} />
            </div>
            {replacedLabel[1]}
          </div>
        ) : (
          replacedLabel
        )}
      </div>
    </div>
  )
}

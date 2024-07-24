import { CheckIcon } from '@heroicons/react/20/solid'
import classNames from 'classnames'
import React, { FC } from 'react'
import { mapBooleanToString } from '../../../utils/map'
import { Heroicon } from '../Heroicon'
import { SelectItem } from './Select'

interface Props {
  item: SelectItem
  selected: boolean
  active: boolean
  isSelected: (selected: boolean, value: string) => boolean
}

export const SelectListItem: FC<Props> = ({
  item,
  selected,
  active,
  isSelected,
}) => {
  return (
    <div
      className={classNames(
        'flex items-center',
        'px-2 py-1',
        'rounded',
        mapBooleanToString(active, 'bg-gradient-brand'),
        mapBooleanToString(active, 'text-white'),
      )}
    >
      <div className="flex-0 flex w-8 justify-center">
        {isSelected(selected, item.value) ? (
          <Heroicon
            icon={
              <CheckIcon className={active ? 'text-white' : 'text-brand-700'} />
            }
            iconType="mini"
          />
        ) : null}
      </div>

      <div
        className={classNames(
          'flex-1',
          mapBooleanToString(
            isSelected(selected, item.value),
            classNames(
              'font-semibold',
              mapBooleanToString(active, 'text-white', 'text-brand-700'),
            ),
          ),
        )}
      >
        {item.label}
      </div>
    </div>
  )
}

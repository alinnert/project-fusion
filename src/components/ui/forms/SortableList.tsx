import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/20/solid'
import { EntityId } from '@reduxjs/toolkit'
import classNames from 'classnames'
import React, { FC, ReactElement, ReactNode } from 'react'
import { mapBooleanToString } from '../../../utils/map'
import { Separator } from '../Separator'
import { Button } from './Button'

export type SwapDirection = 'up' | 'down'

interface Props {
  children: (id: EntityId) => ReactNode
  ids: Array<EntityId>
  selectedId: EntityId | null
  additionalButtons?: ReactElement
  onSwap: (id: EntityId, direction: SwapDirection) => void
  onSelectedIdChange: (id: EntityId) => void
}

export const SortableList: FC<Props> = ({
  ids,
  selectedId,
  onSelectedIdChange,
  onSwap,
  additionalButtons,
  children,
}) => {
  function handleSwap(direction: SwapDirection) {
    return () => {
      if (selectedId === null) return
      onSwap(selectedId, direction)
    }
  }

  return (
    <>
      <div className="flex items-center gap-x-2 mb-4">
        <Button
          icon={<ArrowUpIcon />}
          onClick={handleSwap('down')}
          disabled={selectedId === null || selectedId === ids[0]}
        />

        <Button
          icon={<ArrowDownIcon />}
          onClick={handleSwap('up')}
          disabled={selectedId === null || selectedId === ids[ids.length - 1]}
        />

        {additionalButtons !== undefined ? (
          <>
            <Separator />
            {additionalButtons}
          </>
        ) : null}
      </div>

      <div
        className={classNames(
          'flex flex-col gap-y-1',
          'p-1 rounded-md',
          'max-h-[50vh] overflow-y-auto',
          'border border-neutral-300',
        )}
      >
        {ids.map((id) => (
          <div
            key={id}
            onClick={() => onSelectedIdChange(id)}
            className={classNames(
              'px-3 py-1',
              'rounded',
              mapBooleanToString(
                selectedId === id,
                'bg-gradient-brand text-white',
                'hover:bg-neutral-200 active:bg-neutral-300',
              ),
            )}
          >
            {children(id)}
          </div>
        ))}
      </div>
    </>
  )
}

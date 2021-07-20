import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/solid'
import classNames from 'classnames'
import React, { FC, ReactElement, ReactNode } from 'react'
import { matchBool } from '../../tools/match'
import { Button } from './Button'
import { Separator } from './HeaderSeparator'

export type SwapDirection = 'up' | 'down'

interface Props {
  children: (id: string) => ReactNode
  ids: Array<string>
  selectedId: string | null
  additionalButtons?: ReactElement
  onSwap: (id: string, direction: SwapDirection) => void
  onSelectedIdChange: (id: string) => void
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
    <div className="">
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

      <div className="flex flex-col gap-y-1">
        {ids.map((id) => (
          <div
            key={id}
            onClick={() => onSelectedIdChange(id)}
            className={classNames(
              'p-2',
              'rounded',
              matchBool(
                selectedId === id,
                'bg-gradient-brand text-white',
                'hover:bg-neutral-200',
              ),
            )}
          >
            {children(id)}
          </div>
        ))}
      </div>
    </div>
  )
}

import classNames from 'classnames'
import React, { FC, useMemo } from 'react'
import { mapUnionToString } from '../../utils/map'

export type TextDividerColor = 'neutral' | 'brand'

export type TextDividerSize = 'small' | 'normal'

type Props = {
  label: string
  color?: TextDividerColor
  className?: string
}

export const TextDivider: FC<Props> = ({
  label,
  color = 'neutral',
  className,
}) => {
  const lineClasses = useMemo(() => classNames('h-px bg-black/20 w-1'), [])

  return (
    <div className={classNames('flex items-center gap-x-1', className)}>
      <div className={classNames(lineClasses)} />
      <div
        className={classNames(
          'text-md font-semibold tracking-wide',
          mapUnionToString(color, {
            neutral: 'text-neutral-600',
            brand: 'text-brand-600',
          }),
        )}
      >
        {label}
      </div>
      <div className={classNames('flex-1', lineClasses)} />
    </div>
  )
}

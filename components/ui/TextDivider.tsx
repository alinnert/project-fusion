import classNames from 'classnames'
import { FC, useMemo } from 'react'
import { matchUnionToString } from '../../utils/match'

export type TextDividerColor = 'neutral' | 'brand'

export type TextDividerSize = 'small' | 'normal'

interface Props {
  label: string
  size?: TextDividerSize
  color?: TextDividerColor
  className?: string
}

export const TextDivider: FC<Props> = ({
  label,
  size = 'normal',
  color = 'neutral',
  className,
}) => {
  const lineClasses = useMemo(() => {
    return classNames(
      'h-px bg-black/20',
      matchUnionToString(size, {
        normal: 'w-4',
        small: 'w-1',
      }),
    )
  }, [size])

  return (
    <div className={classNames('flex items-center gap-x-1', className)}>
      <div className={classNames(lineClasses)} />
      <div
        className={classNames(
          matchUnionToString(size, {
            normal: 'text-md',
            small: 'text-sm',
          }),
          'font-semibold tracking-wide',
          matchUnionToString(color, {
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

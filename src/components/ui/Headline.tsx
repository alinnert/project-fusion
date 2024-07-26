import classNames from 'classnames'
import React, { FC, PropsWithChildren } from 'react'
import { mapBooleanToString } from '../../utils/map'

type Props = {
  dimmed?: boolean
  center?: boolean
  onClick?: () => void
}

export const Headline: FC<PropsWithChildren<Props>> = ({
  children,
  dimmed = false,
  center = false,
  onClick = () => {},
}) => {
  return (
    <div
      className={classNames(
        'grid items-center gap-x-2',
        mapBooleanToString(
          center,
          'grid-cols-[1fr,auto,1fr]',
          'grid-cols-[auto,1fr]',
        ),
        'mb-4 not-first:mt-12',
      )}
      onClick={onClick}
    >
      {center ? <div className="h-px bg-neutral-300"></div> : null}
      <div
        className={classNames(
          'flex items-center gap-1',
          'text-lg',
          mapBooleanToString(
            dimmed,
            'text-neutral-500',
            'font-semibold text-brand-700',
          ),
        )}
      >
        {children}
      </div>
      <div className="h-px bg-neutral-300"></div>
    </div>
  )
}

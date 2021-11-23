import classNames from 'classnames'
import React, { FC, PropsWithChildren } from 'react'
import { mapBooleanToString } from '../../utils/map'

interface Props {
  dimmed?: boolean
  center?: boolean
}

export const Headline: FC<PropsWithChildren<Props>> = ({
  children,
  dimmed = false,
  center = false,
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
        'not-first:mt-12 mb-4',
      )}
    >
      {center ? <div className="bg-neutral-300 h-px"></div> : null}
      <div
        className={classNames(
          'text-lg',
          mapBooleanToString(
            dimmed,
            'text-neutral-500',
            'text-brand-700 font-semibold',
          ),
        )}
      >
        {children}
      </div>
      <div className="bg-neutral-300 h-px"></div>
    </div>
  )
}

import classNames from 'classnames'
import React, { FC, PropsWithChildren } from 'react'

export const LeftPanel: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div
      className={classNames(
        'row-start-2 col-start-1 overflow-hidden',
        'border-r border-neutral-200',
        'bg-neutral-50',
      )}
    >
      {children}
    </div>
  )
}

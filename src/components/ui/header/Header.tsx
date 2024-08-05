import classNames from 'classnames'
import React, { FC, ReactNode } from 'react'

type Props = {
  left?: ReactNode
  center?: ReactNode
  right?: ReactNode
}

export const Header: FC<Props> = ({ left, center, right }) => {
  return (
    <div className="drag bg-brand-700 text-white">
      <div
        className={classNames('header', 'grid grid-cols-[1fr,auto,1fr]', 'p-2')}
      >
        <div className="flex items-center">{left}</div>
        <div className="flex items-center">{center}</div>
        <div className="flex items-center justify-self-end">{right}</div>
      </div>
    </div>
  )
}

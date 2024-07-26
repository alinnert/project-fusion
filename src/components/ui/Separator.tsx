import classNames from 'classnames'
import React, { FC } from 'react'
import { defaultMatch, mapStringToString } from '../../utils/map'

type Props = {
  type?: 'default' | 'header'
}

export const Separator: FC<Props> = ({ type = 'default' }) => {
  return (
    <div
      className={classNames(
        'h-4 w-px',
        mapStringToString(type, {
          default: 'mx-1 bg-neutral-300',
          header: 'mx-2 bg-brand-500',
          [defaultMatch]: '',
        }),
      )}
    />
  )
}

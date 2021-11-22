import classNames from 'classnames'
import React, { FC } from 'react'
import { defaultMatch, mapStringToString } from '../../../utils/map'

interface Props {
  type?: 'default' | 'header'
}

export const Separator: FC<Props> = ({ type = 'default' }) => {
  return (
    <div
      className={classNames(
        'w-px h-4',
        mapStringToString(type, {
          default: 'bg-neutral-300 mx-1',
          header: 'bg-brand-500 mx-2',
          [defaultMatch]: '',
        }),
      )}
    />
  )
}

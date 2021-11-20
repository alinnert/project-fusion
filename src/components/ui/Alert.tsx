import { ExclamationIcon } from '@heroicons/react/solid'
import classNames from 'classnames'
import React, { FC } from 'react'
import colors from 'tailwindcss/colors'
import { matchUnionToString } from '../../utils/match'
import { Heroicon } from './Heroicon'

interface Props {
  type?: 'warn'
}

export const Alert: FC<Props> = ({ type = 'warn', children }) => {
  return (
    <div
      className={classNames(
        'flex items-center gap-x-4',
        'text-left',
        'my-8 p-4',
        'rounded-md',
        matchUnionToString(type, {
          warn: classNames(
            'text-yellow-900',
            'bg-yellow-50 border border-yellow-400',
          ),
        }),
      )}
    >
      {type === 'warn' ? (
        <Heroicon
          icon={<ExclamationIcon />}
          scale={2}
          color={colors.yellow[700]}
        />
      ) : null}
      {children}
    </div>
  )
}

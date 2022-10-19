import { ExclamationTriangleIcon } from '@heroicons/react/20/solid'
import classNames from 'classnames'
import React, { FC, PropsWithChildren } from 'react'
import colors from 'tailwindcss/colors'
import { mapUnionToString } from '../../utils/map'
import { Heroicon } from './Heroicon'

interface Props {
  type?: 'warn'
}

export const Alert: FC<PropsWithChildren<Props>> = ({
  type = 'warn',
  children,
}) => {
  return (
    <div
      className={classNames(
        'flex items-center gap-x-4',
        'text-left',
        'p-4',
        'rounded-md',
        mapUnionToString(type, {
          warn: classNames(
            'text-yellow-900',
            'bg-yellow-50 border border-yellow-400',
          ),
        }),
      )}
    >
      {type === 'warn' ? (
        <Heroicon
          icon={<ExclamationTriangleIcon />}
          scale={2}
          color={colors.yellow[700]}
        />
      ) : null}
      {children}
    </div>
  )
}

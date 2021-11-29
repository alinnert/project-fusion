import classNames from 'classnames'
import React, { FC, PropsWithChildren, ReactElement } from 'react'
import { Heroicon } from './Heroicon'

interface Props {
  title?: string
  icon?: ReactElement
  image?: {
    src: string
    alt: string
    width?: string
    height?: string
  }
}

export const EmptyText: FC<PropsWithChildren<Props>> = ({
  children,
  title,
  icon,
  image,
}) => {
  return (
    <div className="h-full grid items-center justify-center px-12 py-4 overflow-y-auto">
      <div className="text-center">
        {image !== undefined ? (
          <div className="flex justify-center mb-8">
            <img {...image} />
          </div>
        ) : null}

        {icon !== undefined ? (
          <div className="flex justify-center text-brand-200 mb-8">
            <Heroicon icon={icon} scale={4} />
          </div>
        ) : null}

        {title !== undefined ? (
          <div className="text-2xl font-semibold mb-4 text-neutral-700">
            {title}
          </div>
        ) : null}

        <div
          className={classNames(
            'text-lg text-gray-800 max-w-lg',
            'flex flex-col gap-y-4',
          )}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

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
    <div className="grid h-full items-center justify-center overflow-y-auto px-12 py-4">
      <div className="text-center">
        {image !== undefined ? (
          <div className="mb-8 flex justify-center">
            <img {...image} />
          </div>
        ) : null}

        {icon !== undefined ? (
          <div className="mb-8 flex justify-center text-brand-200">
            <Heroicon icon={icon} scale={4} />
          </div>
        ) : null}

        {title !== undefined ? (
          <div className="mb-4 text-2xl font-semibold text-neutral-700">
            {title}
          </div>
        ) : null}

        <div
          className={classNames(
            'max-w-lg text-lg text-gray-800',
            'flex flex-col gap-y-4',
          )}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

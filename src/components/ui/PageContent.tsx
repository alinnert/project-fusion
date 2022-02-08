import classNames from 'classnames'
import React, { FC, PropsWithChildren, ReactElement } from 'react'
import { mapBooleanToString } from '../../utils/map'
import { Heroicon } from './Heroicon'

interface Props {
  title?: string
  icon?: ReactElement
  iconColor?: string
  iconClassName?: string
  iconType?: 'solid' | 'outline'
  image?: {
    src: string
    alt: string
    width?: string
    height?: string
  }
  centered?: boolean
}

export const PageContent: FC<PropsWithChildren<Props>> = ({
  children,
  title,
  icon,
  iconColor,
  iconClassName,
  iconType = 'solid',
  image,
  centered = false,
}) => {
  return (
    <div className="px-8 h-full overflow-y-auto">
      <div
        className={classNames(
          'py-8',
          mapBooleanToString(
            centered,
            'w-[600px] max-w-full mx-auto',
            'w-full',
          ),
        )}
      >
        {image !== undefined ? (
          <div className="mb-4">
            <img {...image} />
          </div>
        ) : null}

        {title !== undefined ? (
          <div className="text-lg font-semibold mb-4 flex items-center">
            {icon !== undefined ? (
              <div className={classNames('flex-0 mr-2', iconClassName)}>
                <Heroicon
                  icon={icon}
                  color={iconColor}
                  scale={1}
                  iconType={iconType}
                />
              </div>
            ) : null}

            <h2 className="flex-1 select-text">{title}</h2>
          </div>
        ) : null}

        {children}
      </div>
    </div>
  )
}

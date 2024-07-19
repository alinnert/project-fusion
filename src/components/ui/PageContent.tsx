import classNames from 'classnames'
import React, { FC, PropsWithChildren, ReactElement } from 'react'
import { Heroicon } from './Heroicon'

interface Props {
  title?: string
  titleButtons?: ReactElement
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
  dimmed?: boolean
}

export const PageContent: FC<PropsWithChildren<Props>> = ({
  children,
  title,
  titleButtons,
  icon,
  iconColor,
  iconClassName,
  iconType = 'solid',
  image,
  centered = false,
  dimmed = false,
}) => {
  return (
    <div
      className={classNames('px-8 overflow-y-auto', {
        'bg-neutral-100 mr-2 mb-2 rounded-xl h-auto': dimmed,
      })}
    >
      <div
        className={classNames('py-8', {
          'w-[600px] max-w-full mx-auto': centered,
          'w-full': !centered,
        })}
      >
        {image !== undefined ? (
          <div className="mb-4">
            <img {...image} />
          </div>
        ) : null}

        {title !== undefined ? (
          <div className="mb-4 flex items-center">
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

            <h2 className="flex-1 select-text text-lg font-semibold">
              {title}
            </h2>

            {titleButtons !== undefined ? <div>{titleButtons}</div> : null}
          </div>
        ) : null}

        {children}
      </div>
    </div>
  )
}

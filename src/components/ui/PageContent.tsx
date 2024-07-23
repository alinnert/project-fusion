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
  centered = false,
  dimmed = false,
}) => {
  return (
    <div
      className={classNames('h-full overflow-hidden', {
        'bg-neutral-100 m-2 rounded-xl': dimmed,
      })}
    >
      <div
        className={classNames(
          'grid grid-rows-[auto,1fr] overflow-hidden',
          'h-full',
          {
            'w-[600px] max-w-full mx-auto': centered,
            'w-full': !centered,
          },
        )}
      >
        {title !== undefined ? (
          <div className="px-8 py-4 flex items-center row-start-1 row-end-2">
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

        <div className="row-start-2 row-end-3 overflow-y-auto px-8 pb-8">{children}</div>
      </div>
    </div>
  )
}

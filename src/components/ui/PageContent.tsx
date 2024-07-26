import classNames from 'classnames'
import React, { FC, PropsWithChildren, ReactElement } from 'react'
import { Heroicon } from './Heroicon'

type Props = {
  title?: string
  titleButtons?: ReactElement
  icon?: ReactElement
  iconColor?: string
  iconClassName?: string
  iconType?: 'big' | 'mini' | 'micro'
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
  iconType = 'big',
  centered = false,
  dimmed = false,
}) => {
  return (
    <div
      className={classNames('h-auto overflow-hidden', {
        'm-2 rounded-xl bg-neutral-100': dimmed,
      })}
    >
      <div
        className={classNames(
          'grid grid-rows-[auto,1fr] overflow-hidden',
          'h-full',
          {
            'mx-auto w-[600px] max-w-full': centered,
            'w-full': !centered,
          },
        )}
      >
        {title !== undefined ? (
          <div className="row-start-1 row-end-2 flex items-center px-8 py-4">
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

        <div className="row-start-2 row-end-3 overflow-y-auto px-8 pb-8">
          {children}
        </div>
      </div>
    </div>
  )
}

import classNames from 'classnames'
import React, { FC, MouseEvent, PropsWithChildren, ReactElement } from 'react'
import { Heroicon } from './Heroicon'

interface Props {
  icon?: ReactElement | null
  iconColor?: string
  current?: boolean
  onClick?: (event: MouseEvent<HTMLDivElement>) => void
}

export const LinkListItem: FC<PropsWithChildren<Props>> = ({
  children,
  icon,
  iconColor = 'black',
  current = false,
  onClick,
}) => {
  function handleClick(event: MouseEvent<HTMLDivElement>) {
    onClick?.(event)
  }

  return (
    <div
      style={{ backgroundColor: current ? iconColor : undefined }}
      className={classNames(
        'flex items-center',
        'rounded-md p-1',
        'hover:bg-neutral-200 active:bg-neutral-300',
        'current:text-white',
        { current },
      )}
      onClick={handleClick}
    >
      {icon !== undefined ? (
        <div
          className={classNames('flex-0 self-center', 'mr-2 p-1', 'rounded')}
          style={{ color: current ? 'rgba(255, 255, 255, 0.95)' : iconColor }}
        >
          {icon !== null ? (
            <Heroicon icon={icon} iconType="mini" />
          ) : (
            <div className="h-[20px] w-[20px]"></div>
          )}
        </div>
      ) : (
        <div className="py-1">
          <div className="h-[20px] w-1"></div>
        </div>
      )}

      <div className="flex-1">{children}</div>
    </div>
  )
}

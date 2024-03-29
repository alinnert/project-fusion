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
        'p-1 rounded-md',
        'hover:bg-neutral-200 active:bg-neutral-300',
        'current:text-white',
        { current },
      )}
      onClick={handleClick}
    >
      {icon !== undefined ? (
        <div
          className={classNames('flex-0 self-center', 'p-1 mr-4', 'rounded')}
          style={{ color: current ? 'rgba(255, 255, 255, 0.95)' : iconColor }}
        >
          {icon !== null ? (
            <Heroicon icon={icon} />
          ) : (
            <div className="w-[20px] h-[20px]"></div>
          )}
        </div>
      ) : (
        <div className="py-1">
          <div className="w-1 h-[20px]"></div>
        </div>
      )}

      <div className="flex-1">{children}</div>
    </div>
  )
}

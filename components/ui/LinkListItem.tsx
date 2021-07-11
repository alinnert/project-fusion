import classNames from 'classnames'
import { FC, MouseEvent, PropsWithChildren, ReactElement, useMemo } from 'react'
import { matchBool } from '../../tools/match'
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
      className={classNames(
        'flex items-center',
        'p-1 rounded-md',
        'hover:bg-neutral-200 active:bg-neutral-300 current:bg-gradient-brand',
        'font-semibold current:text-white',
        { current },
      )}
      onClick={handleClick}
    >
      {icon !== undefined ? (
        <div
          className={classNames(
            'flex-0 self-center',
            'p-1 mr-4',
            'rounded',
            matchBool(current && icon !== null, 'bg-white text-black'),
          )}
          style={{ color: iconColor }}
        >
          {icon !== null ? (
            <Heroicon icon={icon} />
          ) : (
            <div className="w-[20px] h-[20px]"></div>
          )}
        </div>
      ) : null}
      <div className="flex-1">{children}</div>
    </div>
  )
}

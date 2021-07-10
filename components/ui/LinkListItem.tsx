import classnames from 'classnames'
import { FC, MouseEvent, PropsWithChildren, useMemo } from 'react'

interface Props {
  current?: boolean
  onClick?: (event: MouseEvent<HTMLDivElement>) => void
}

export const LinkListItem: FC<PropsWithChildren<Props>> = ({
  children,
  current,
  onClick,
}) => {
  const listItemClassNames = useMemo(
    () =>
      classnames(
        'px-4 py-2 rounded',
        'hover:bg-neutral-200 active:bg-neutral-300 current:bg-gradient-brand',
        'font-semibold current:text-white',
        { current },
      ),
    [current],
  )

  function handleClick(event: MouseEvent<HTMLDivElement>) {
    onClick?.(event)
  }

  return (
    <div className={listItemClassNames} onClick={handleClick}>
      {children}
    </div>
  )
}

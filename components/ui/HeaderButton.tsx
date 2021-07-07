import {
  ButtonHTMLAttributes,
  FC,
  PropsWithChildren,
  ReactElement,
} from 'react'
import { Heroicon } from './Heroicon'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactElement
  current?: boolean
}

export const HeaderButton: FC<PropsWithChildren<Props>> = ({
  children,
  icon,
  current = false,
  ...buttonProps
}) => {
  return (
    <button
      {...buttonProps}
      className={`
        flex items-center
        px-2 py-1 rounded
        ${current ? 'text-brand-800' : 'text-brand-200 hover:text-white'}
        ${current ? 'bg-white' : 'hover:bg-brand-700 active:bg-brand-800'}
      `}
    >
      {icon !== undefined ? (
        <div className="mr-1">{<Heroicon icon={icon} />}</div>
      ) : null}
      <div className="text-sm font-semibold">{children}</div>
    </button>
  )
}

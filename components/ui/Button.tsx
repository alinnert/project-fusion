import {
  ButtonHTMLAttributes,
  FC,
  PropsWithChildren,
  ReactElement,
} from 'react'
import { Heroicon } from './Heroicon'

export type ButtonType = 'default' | 'primary' | 'delete'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactElement
  buttonType?: ButtonType
  flat?: boolean
}

export const Button: FC<PropsWithChildren<Props>> = ({
  children,
  icon,
  buttonType = 'default',
  flat = true,
  ...buttonProps
}) => {
  function getButtonClasses(type: Props['buttonType']): string {
    const fontBaseClasses = 'text-sm font-semibold'
    const boxBaseClasses = 'flex items-center px-3 py-1 rounded shadow'
    const darkTextClasses =
      'text-neutral-700 hover:text-neutral-900 active:text-neutral-900'
    const lightTextClasses = 'text-white'
    const shadowClasses = flat ? 'shadow' : ''

    switch (type) {
      default:
      case 'default':
        return `
          ${fontBaseClasses}
          ${boxBaseClasses}
          ${darkTextClasses}
          ${shadowClasses}
          bg-neutral-50 hover:bg-neutral-100 active:bg-neutral-300
        `
      case 'primary':
        return `
          ${fontBaseClasses}
          ${boxBaseClasses}
          ${lightTextClasses}
          ${shadowClasses}
          bg-brand-600 hover:bg-brand-700 active:bg-brand-800
        `
      case 'delete':
        return `
          ${fontBaseClasses}
          ${boxBaseClasses}
          ${lightTextClasses}
          ${shadowClasses}
          bg-danger-700 hover:bg-danger-800 active:bg-danger-900
        `
    }
  }

  return (
    <button className={getButtonClasses(buttonType)} {...buttonProps}>
      {icon !== undefined ? (
        <div className="mr-2">
          <Heroicon icon={icon} />
        </div>
      ) : null}
      {children}
    </button>
  )
}

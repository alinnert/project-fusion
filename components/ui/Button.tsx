import {
  ButtonHTMLAttributes,
  Children,
  FC,
  PropsWithChildren,
  ReactElement,
  useMemo,
} from 'react'
import { Heroicon } from './Heroicon'

export type ButtonType =
  | 'default'
  | 'primary'
  | 'delete'
  | 'flat'
  | 'header'
  | 'header-current'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactElement
  buttonType?: ButtonType
}

export const Button: FC<PropsWithChildren<Props>> = ({
  children,
  icon,
  buttonType = 'default',
  ...buttonProps
}) => {
  const hasChildren = useMemo(() => Children.count(children) > 0, [children])

  const buttonClasses = useMemo<string>(() => {
    const fontBaseClasses = 'text-sm font-semibold'
    const boxBaseClasses = `
      flex items-center
      ${hasChildren ? 'px-2' : 'px-1'}
      py-1 rounded
    `
    const darkTextClasses =
      'text-neutral-700 hover:text-neutral-900 active:text-neutral-900'
    const lightTextClasses = 'text-white'
    const shadowClasses = 'shadow'

    switch (buttonType) {
      default:
      case 'default':
        return [
          fontBaseClasses,
          boxBaseClasses,
          darkTextClasses,
          shadowClasses,
          'bg-neutral-50 hover:bg-neutral-100 active:bg-neutral-300',
        ].join(' ')

      case 'primary':
        return [
          boxBaseClasses,
          fontBaseClasses,
          lightTextClasses,
          shadowClasses,
          'bg-brand-600 hover:bg-brand-700 active:bg-brand-800',
        ].join(' ')

      case 'delete':
        return [
          boxBaseClasses,
          fontBaseClasses,
          lightTextClasses,
          shadowClasses,
          'bg-danger-700 hover:bg-danger-800 active:bg-danger-900',
        ].join(' ')
      
      case 'flat':
        return [
          boxBaseClasses,
          fontBaseClasses,
          darkTextClasses,
          'hover:bg-black/10 active:bg-black/20'
        ].join(' ')

      case 'header':
        return [
          boxBaseClasses,
          fontBaseClasses,
          'hover:bg-brand-700 active:bg-brand-800',
          'text-brand-200 hover:text-white',
        ].join(' ')

      case 'header-current':
        return [
          fontBaseClasses,
          boxBaseClasses,
          'bg-white',
          'text-brand-800',
        ].join(' ')
    }
  }, [buttonType, hasChildren])

  const iconContainerClasses = useMemo(() => {
    switch (buttonType) {
      case 'flat':
      case 'default':
      case 'primary':
      case 'delete':
        return hasChildren ? 'mr-2' : ''
      case 'header':
      case 'header-current':
        return hasChildren ? 'mr-1' : ''
    }
  }, [buttonType, hasChildren])

  return (
    <button className={buttonClasses} {...buttonProps}>
      {icon !== undefined ? (
        <div className={iconContainerClasses}>
          <Heroicon icon={icon} />
        </div>
      ) : null}
      {children}
    </button>
  )
}
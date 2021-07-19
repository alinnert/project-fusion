import classNames from 'classnames'
import {
  ButtonHTMLAttributes,
  Children,
  FC,
  PropsWithChildren,
  ReactElement,
  useMemo,
} from 'react'
import { matchBool } from '../../tools/match'
import { Heroicon } from './Heroicon'

export type ButtonType =
  | 'default'
  | 'primary'
  | 'delete'
  | 'flat'
  | 'flat-open'
  | 'header'
  | 'header-open'
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
    const darkTextClasses = `
      text-neutral-700
      disabled:text-neutral-300
      hover:enabled:text-neutral-900
      active:enabled:text-neutral-900
    `
    const lightTextClasses = 'text-white'
    const shadowClasses = 'shadow'

    switch (buttonType) {
      default:
      case 'default':
        return classNames(
          fontBaseClasses,
          boxBaseClasses,
          darkTextClasses,
          shadowClasses,
          'bg-neutral-50 hover:enabled:bg-neutral-100 active:enabled:bg-neutral-300',
        )

      case 'primary':
        return classNames(
          boxBaseClasses,
          fontBaseClasses,
          lightTextClasses,
          shadowClasses,
          'bg-brand-600 hover:enabled:bg-brand-700 active:enabled:bg-brand-800',
        )

      case 'delete':
        return classNames(
          boxBaseClasses,
          fontBaseClasses,
          lightTextClasses,
          shadowClasses,
          'bg-danger-800 hover:enabled:bg-danger-700 active:enabled:bg-danger-600',
        )

      case 'flat':
        return classNames(
          boxBaseClasses,
          fontBaseClasses,
          darkTextClasses,
          'hover:enabled:bg-black/10 active:enabled:bg-black/20',
        )

      case 'flat-open':
        return classNames(
          boxBaseClasses,
          fontBaseClasses,
          darkTextClasses,
          'bg-black/20',
        )

      case 'header':
        return classNames(
          boxBaseClasses,
          fontBaseClasses,
          'hover:enabled:bg-black/20 active:enabled:bg-black/40',
          'text-white/80 hover:enabled:text-white',
        )

      case 'header-open':
        return classNames(fontBaseClasses, boxBaseClasses, 'bg-black/40')

      case 'header-current':
        return classNames(
          boxBaseClasses,
          fontBaseClasses,
          'bg-white',
          'text-brand-800',
        )
    }
  }, [buttonType, hasChildren])

  const iconContainerClasses = useMemo(() => {
    switch (buttonType) {
      default:
      case 'flat':
      case 'flat-open':
      case 'default':
      case 'primary':
      case 'delete':
        return matchBool(hasChildren, 'mr-2')

      case 'header':
      case 'header-open':
      case 'header-current':
        return matchBool(hasChildren, 'mr-1')
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

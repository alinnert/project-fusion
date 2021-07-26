import classNames from 'classnames'
import {
  ButtonHTMLAttributes,
  Children,
  FC,
  PropsWithChildren,
  ReactElement,
  useMemo,
} from 'react'
import { capitalize } from '../../utils/capitalize'
import { matchBool } from '../../utils/match'
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

interface Props
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {
  icon?: ReactElement
  buttonType?: ButtonType
  className?: string
}

export const Button: FC<PropsWithChildren<Props>> = ({
  children,
  icon,
  buttonType = 'default',
  className,
  ...buttonProps
}) => {
  const hasChildren = useMemo(() => Children.count(children) > 0, [children])

  const buttonClasses = useMemo<string>(() => {
    const fontBaseClasses = 'text-sm font-semibold'

    const boxBaseClasses = classNames(
      'flex items-center',
      matchBool(hasChildren, 'px-3', 'px-2'),
      'py-2 rounded',
    )

    const darkTextClasses = classNames(
      'text-neutral-700',
      'disabled:text-black/30',
      'hover:enabled:text-neutral-900',
      'active:enabled:text-neutral-900',
    )

    const lightTextClasses = 'text-white disabled:text-white/40'
    const shadowClasses = ''

    switch (buttonType) {
      default:
      case 'default':
        return classNames(
          fontBaseClasses,
          boxBaseClasses,
          darkTextClasses,
          shadowClasses,
          'border border-transparent',
          'bg-neutral-500/20',
          'hover:enabled:bg-neutral-500/30',
          'active:enabled:bg-neutral-500/40',
        )

      case 'primary':
        return classNames(
          boxBaseClasses,
          fontBaseClasses,
          lightTextClasses,
          shadowClasses,
          'border border-transparent',
          'bg-brand-700 hover:enabled:bg-brand-600 active:enabled:bg-brand-500',
        )

      case 'delete':
        return classNames(
          boxBaseClasses,
          fontBaseClasses,
          lightTextClasses,
          shadowClasses,
          'border border-transparent',
          'bg-danger-800',
          'hover:enabled:bg-danger-700 active:enabled:bg-danger-600',
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
    <div className={classNames(className)}>
      <button className={buttonClasses} {...buttonProps}>
        {icon !== undefined ? (
          <div className={iconContainerClasses}>
            <Heroicon icon={icon} />
          </div>
        ) : null}
        <div
          className={classNames(
            matchBool(icon !== undefined && hasChildren, 'mr-1'),
          )}
        >
          {typeof children === 'string' ? capitalize(children) : children}
        </div>
      </button>
    </div>
  )
}

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
import { matchBoolToString, matchUnionToString } from '../../utils/match'
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

export type ButtonSize = 'normal' | 'small'

type ExtractedButtonProps = 'onClick' | 'disabled'

interface Props
  extends Pick<ButtonHTMLAttributes<HTMLButtonElement>, ExtractedButtonProps> {
  icon?: ReactElement
  type?: ButtonType
  size?: ButtonSize
  className?: string
  buttonProps?: Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    ExtractedButtonProps
  >
}

export const Button: FC<PropsWithChildren<Props>> = ({
  children,
  icon,
  type = 'default',
  size = 'normal',
  className,
  disabled,
  onClick,
  buttonProps,
}) => {
  const hasChildren = useMemo(() => Children.count(children) > 0, [children])

  const buttonClasses = useMemo<string>(() => {
    const fontBaseClasses = 'text-sm font-semibold'

    const boxBaseClasses = classNames(
      'flex gap-x-2 items-center',
      matchBoolToString(hasChildren, 'px-2', 'px-1'),
      matchUnionToString(size, { normal: 'py-1', small: 'py-1' }),
      'rounded',
    )

    const darkTextClasses = classNames(
      'text-neutral-700',
      'disabled:text-black/30',
      'hover:enabled:text-neutral-900',
      'active:enabled:text-neutral-900',
    )

    const lightTextClasses = 'text-white disabled:text-white/40'
    const shadowClasses = ''

    switch (type) {
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
      case 'header-current':
        return classNames(
          boxBaseClasses,
          fontBaseClasses,
          'bg-white',
          'text-brand-800',
        )
    }
  }, [size, type, hasChildren])

  return (
    <button
      className={classNames(buttonClasses, className)}
      disabled={disabled}
      onClick={onClick}
      {...buttonProps}
    >
      {icon !== undefined ? <Heroicon icon={icon} /> : null}

      {hasChildren ? (
        <div
          className={classNames(
            'text-left leading-tight',
            matchBoolToString(icon !== undefined && hasChildren, 'mr-1'),
          )}
        >
          {typeof children === 'string' ? capitalize(children) : children}
        </div>
      ) : null}
    </button>
  )
}

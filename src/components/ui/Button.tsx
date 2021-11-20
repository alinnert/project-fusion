import classNames from 'classnames'
import React, {
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

export type ButtonSize = 'big' | 'normal' | 'small'

type ExtractedButtonProps = 'onClick' | 'disabled'

interface Props
  extends Pick<ButtonHTMLAttributes<HTMLButtonElement>, ExtractedButtonProps> {
  icon?: ReactElement
  rightIcon?: ReactElement
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
  rightIcon,
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
      matchBoolToString(
        hasChildren,
        matchUnionToString(size, {
          big: 'px-3',
          normal: 'px-2',
          small: 'px-2',
        }),
        'px-1',
      ),
      matchUnionToString(size, {
        big: 'py-2',
        normal: 'py-1',
        small: 'py-1',
      }),
      'rounded',
    )

    const darkTextClasses = classNames(
      'text-neutral-600',
      'disabled:text-neutral-600/40',
      'hover:enabled:text-neutral-900',
      'active:enabled:text-neutral-900',
    )

    const dangerTextClasses = classNames(
      'text-danger-700',
      'disabled:text-danger-700/30',
      'hover:text-white',
      'active:text-white',
    )

    const primaryTextClasses = classNames(
      'text-brand-700',
      'disabled:text-brand-700/40',
      'hover:enabled:text-white',
      'active:enabled:text-white',
    )

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
          'bg-transparent',
          'hover:enabled:bg-neutral-300',
          'active:enabled:bg-neutral-400',
        )

      case 'primary':
        return classNames(
          boxBaseClasses,
          fontBaseClasses,
          primaryTextClasses,
          shadowClasses,
          'border border-transparent',
          'hover:enabled:bg-gradient-brand',
          'active:enabled:bg-gradient-brand-active',
        )

      case 'delete':
        return classNames(
          boxBaseClasses,
          fontBaseClasses,
          dangerTextClasses,
          shadowClasses,
          'border border-transparent',
          'hover:enabled:bg-gradient-danger',
          'active:enabled:bg-gradient-danger-active',
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
          'text-white/80 disabled:text-white/40 hover:enabled:text-white',
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

      {rightIcon !== undefined && hasChildren ? (
        <Heroicon icon={rightIcon} />
      ) : null}
    </button>
  )
}

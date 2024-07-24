import classNames from 'classnames'
import React, {
  ButtonHTMLAttributes,
  Children,
  FC,
  PropsWithChildren,
  ReactElement,
  useMemo,
} from 'react'
import { capitalize } from '../../../utils/capitalize'
import { mapBooleanToString, mapUnionToString } from '../../../utils/map'
import { Heroicon } from '../Heroicon'

export type ButtonType =
  | 'default'
  | 'default-open'
  | 'primary'
  | 'primary-flat'
  | 'delete'
  | 'delete-flat'
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
  iconType?: 'big' | 'mini' | 'micro'
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
  iconType = 'micro',
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
    const fontBaseClasses = 'text-base leading-none'

    const boxBaseClasses = classNames(
      'flex gap-x-2 items-center',
      'rounded',
      mapBooleanToString(
        hasChildren,
        mapUnionToString(size, {
          big: 'px-3',
          normal: 'px-3',
          small: 'px-2',
        }),
        'px-1',
      ),
      mapUnionToString(size, {
        big: 'py-2',
        normal: 'py-2',
        small: 'py-1',
      }),
    )

    const darkTextClasses = classNames(
      'text-neutral-800',
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

    const shadowClasses = 'shadow'

    switch (type) {
      default:
      case 'default':
        return classNames(
          fontBaseClasses,
          boxBaseClasses,
          darkTextClasses,
          shadowClasses,
          'bg-white',
          'border border-neutral-300',
          'hover:enabled:bg-neutral-100 hover:enabled:border-neutral-400',
          'active:enabled:bg-neutral-200 active:enabled:border-neutral-500',
        )

      case 'default-open':
        return classNames(
          fontBaseClasses,
          boxBaseClasses,
          shadowClasses,
          'border border-transparent',
          'bg-neutral-600',
          'text-white',
        )

      case 'primary':
        return classNames(
          boxBaseClasses,
          fontBaseClasses,
          primaryTextClasses,
          shadowClasses,
          'bg-white',
          'border border-brand-300',
          'hover:enabled:bg-gradient-brand hover:enabled:border-brand-800',
          'active:enabled:bg-gradient-brand-active',
          'active:enabled:border-brand-900',
        )

      case 'primary-flat':
        return classNames(
          boxBaseClasses,
          fontBaseClasses,
          primaryTextClasses,
          'bg-white',
          'border border-brand-300',
          'hover:enabled:bg-gradient-brand hover:enabled:border-brand-800',
          'active:enabled:bg-gradient-brand-active',
          'active:enabled:border-brand-900',
        )

      case 'delete':
        return classNames(
          boxBaseClasses,
          fontBaseClasses,
          dangerTextClasses,
          shadowClasses,
          'bg-white',
          'border border-danger-300',
          'hover:enabled:bg-gradient-danger hover:enabled:border-danger-800',
          'active:enabled:bg-gradient-danger-active',
          'active:enabled:border-danger-900',
        )

      case 'delete-flat':
        return classNames(
          boxBaseClasses,
          fontBaseClasses,
          dangerTextClasses,
          'bg-white',
          'border border-danger-300',
          'hover:enabled:bg-gradient-danger hover:enabled:border-danger-800',
          'active:enabled:bg-gradient-danger-active',
          'active:enabled:border-danger-900',
        )

      case 'flat':
        return classNames(
          boxBaseClasses,
          fontBaseClasses,
          darkTextClasses,
          'bg-white',
          'hover:enabled:bg-neutral-100 active:enabled:bg-neutral-200',
          'border border-neutral-300',
          'hover:enabled:border-neutral-400 active:enabled:border-neutral-500',
        )

      case 'flat-open':
        return classNames(
          boxBaseClasses,
          fontBaseClasses,
          darkTextClasses,
          'bg-neutral-300',
          'border border-neutral-400',
        )

      case 'header':
        return classNames(
          boxBaseClasses,
          fontBaseClasses,
          'font-semibold',
          'hover:enabled:bg-black/20 active:enabled:bg-black/40',
          'text-white/80 disabled:text-white/40 hover:enabled:text-white',
        )

      case 'header-open':
      case 'header-current':
        return classNames(
          boxBaseClasses,
          fontBaseClasses,
          'bg-white',
          'font-semibold',
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
      {icon !== undefined ? <Heroicon icon={icon} iconType={iconType} /> : null}

      {hasChildren ? (
        <div
          className={classNames(
            'text-left leading-tight',
            mapBooleanToString(icon !== undefined && hasChildren, 'mr-1'),
          )}
        >
          {typeof children === 'string' ? capitalize(children) : children}
        </div>
      ) : null}

      {rightIcon !== undefined && hasChildren ? (
        <Heroicon icon={rightIcon} iconType="micro" />
      ) : null}
    </button>
  )
}

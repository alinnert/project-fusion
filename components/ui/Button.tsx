import { ButtonHTMLAttributes, FC, PropsWithChildren } from 'react'

export type ButtonType = 'default' | 'primary' | 'delete'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttonType?: ButtonType
  showBorder?: boolean
}

export const Button: FC<PropsWithChildren<Props>> = ({
  children,
  buttonType = 'default',
  showBorder = true,
  ...buttonProps
}) => {
  function getButtonClasses(type: Props['buttonType']): string {
    const fontBaseClasses = 'text-sm font-semibold'
    const boxBaseClasses = 'px-3 py-1 rounded shadow-button'
    const darkTextClasses =
      'text-neutral-700 hover:text-neutral-900 active:text-neutral-900'
    const lightTextClasses = 'text-white'
    const noBorderClasses = 'border-none'

    switch (type) {
      default:
      case 'default':
        return `
          ${fontBaseClasses}
          ${boxBaseClasses}
          ${darkTextClasses}
          ${
            showBorder
              ? 'border border-neutral-400 hover:border-neutral-500'
              : noBorderClasses
          }
          bg-neutral-50 hover:bg-neutral-100 active:bg-neutral-200
        `
      case 'primary':
        return `
          ${fontBaseClasses}
          ${boxBaseClasses}
          ${lightTextClasses}
          ${
            showBorder
              ? 'border border-brand-800 hover:border-brand-900'
              : noBorderClasses
          }
          bg-brand-600 hover:bg-brand-700 active:bg-brand-800
        `
      case 'delete':
        return `
          ${fontBaseClasses}
          ${boxBaseClasses}
          ${lightTextClasses}
          ${showBorder ? 'border border-danger-900' : noBorderClasses}
          bg-danger-700 hover:bg-danger-800 active:bg-danger-900
        `
    }
  }

  return (
    <button className={getButtonClasses(buttonType)} {...buttonProps}>
      {children}
    </button>
  )
}

import { FC, InputHTMLAttributes, useState } from 'react'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  inputType?: 'default'
  showBorder?: boolean
}

export const Input: FC<Props> = ({
  inputType = 'default',
  showBorder = true,
  ...inputProps
}) => {
  function getInputClasses(): string {
    const textBaseClasses = 'text-neutral-800 text-sm'
    const boxBaseClasses = 'w-60 px-2 py-1 rounded'
    const noBorderClasses = 'border-none'
    const neutralBorderClasses = showBorder
      ? 'border border-neutral-600'
      : noBorderClasses

    switch (inputType) {
      default:
      case 'default':
        return `${textBaseClasses} ${boxBaseClasses} ${neutralBorderClasses}`
    }
  }

  return <input className={getInputClasses()} type="text" {...inputProps} />
}

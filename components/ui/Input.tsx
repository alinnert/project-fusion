import classNames from 'classnames'
import React, { ChangeEvent, FC, InputHTMLAttributes, useMemo } from 'react'
import { FormItem } from './FormItem'

interface Props
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'onChange' | 'className'
  > {
  inputType?: 'default' | 'header'
  label?: string
  className?: string
  onChange?: (value: string, event: ChangeEvent<HTMLInputElement>) => void
}

export const Input: FC<Props> = ({
  inputType = 'default',
  label,
  className,
  onChange,
  ...inputProps
}) => {
  const inputClasses = useMemo(() => {
    const boxClasses = 'w-60 p-2 rounded box-border'
    const textClasses = 'text-sm'

    switch (inputType) {
      default:
      case 'default':
        return classNames(
          boxClasses,
          textClasses,
          'w-auto',
          'border border-neutral-600',
          'text-neutral-800',
        )
      case 'header':
        return classNames(
          boxClasses,
          textClasses,
          'bg-white/40 hover:bg-white/50 focus:bg-white',
          'placeholder-white/80 hover:placeholder-white focus:placeholder-black/50',
          'text-white focus:text-black',
        )
    }
  }, [inputType])

  return (
    <FormItem label={label} className={className}>
      <input
        className={inputClasses}
        type="text"
        onChange={(event) => onChange?.(event.target.value, event)}
        {...inputProps}
      />
    </FormItem>
  )
}

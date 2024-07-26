import React, { ChangeEvent, FC, InputHTMLAttributes } from 'react'
import { FormItem } from './FormItem'

type Props = {
  label?: string
  value: boolean
  className?: string
  onChange?: (value: boolean, event: ChangeEvent<HTMLInputElement>) => void
} & Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'value' | 'onChange' | 'className'
>

export const Checkbox: FC<Props> = ({
  label,
  value,
  onChange,
  ...inputProps
}) => {
  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    onChange?.(event.currentTarget.checked, event)
  }

  return (
    <FormItem label={label} type="inline">
      <input
        type="checkbox"
        checked={value}
        onChange={handleChange}
        {...inputProps}
      />
    </FormItem>
  )
}

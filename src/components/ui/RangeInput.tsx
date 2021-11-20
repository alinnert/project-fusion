import React, { FC, InputHTMLAttributes } from 'react'
import { FormItem } from './FormItem'

interface Props {
  value: string
  label?: string
  inputProps?: InputHTMLAttributes<HTMLInputElement>
  className?: string
  onChange?: (value: string) => void
}

export const RangeInput: FC<Props> = ({
  value,
  label,
  inputProps,
  className,
  onChange,
}) => {
  return (
    <FormItem label={`${label} (${value})`} className={className}>
      <input
        type="range"
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
        {...inputProps}
      />
    </FormItem>
  )
}

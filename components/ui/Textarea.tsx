import classNames from 'classnames'
import React, { FC } from 'react'
import { FormItem } from './FormItem'

interface Props {
  value: string
  label?: string
  onChange?: (value: string) => void
}

export const Textarea: FC<Props> = ({ value, label, onChange }) => {
  return (
    <FormItem label={label}>
      <textarea
        className={classNames(
          'p-2',
          'w-full h-80 min-h-[100px] resize-y',
          'border border-neutral-600',
          'rounded',
          'font-mono',
        )}
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
      />
    </FormItem>
  )
}

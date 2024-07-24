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
          'px-2 py-1',
          'h-80 min-h-[100px] w-full resize-y',
          'border border-neutral-600',
          'rounded',
          'font-mono leading-relaxed',
        )}
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
      />
    </FormItem>
  )
}

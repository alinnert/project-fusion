import classNames from 'classnames'
import React, { ChangeEvent, FC, InputHTMLAttributes, useMemo } from 'react'
import { mapUnionToString } from '../../../utils/map'
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
    const boxClasses = classNames(
      'box-border',
      mapUnionToString(inputType, {
        default: 'w-auto px-2 py-1 rounded',
        header: 'w-60 px-2 py-[2px] rounded',
      }),
    )

    const borderClasses = classNames(
      mapUnionToString(inputType, {
        default: 'border border-neutral-600',
        header: 'border-white/60 hover:border-white/30 focus:border-white',
      }),
    )

    const backgroundClasses = classNames(
      mapUnionToString(inputType, {
        default: '',
        header: classNames(
          'bg-white/0 hover:bg-white/30 focus:bg-white',
          'bg-clip-padding',
        ),
      }),
    )

    const textClasses = classNames(
      mapUnionToString(inputType, {
        default: 'text-neutral-800',
        header: classNames(
          'text-sm font-semibold',
          'text-white focus:text-black',
          'placeholder-white/80',
          'hover:placeholder-white focus:placeholder-black/50',
        ),
      }),
    )

    return classNames(boxClasses, borderClasses, backgroundClasses, textClasses)
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

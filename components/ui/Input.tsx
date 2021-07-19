import classNames from 'classnames'
import { ChangeEvent, FC, InputHTMLAttributes, useMemo } from 'react'

interface Props
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  inputType?: 'default' | 'header'
  label?: string
  onChange?: (value: string, event: ChangeEvent<HTMLInputElement>) => void
}

export const Input: FC<Props> = ({
  inputType = 'default',
  label,
  onChange,
  ...inputProps
}) => {
  const inputClasses = useMemo(() => {
    const boxClasses = 'w-60 px-2 py-1 rounded'
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
    <div>
      <label className="flex flex-col">
        <span className="font-semibold text-sm">{label}</span>
        <input
          className={inputClasses}
          type="text"
          onChange={(event) => onChange?.(event.target.value, event)}
          {...inputProps}
        />
      </label>
    </div>
  )
}

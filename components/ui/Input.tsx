import { FC, InputHTMLAttributes, useMemo } from 'react'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  inputType?: 'default' | 'header'
}

export const Input: FC<Props> = ({ inputType = 'default', ...inputProps }) => {
  const inputClasses = useMemo(() => {
    const boxClasses = 'w-60 px-2 py-1 rounded'
    const textClasses = 'text-sm'

    switch (inputType) {
      default:
      case 'default':
        return [
          boxClasses,
          textClasses,
          'border border-neutral-600',
          'text-neutral-800',
        ].join(' ')
      case 'header':
        return [
          boxClasses,
          textClasses,
          'bg-white/40 hover:bg-white/50 focus:bg-white',
          'placeholder-white/80 hover:placeholder-white focus:placeholder-black/50',
          'text-white focus:text-black',
        ].join(' ')
    }
  }, [inputType])

  return <input className={inputClasses} type="text" {...inputProps} />
}

import classNames from 'classnames'
import React, { FC, useEffect, useRef, useState } from 'react'
import { FormItem } from './FormItem'
import { Input } from './Input'

type Props = {
  value: string
  label?: string
  onChange?: (value: string) => void
}

export const ColorInput: FC<Props> = ({ value, label, onChange }) => {
  const [color, setColor] = useState(value !== '' ? value : '#000000')

  const colorInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    onChange?.(color)
  }, [color, onChange])

  function handleColorClick() {
    colorInputRef.current?.click()
  }

  function handleHexChange(value: string): void {
    setColor(value)
  }

  return (
    <FormItem label={label}>
      <div className="grid grid-cols-[1fr,3fr] items-stretch gap-x-2">
        <div
          className={classNames('h-full', 'rounded')}
          style={{ backgroundColor: color }}
          onClick={handleColorClick}
        />

        <Input value={color} onChange={handleHexChange} />
      </div>

      <div>
        <input
          type="color"
          ref={colorInputRef}
          className="sr-only"
          value={color}
          onChange={(event) => setColor(event.target.value)}
        />
      </div>
    </FormItem>
  )
}

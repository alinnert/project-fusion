import { Listbox } from '@headlessui/react'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/20/solid'
import classNames from 'classnames'
import React, { FC, useMemo, useState } from 'react'
import { Heroicon } from '../Heroicon'
import { SelectListItem } from './SelectListItem'

export type SelectItem = {
  value: string
  label: string
}

type SelectNullValue = {
  value: string
  label: string
}

type Props = {
  items: SelectItem[]
  value: string | null
  label?: string
  nullValue?: SelectNullValue
  className?: string
  onChange?: (value: string | null) => void
}

export const Select: FC<Props> = ({
  items,
  value,
  label,
  nullValue,
  className,
  onChange,
}) => {
  const [selectedItem, setSelectedItem] = useState<SelectItem['value'] | null>(
    value,
  )

  const displayValue = useMemo(() => {
    const currentItem = items.find((item) => item.value === selectedItem)
    return currentItem?.label ?? nullValue?.label ?? '-'
  }, [items, nullValue, selectedItem])

  function handleChange(value: string): void {
    const nullableValue = value === '' ? null : value
    setSelectedItem(nullableValue)
    onChange?.(nullableValue)
  }

  function isSelected(selected: boolean, value: string): boolean {
    return selected || (value === '' && selectedItem === null)
  }

  return (
    <div className={classNames(className, 'text-left')}>
      <Listbox value={selectedItem} onChange={handleChange}>
        {({ open }) => (
          <div className="relative">
            <Listbox.Label className="text-sm font-semibold">
              {label}
            </Listbox.Label>

            <Listbox.Button
              className={classNames(
                'relative text-left',
                'px-2 py-1',
                'w-full',
                'rounded',
                'border border-neutral-600',
              )}
            >
              <div>{displayValue}</div>

              <div className="absolute bottom-0 right-0 top-0 flex items-center px-2">
                <Heroicon
                  icon={open ? <ChevronUpIcon /> : <ChevronDownIcon />}
                  iconType="mini"
                />
              </div>
            </Listbox.Button>

            <Listbox.Options
              className={classNames(
                'absolute left-0 top-full w-full',
                'p-1',
                'bg-blur rounded-md shadow-lg',
              )}
            >
              {items.map((item) => (
                <Listbox.Option key={item.value} value={item.value}>
                  {({ selected, active }) => (
                    <SelectListItem
                      item={item}
                      selected={selected}
                      active={active}
                      isSelected={isSelected}
                    />
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </div>
        )}
      </Listbox>
    </div>
  )
}

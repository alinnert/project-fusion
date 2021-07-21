import { Listbox } from '@headlessui/react'
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@heroicons/react/solid'
import classNames from 'classnames'
import React, { FC, useMemo, useState } from 'react'
import { matchBool } from '../../tools/match'
import { FormItem } from './FormItem'
import { Heroicon } from './Heroicon'

export interface SelectItem {
  value: string
  label: string
}

interface Props {
  items: SelectItem[]
  value: string | null
  label?: string
  className?: string
  onChange?: (value: string | null) => void
}

export const Select: FC<Props> = ({
  items,
  value,
  label,
  className,
  onChange,
}) => {
  const [selectedItem, setSelectedItem] = useState<SelectItem['value'] | null>(
    value,
  )

  const displayValue = useMemo(() => {
    return (
      items.find((item) => item.value === selectedItem)?.label ??
      '- nichts ausgewählt -'
    )
  }, [items, selectedItem])

  function handleChange(value: string): void {
    const nullableValue = value === '' ? null : value
    setSelectedItem(nullableValue)
    onChange?.(nullableValue)
  }

  return (
    <FormItem label={label} className={className}>
      <Listbox value={selectedItem} onChange={handleChange}>
        {({ open }) => (
          <div className="relative">
            <Listbox.Button
              className={classNames(
                'relative text-left',
                'p-2',
                'w-full',
                'rounded',
                'border border-neutral-600',
              )}
            >
              <div>{displayValue}</div>
              <div
                className={classNames(
                  'absolute right-0 top-0 bottom-0',
                  'px-2',
                  'flex items-center',
                )}
              >
                <Heroicon
                  icon={open ? <ChevronUpIcon /> : <ChevronDownIcon />}
                />
              </div>
            </Listbox.Button>

            <Listbox.Options
              className={classNames(
                'absolute left-0 top-full w-full',
                'p-1',
                'bg-blur shadow-lg rounded-md',
              )}
            >
              {items.map((item) => (
                <Listbox.Option key={item.value} value={item.value}>
                  {({ selected, active }) => (
                    <div
                      className={classNames(
                        'flex items-center',
                        'px-2 py-1',
                        'rounded',
                        matchBool(active, 'bg-gradient-brand'),
                        matchBool(active, 'text-white'),
                      )}
                    >
                      <div className="w-8 flex-0 flex justify-center">
                        {selected ? (
                          <Heroicon
                            icon={<CheckIcon />}
                            color={active ? 'white' : 'black'}
                          />
                        ) : null}
                      </div>

                      <div
                        className={classNames(
                          'flex-1',
                          matchBool(selected, 'font-semibold'),
                        )}
                      >
                        {item.label}
                      </div>
                    </div>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </div>
        )}
      </Listbox>
    </FormItem>
  )
}

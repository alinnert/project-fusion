import { Popover } from '@headlessui/react'
import classNames from 'classnames'
import React, { FC, ReactElement } from 'react'
import { Button, ButtonType } from '../forms/Button'

export interface ToolbarPopoverItem {
  type: 'popover'
  label: string
  buttonType?: ButtonType
  disabled?: boolean
  icon?: ReactElement
  panel: ReactElement
}

export const ToolbarPopover: FC<ToolbarPopoverItem> = (item) => {
  return (
    <Popover className="relative">
      <Popover.Button disabled={item.disabled}>
        <div>
          <Button
            icon={item.icon}
            type={item.buttonType ?? 'default'}
            disabled={item.disabled}
          >
            {item.label}
          </Button>
        </div>
      </Popover.Button>
      <Popover.Panel
        className={classNames('absolute top-full', 'p-2', 'bg-blur')}
      >
        {item.panel}
      </Popover.Panel>
    </Popover>
  )
}

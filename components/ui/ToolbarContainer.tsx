import { Popover } from '@headlessui/react'
import classNames from 'classnames'
import React, { FC, PropsWithChildren, ReactElement } from 'react'
import { Button, ButtonType } from './Button'

interface ToolbarButton {
  type: 'button'
  buttonType?: ButtonType
  disabled?: boolean
  label: string
  icon?: ReactElement
  action: () => void
}

interface ToolbarPopover {
  type: 'popover'
  buttonType?: ButtonType
  disabled?: boolean
  label: string
  icon?: ReactElement
  panel: ReactElement
}

export type ToolbarItem = ToolbarButton | ToolbarPopover

interface Props {
  toolbarItems?: ToolbarItem[]
}

export const ToolbarContainer: FC<PropsWithChildren<Props>> = ({
  children,
  toolbarItems = [],
}) => {
  return (
    <div
      className={classNames(
        'grid grid-rows-[auto,1fr]',
        'h-full',
        'overflow-hidden',
      )}
    >
      {toolbarItems.length > 0 ? (
        <div
          className={classNames(
            'flex gap-x-2',
            'p-2',
            'bg-neutral-50',
            'border-b border-neutral-300',
          )}
        >
          {toolbarItems.map((item, index) =>
            item.type === 'button' ? (
              <Button
                key={index}
                icon={item.icon}
                buttonType={item.buttonType ?? 'default'}
                disabled={item.disabled}
                onClick={item.action}
              >
                {item.label}
              </Button>
            ) : item.type === 'popover' ? (
              <Popover key={index} className="relative">
                <Popover.Button disabled={item.disabled}>
                  <div>
                    <Button
                      icon={item.icon}
                      buttonType={item.buttonType ?? 'default'}
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
            ) : null,
          )}
        </div>
      ) : null}

      <div className="row-start-2 h-full overflow-auto">{children}</div>
    </div>
  )
}

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

interface ToolbarExpander {
  type: 'expander'
}

interface ToolbarDivider {
  type: 'divider'
}

export type ToolbarItem =
  | ToolbarButton
  | ToolbarPopover
  | ToolbarExpander
  | ToolbarDivider

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
        <div className={classNames('flex gap-x-2', 'p-2', 'bg-neutral-200')}>
          {toolbarItems.map((item, index) =>
            item.type === 'button' ? (
              <Button
                key={index}
                icon={item.icon}
                type={item.buttonType ?? 'default'}
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
            ) : item.type === 'expander' ? (
              <div className="ml-auto" key={index} />
            ) : item.type === 'divider' ? (
              <div
                className="mx-1 h-1/2 self-center w-px bg-gray-400"
                key={index}
              />
            ) : null,
          )}
        </div>
      ) : null}

      <div
        className={classNames(
          'row-start-2 row-end-3 h-full overflow-hidden',
          'grid grid-flow-col auto-cols-fr',
        )}
      >
        {children}
      </div>
    </div>
  )
}

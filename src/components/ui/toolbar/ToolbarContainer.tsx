import classNames from 'classnames'
import React, { FC, PropsWithChildren, ReactElement } from 'react'
import { Heroicon } from '../Heroicon'
import { ToolbarButton, ToolbarButtonItem } from './ToolbarButton'
import { ToolbarDivider, ToolbarDividerItem } from './ToolbarDivider'
import { ToolbarDropdown, ToolbarDropdownItem } from './ToolbarDropdown'
import { ToolbarExpander, ToolbarExpanderItem } from './ToolbarExpander'
import { ToolbarPopover, ToolbarPopoverItem } from './ToolbarPopover'

export type ToolbarItem = (
  | ToolbarButtonItem
  | ToolbarPopoverItem
  | ToolbarDropdownItem
  | ToolbarExpanderItem
  | ToolbarDividerItem
) & { visible?: boolean }

interface Props {
  title?: string
  icon?: {
    element?: ReactElement
    color?: string
    className?: string
  }
  toolbarItems?: ToolbarItem[]
  toolbarPadding?: 'sm' | 'lg'
}

export const ToolbarContainer: FC<PropsWithChildren<Props>> = ({
  children,
  title,
  icon,
  toolbarItems = [],
  toolbarPadding = 'sm',
}) => {
  return (
    <div
      className={classNames(
        'grid grid-rows-[auto,auto,1fr]',
        'h-full',
        'overflow-hidden',
      )}
    >
      {title !== undefined || toolbarItems.length > 0 ? (
        <div
          className={classNames(
            'row-start-2 row-end-3',
            'grid grid-cols-[1fr,auto] items-center',
            'border-b',
            {
              'px-2': toolbarPadding === 'sm',
              'px-8': toolbarPadding === 'lg',
            },
          )}
        >
          {title !== undefined ? (
            <div className='flex items-center'>
              {icon !== undefined && icon.element !== undefined ? (
                <div className={classNames('mr-2', icon.className)}>
                  <Heroicon icon={icon.element} color={icon.color} scale={1} />
                </div>
              ) : null}

              <div className="my-4 text-xl font-semibold">{title}</div>
            </div>
          ) : null}

          <div className={classNames('flex gap-x-4', 'py-2')}>
            {toolbarItems.map((item, index) =>
              item.visible === false ? null : item.type === 'button' ? (
                <ToolbarButton key={index} {...item} />
              ) : item.type === 'popover' ? (
                <ToolbarPopover key={index} {...item} />
              ) : item.type === 'dropdown' ? (
                <ToolbarDropdown key={index} {...item} />
              ) : item.type === 'expander' ? (
                <ToolbarExpander key={index} />
              ) : item.type === 'divider' ? (
                <ToolbarDivider key={index} />
              ) : null,
            )}
          </div>
        </div>
      ) : null}

      <div
        className={classNames(
          'row-start-3 row-end-4 h-full overflow-hidden',
          'grid grid-flow-col auto-cols-fr',
        )}
      >
        {children}
      </div>
    </div>
  )
}

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
        'grid grid-rows-[auto,1fr] grid-flow-col auto-cols-fr',
        '[&>*:nth-child(1)]:row-start-1 [&>*:nth-child(1)]:row-end-2',
        '[&>*:nth-child(1)]:col-start-1 [&>*:nth-child(1)]:col-end-2',
        '[&>*:nth-child(2)]:row-start-2 [&>*:nth-child(2)]:row-end-3',
        '[&>*:nth-child(2)]:col-start-1 [&>*:nth-child(2)]:col-end-2',
        '[&>*:nth-child(3)]:row-start-1 [&>*:nth-child(3)]:row-end-3',
        '[&>*:nth-child(3)]:col-start-2 [&>*:nth-child(3)]:col-end-3',
        'h-full overflow-hidden',
      )}
    >
      <div
        className={classNames('grid grid-cols-[auto,1fr] items-center', 'my-2', {
          'px-2': toolbarPadding === 'sm',
          'px-8': toolbarPadding === 'lg',
        })}
      >
        {title !== undefined ? (
          <div className="flex items-center gap-1 col-start-1 col-end-2 my-4">
            {icon !== undefined && icon.element !== undefined ? (
              <div className={classNames('', icon.className)}>
                <Heroicon icon={icon.element} color={icon.color} scale={1} />
              </div>
            ) : null}

            <div className="my-0 text-xl font-semibold">{title}</div>
          </div>
        ) : null}

        {toolbarItems.length > 0 ? (
          <div className={classNames('col-start-2 col-end-3', 'flex justify-end gap-x-2')}>
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
        ) : null}
      </div>

      {children}
    </div>
  )
}

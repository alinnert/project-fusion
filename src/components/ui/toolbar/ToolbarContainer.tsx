import classNames from 'classnames'
import React, { FC, PropsWithChildren } from 'react'
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

import { Menu } from '@headlessui/react'
import React, { FC, Fragment, PropsWithChildren, ReactElement } from 'react'
import { match } from '../../tools/match'
import { Button, ButtonType } from './Button'
import { DropdownMenuItem } from './DropdownMenuItem'

export interface MenuItem {
  label: string
  icon?: ReactElement
  action?: () => void
}

interface Props {
  icon?: ReactElement
  items: MenuItem[]
  buttonType: ButtonType
  align?: 'left' | 'right'
}

export const DropdownMenu: FC<PropsWithChildren<Props>> = ({
  children,
  icon,
  items,
  buttonType,
  align = 'left',
}) => {
  return (
    <Menu as="div" className="relative flex items-center">
      <Menu.Button as={Fragment}>
        <div>
          <Button icon={icon} buttonType={buttonType}>
            {children}
          </Button>
        </div>
      </Menu.Button>

      <Menu.Items
        className={`
          absolute z-50 w-max
          ${match(align, { left: 'left-0', right: 'right-0' })}
          top-full
          p-1 rounded border border-black/10 shadow-xl
          bg-white/70 backdrop-filter backdrop-blur-lg
          text-black
        `}
      >
        {items.map((item, index) => (
          <Menu.Item key={index}>
            {({ active }) => (
              <div>
                <DropdownMenuItem isActive={active} {...item} />
              </div>
            )}
          </Menu.Item>
        ))}
      </Menu.Items>
    </Menu>
  )
}

import { Menu } from '@headlessui/react'
import classNames from 'classnames'
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
        className={classNames(
          'absolute z-50 w-max',
          match(align, { left: 'left-0', right: 'right-0' }),
          'top-full p-1',
          'bg-blur',
          'text-black',
        )}
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

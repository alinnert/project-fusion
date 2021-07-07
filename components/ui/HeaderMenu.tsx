import { Menu } from '@headlessui/react'
import React, { FC, ReactElement } from 'react'
import { Heroicon } from './Heroicon'

export interface MenuItem {
  label: string
  icon?: ReactElement
  action?: () => void
}

interface Props {
  label: string
  icon?: ReactElement
  items: MenuItem[]
}

export const HeaderMenu: FC<Props> = ({ label, icon, items }) => {
  return (
    <Menu as="div" className="relative flex items-center">
      <Menu.Button>
        <div
          className={`
            flex items-center
            px-2 py-1 rounded
            text-brand-200 hover:text-white
            hover:bg-brand-700 active:bg-brand-800
          `}
        >
          {icon !== undefined ? (
            <div className="mr-1">
              <Heroicon icon={icon} />
            </div>
          ) : null}
          <div className="text-sm font-semibold">{label}</div>
        </div>
      </Menu.Button>

      <Menu.Items
        className="
          absolute left-0 top-full
          p-1 shadow-md rounded
          bg-white
          text-black
        "
      >
        {items.map((item, index) => (
          <Menu.Item key={index}>
            {({ active }) => (
              <div
                onClick={() => item.action?.()}
                className={`
                  flex items-center
                  py-1 pl-2 pr-4 rounded
                  ${active ? 'bg-brand-600 text-white' : 'text-neutral-700'}
                  active:hover:bg-brand-700
                `}
              >
                {item.icon !== undefined ? (
                  <div className="mr-3">
                    <Heroicon icon={item.icon} />
                  </div>
                ) : null}

                <div className="text-sm font-semibold">{item.label}</div>
              </div>
            )}
          </Menu.Item>
        ))}
      </Menu.Items>
    </Menu>
  )
}

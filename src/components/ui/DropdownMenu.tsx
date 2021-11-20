import { Menu } from '@headlessui/react'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid'
import classNames from 'classnames'
import React, {
  FC,
  Fragment,
  PropsWithChildren,
  ReactElement,
  useMemo,
} from 'react'
import {
  defaultMatch,
  matchBoolToString,
  matchStringToString,
  matchUnionToUnion,
} from '../../utils/match'
import { Button, ButtonSize, ButtonType } from './Button'
import {
  DropdownMenuButton,
  DropdownMenuItemButton,
} from './DropdownMenuButton'
import {
  DropdownMenuItemSeparator,
  DropdownMenuSeparator,
} from './DropdownMenuSeparator'

export type DropdownMenuItemButtonType = 'default' | 'delete'

export type DropdownMenuItem =
  | DropdownMenuItemButton
  | DropdownMenuItemSeparator

interface Props {
  icon?: ReactElement
  items: DropdownMenuItem[]
  buttonType: ButtonType
  buttonSize?: ButtonSize
  align?: 'left' | 'right'
  secondaryLabel?: string
}

export const DropdownMenu: FC<PropsWithChildren<Props>> = ({
  children,
  icon,
  items,
  buttonType,
  buttonSize,
  align = 'left',
  secondaryLabel,
}) => {
  const openButtonType = useMemo<ButtonType>(() => {
    return matchUnionToUnion<ButtonType, ButtonType>(buttonType, {
      [defaultMatch]: 'default',
      flat: 'flat-open',
      header: 'header-open',
    })
  }, [buttonType])

  return (
    <Menu as="div" className="relative flex items-center">
      {({ open }) => (
        <>
          <Menu.Button as={Fragment}>
            <div>
              <Button
                icon={icon}
                rightIcon={open ? <ChevronUpIcon /> : <ChevronDownIcon />}
                type={open ? openButtonType : buttonType}
                size={buttonSize}
              >
                {children !== undefined || secondaryLabel !== undefined ? (
                  <div className="flex items-center gap-x-3">
                    {children}

                    {secondaryLabel !== undefined ? (
                      <>
                        <div
                          className={classNames(
                            matchBoolToString(
                              open,
                              'text-brand-600',
                              'text-white',
                            ),
                          )}
                        >
                          {secondaryLabel}
                        </div>
                      </>
                    ) : null}
                  </div>
                ) : null}
              </Button>
            </div>
          </Menu.Button>

          <Menu.Items
            className={classNames(
              'absolute z-50 w-max',
              matchStringToString(align, {
                left: 'left-0',
                right: 'right-0',
                [defaultMatch]: 'left-0',
              }),
              'top-full p-1',
              'bg-blur',
              'text-black',
            )}
          >
            {items.map((item, index) =>
              item.type === 'separator' ? (
                <DropdownMenuSeparator key={index} />
              ) : (
                <Menu.Item key={index}>
                  {({ active }) => (
                    <div>
                      <DropdownMenuButton isActive={active} item={item} />
                    </div>
                  )}
                </Menu.Item>
              ),
            )}
          </Menu.Items>
        </>
      )}
    </Menu>
  )
}

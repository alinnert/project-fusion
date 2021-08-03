import { Menu } from '@headlessui/react'
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
import { DropdownMenuItem } from './DropdownMenuItem'

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
                buttonType={open ? openButtonType : buttonType}
                buttonSize={buttonSize}
              >
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
        </>
      )}
    </Menu>
  )
}

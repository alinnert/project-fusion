import React, { FC, ReactElement } from 'react'
import { Button } from './forms/Button'

type EntryListItemButton = {
  icon: ReactElement
  onClick: () => void
}

type Props = {
  label: string
  onClick: () => void
  buttons?: EntryListItemButton[]
}

export const EntryListItem: FC<Props> = ({ label, onClick, buttons = [] }) => {
  return (
    <div className="my-2 flex items-stretch gap-x-2">
      <div
        className="flex flex-grow items-center rounded px-3 hover:bg-neutral-100 active:bg-neutral-200"
        onClick={onClick}
      >
        {label}
      </div>

      <div>
        {buttons.map((button, index) => (
          <Button
            key={index}
            onClick={button.onClick}
            icon={button.icon}
            type="flat"
          />
        ))}
      </div>
    </div>
  )
}

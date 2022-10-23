import React, { FC, ReactElement } from 'react'
import { Button } from './forms/Button'

type EntryListItemButton = {
  icon: ReactElement
  onClick: () => void
}

interface Props {
  label: string
  onClick: () => void
  buttons?: EntryListItemButton[]
}

export const EntryListItem: FC<Props> = ({ label, onClick, buttons = [] }) => {
  return (
    <div className="flex items-stretch gap-x-2 my-2">
      <div
        className="flex items-center flex-grow hover:bg-neutral-100 active:bg-neutral-200 px-3 rounded"
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

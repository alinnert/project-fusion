import React, { FC, ReactElement } from 'react'
import { Button, ButtonType } from '../forms/Button'

export interface ToolbarButtonItem {
  type: 'button'
  label: string
  buttonType?: ButtonType
  disabled?: boolean
  icon?: ReactElement
  action: () => void
}

export const ToolbarButton: FC<ToolbarButtonItem> = (item) => {
  return (
    <Button
      icon={item.icon}
      type={item.buttonType ?? 'flat'}
      disabled={item.disabled}
      onClick={item.action}
    >
      {item.label}
    </Button>
  )
}

import React, { FC } from 'react'

export interface ToolbarDividerItem {
  type: 'divider'
}

export const ToolbarDivider: FC = () => {
  return <div className="h-4 self-center w-px bg-gray-300" />
}

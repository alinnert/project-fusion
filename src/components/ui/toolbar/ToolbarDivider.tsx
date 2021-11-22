import React, { FC } from 'react'

export interface ToolbarDividerItem {
  type: 'divider'
}

export const ToolbarDivider: FC = () => {
  return <div className="mx-1 h-1/2 self-center w-px bg-gray-400" />
}

import React, { FC } from 'react'

export interface ToolbarDividerItem {
  type: 'divider'
}

export const ToolbarDivider: FC = () => {
  return <div className="h-4 w-px self-center bg-gray-300" />
}

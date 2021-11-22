import React, { FC } from 'react'

export interface ToolbarExpanderItem {
  type: 'expander'
}

export const ToolbarExpander: FC = ({}) => {
  return <div className="ml-auto" />
}

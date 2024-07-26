import React, { FC } from 'react'

export type ToolbarExpanderItem = {
  type: 'expander'
}

export const ToolbarExpander: FC = ({}) => {
  return <div className="ml-auto" />
}

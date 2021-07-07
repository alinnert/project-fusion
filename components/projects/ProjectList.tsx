import { PlusIcon } from '@heroicons/react/solid'
import React, { FC } from 'react'
import { ToolbarContainer } from '../ui/ToolbarContainer'

interface Props {}

export const ProjectList: FC<Props> = ({}) => {
  return (
    <ToolbarContainer
      toolbarItems={[
        {
          type: 'button',
          label: 'Projekt',
          icon: <PlusIcon />,
          action() {},
        },
      ]}
    >
      <div>Detail-Content</div>
    </ToolbarContainer>
  )
}

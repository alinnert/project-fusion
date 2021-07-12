import { FolderIcon, PencilIcon, TrashIcon } from '@heroicons/react/solid'
import marked from 'marked'
import { useRouter } from 'next/router'
import React, { FC, useMemo } from 'react'
import { Markdown } from '../ui/Markdown'
import { PageContent } from '../ui/PageContent'
import { ToolbarContainer } from '../ui/ToolbarContainer'
import { useGroupFromRoute } from './useGroupFromRoute'

interface Props {}

export const GroupDetailView: FC<Props> = ({}) => {
  const router = useRouter()
  const { groupId, group } = useGroupFromRoute()

  if (group === null) return null

  return (
    <ToolbarContainer
      toolbarItems={[
        {
          type: 'button',
          label: 'Bearbeiten',
          icon: <PencilIcon />,
          action() {
            router.push(`/groups/${groupId}/edit`)
          },
        },
        {
          type: 'button',
          buttonType: 'delete',
          label: 'Löschen',
          icon: <TrashIcon />,
          action() {},
        },
      ]}
    >
      <PageContent
        title={group.name}
        titleIcon={<FolderIcon />}
        titleIconColor={group.color}
      >
        <Markdown text={group.notes} />
      </PageContent>
    </ToolbarContainer>
  )
}

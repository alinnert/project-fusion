import { FolderIcon, PencilIcon, TrashIcon } from '@heroicons/react/solid'
import marked from 'marked'
import { useRouter } from 'next/router'
import React, { FC, useMemo } from 'react'
import { useAppDispatch } from '../../redux'
import { removeGroup } from '../../redux/groups'
import { Markdown } from '../ui/Markdown'
import { PageContent } from '../ui/PageContent'
import { ToolbarContainer } from '../ui/ToolbarContainer'
import { useConfirmDialog } from '../ui/useConfirmDialog'
import { useGroupFromRoute } from './useGroupFromRoute'

interface Props {}

export const GroupDetailView: FC<Props> = ({}) => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { groupId, group } = useGroupFromRoute()
  const { dialog: confirmDeleteDialog, openDialog: openConfirmDeleteDialog } =
    useConfirmDialog({
      onConfirm() {
        if (groupId === null) return
        dispatch(removeGroup(groupId))
        router.push('/favorites')
      },
    })

  if (group === null) return null

  function handleDelete(): void {
    if (groupId === null) return
    openConfirmDeleteDialog({
      title: 'Gruppe löschen?',
      message: `Soll die Gruppe "${groupId}" wirklich gelöscht werden?`,
      confirmButtonLabel: 'Gruppe löschen',
      confirmButtonType: 'delete',
    })
  }

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
          action: handleDelete,
        },
      ]}
    >
      {confirmDeleteDialog}

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

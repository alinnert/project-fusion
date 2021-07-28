import { FolderIcon, PencilIcon, TrashIcon } from '@heroicons/react/solid'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import React, { FC } from 'react'
import { useAppDispatch } from '../../redux'
import { removeGroup } from '../../redux/groups'
import { Markdown } from '../ui/Markdown'
import { PageContent } from '../ui/PageContent'
import { ToolbarContainer } from '../ui/ToolbarContainer'
import { useConfirmDialog } from '../ui/useConfirmDialog'
import { useGroupFromRoute } from './useGroupFromRoute'

interface Props {}

export const GroupDetailView: FC<Props> = ({}) => {
  const { t } = useTranslation()
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
    const groupName = group?.name
    if (groupName === undefined) return

    openConfirmDeleteDialog({
      title: t('groups:deleteDialog.title'),
      message: t('groups:deleteDialog.message', { group: groupName }),
      confirmButtonLabel: t('groups:deleteDialog.confirmButton'),
      confirmButtonType: 'delete',
    })
  }

  return (
    <ToolbarContainer
      toolbarItems={[
        {
          type: 'button',
          label: t('buttons.edit'),
          icon: <PencilIcon />,
          action() {
            router.push(`/groups/${groupId}/edit`)
          },
        },
        {
          type: 'button',
          buttonType: 'delete',
          label: t('buttons.delete'),
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

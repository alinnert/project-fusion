import { PencilIcon, TrashIcon } from '@heroicons/react/20/solid'
import React, { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useGroupFromRoute } from '../../components/groups/useGroupFromRoute'
import { UseConfirmDialogResult } from '../../components/ui/dialogs/useConfirmDialog'
import { ToolbarItem } from '../../components/ui/toolbar/ToolbarContainer'
import { useGroupActions } from './useGroupActions'

type UseGroupToolbarItemsOptions = {
  openConfirmDeleteDialog: UseConfirmDialogResult['openDialog']
}

export function useGroupToolbarItems({
  openConfirmDeleteDialog,
}: UseGroupToolbarItemsOptions): ToolbarItem[] {
  const { t } = useTranslation()
  const { groupId, group } = useGroupFromRoute()
  const { editGroup } = useGroupActions()

  const handleDelete = useCallback((): void => {
    if (groupId === null) return
    const groupName = group?.name
    if (groupName === undefined) return

    openConfirmDeleteDialog({
      title: t('groups:deleteDialog.title'),
      message: t('groups:deleteDialog.message', { group: groupName }),
      confirmButtonLabel: t('groups:deleteDialog.confirmButton') ?? undefined,
      confirmButtonType: 'delete',
    })
  }, [group, groupId, openConfirmDeleteDialog, t])

  const items = useMemo((): ToolbarItem[] => {
    return [
      {
        type: 'button',
        label: t('common:buttons.edit'),
        icon: <PencilIcon />,
        action: editGroup,
      },
      {
        type: 'button',
        buttonType: 'delete-flat',
        label: t('common:buttons.delete'),
        icon: <TrashIcon />,
        action: handleDelete,
      },
    ]
  }, [editGroup, handleDelete, t])

  return items
}

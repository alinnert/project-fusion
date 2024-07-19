import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/20/solid'
import React, { useCallback } from 'react'
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
  const { createProject, editGroup } = useGroupActions()

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
    {
      type: 'divider',
    },
    {
      type: 'button',
      label: t('projects:buttons.new'),
      icon: <PlusIcon />,
      action: createProject,
    },
    {
      type: 'dropdown',
      label: t('common:buttons.sort'),
      visible: false,
      items: [
        {
          type: 'button',
          label: `${t('projects:labels.id')} (${t('common:terms.ascending')})`,
          action() {
            console.log('impwement me! pwetty pwease! /(°3°)/')
          },
        },
        {
          type: 'button',
          label: `${t('projects:labels.id')} (${t('common:terms.descending')})`,
          action() {
            console.log('impwement me! pwetty pwease! /(°3°)/')
          },
        },
        {
          type: 'button',
          label: t('projects:labels.name'),
          action() {
            console.log('implement me')
          },
        },
        {
          type: 'separator',
        },
        {
          type: 'button',
          label: t('projects:buttons.sortMenu.sortImportantOnTop'),
          action() {
            console.log('implement me')
          },
        },
      ],
    },
  ]
}

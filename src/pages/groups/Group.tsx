import {
  DocumentDuplicateIcon,
  FolderIcon as FolderIconOutline,
} from '@heroicons/react/outline'
import {
  FolderIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
} from '@heroicons/react/solid'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router'
import colors from 'tailwindcss/colors'
import { useGroupFromRoute } from '../../components/groups/useGroupFromRoute'
import { ProjectList } from '../../components/projects/ProjectList'
import { useProjectsFromGroup } from '../../components/projects/useProjectsFromGroup'
import { EmptyText } from '../../components/ui/EmptyText'
import { Markdown } from '../../components/ui/Markdown'
import { PageContent } from '../../components/ui/PageContent'
import { ToolbarContainer } from '../../components/ui/ToolbarContainer'
import { useConfirmDialog } from '../../components/ui/useConfirmDialog'
import { useAppDispatch } from '../../redux'
import { removeGroup } from '../../redux/groups'
import { translationNamespaces } from '../../utils/i18next-namespaces'

export const Group: FC = () => {
  const { t } = useTranslation(translationNamespaces)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const params = useParams()

  const { groupId, group } = useGroupFromRoute()
  const projects = useProjectsFromGroup(group)

  const { dialog: confirmDeleteDialog, openDialog: openConfirmDeleteDialog } =
    useConfirmDialog({
      onConfirm() {
        if (groupId === null) return
        dispatch(removeGroup(groupId))
      },
    })

  if (group === null) {
    return (
      <EmptyText icon={<FolderIcon />} title={t('groups:empty.title')}>
        {t('groups:empty.body')}
      </EmptyText>
    )
  }

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
    <>
      {confirmDeleteDialog}

      <ToolbarContainer
        toolbarItems={[
          {
            type: 'button',
            label: t('buttons.edit'),
            icon: <PencilIcon />,
            action() {
              navigate(`/groups/${groupId}/edit`)
            },
          },
          {
            type: 'button',
            buttonType: 'delete',
            label: t('buttons.delete'),
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
            action() {
              const { groupId } = params
              if (groupId === undefined) return

              navigate(`/groups/${groupId}/new-project`)
            },
          },
        ]}
      >
        <PageContent
          title={group.name}
          titleIcon={<FolderIconOutline />}
          titleIconColor={group.color}
          titleIconType="outline"
          centered
        >
          <Markdown text={group.notes} />
        </PageContent>

        <PageContent
          title={t('projects:terms.project_plural')}
          titleIcon={<DocumentDuplicateIcon />}
          titleIconColor={colors.gray[400]}
          titleIconType="outline"
        >
          <ProjectList projects={projects} />
        </PageContent>
      </ToolbarContainer>
    </>
  )
}

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
import { useGlobalKeyDown } from '../../utils/events'
import { translationNamespaces } from '../../utils/i18next-namespaces'
import { useCtrlOrCmd } from '../../utils/keyboard'

export const Group: FC = () => {
  const { t } = useTranslation(translationNamespaces)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const params = useParams()

  const ctrlOrCmd = useCtrlOrCmd()

  const { groupId, group } = useGroupFromRoute()
  const projects = useProjectsFromGroup(group)

  const { dialog: confirmDeleteDialog, openDialog: openConfirmDeleteDialog } =
    useConfirmDialog({
      onConfirm() {
        if (groupId === null) return
        dispatch(removeGroup(groupId))
      },
    })

  useGlobalKeyDown((event) => {
    if (ctrlOrCmd(event) && event.key === 'e') {
      event.preventDefault()
      editGroup()
    }

    if (ctrlOrCmd(event) && event.key === 'n') {
      event.preventDefault()
      createProject()
    }
  })

  function editGroup(): void {
    navigate(`/groups/${groupId}/edit`)
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

  function createProject(): void {
    const { groupId } = params
    if (groupId === undefined) return

    navigate(`/groups/${groupId}/new-project`)
  }

  if (group === null) {
    return (
      <EmptyText icon={<FolderIcon />} title={t('groups:empty.title')}>
        {t('groups:empty.body')}
      </EmptyText>
    )
  }

  return (
    <>
      {confirmDeleteDialog}

      <ToolbarContainer
        toolbarItems={[
          {
            type: 'button',
            label: t('common:buttons.edit'),
            icon: <PencilIcon />,
            action: editGroup,
          },
          {
            type: 'button',
            buttonType: 'delete',
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

import { FolderIcon } from '@heroicons/react/20/solid'
import {
  FolderIcon as FolderIconOutline,
  QueueListIcon,
} from '@heroicons/react/24/outline'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useGroupFromRoute } from '../../components/groups/useGroupFromRoute'
import { ProjectList } from '../../components/projects/ProjectList'
import { useProjectsFromGroup } from '../../components/projects/useProjectsFromGroup'
import { useSortMenu } from '../../components/projects/useSortMenu'
import { EmptyText } from '../../components/ui/EmptyText'
import { Markdown } from '../../components/ui/Markdown'
import { PageContent } from '../../components/ui/PageContent'
import { ToolbarContainer } from '../../components/ui/toolbar/ToolbarContainer'
import { useGroupDialogs } from './useGroupDialogs'
import { useGroupShortcuts } from './useGroupShortcuts'
import { useToolbarItems } from './useToolbarItems'

export const Group: FC = () => {
  const { t } = useTranslation()

  const { group } = useGroupFromRoute()
  const projects = useProjectsFromGroup(group)

  const {
    confirmDelete: {
      dialog: confirmDeleteDialog,
      openDialog: openConfirmDeleteDialog,
    },
  } = useGroupDialogs()

  const toolbarItems = useToolbarItems({ openConfirmDeleteDialog })
  const { sortMenu } = useSortMenu()

  useGroupShortcuts()

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
        title={group.name}
        icon={{ element: <FolderIcon />, color: group.color }}
        toolbarItems={toolbarItems}
        toolbarPadding="lg"
      >
        <PageContent
          icon={<FolderIconOutline />}
          iconColor={group.color}
          iconType="outline"
          centered
        >
          <Markdown text={group.notes} />
        </PageContent>

        <PageContent
          title={t('projects:terms.project_plural')}
          titleButtons={<>{sortMenu}</>}
          icon={<QueueListIcon />}
          iconClassName="text-neutral-500"
          iconType="outline"
          dimmed
        >
          <ProjectList projects={projects} />
        </PageContent>
      </ToolbarContainer>
    </>
  )
}

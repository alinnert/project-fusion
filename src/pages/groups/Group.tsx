import { PlusIcon } from '@heroicons/react/16/solid'
import { FolderIcon, InboxStackIcon } from '@heroicons/react/20/solid'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useGroupFromRoute } from '../../components/groups/useGroupFromRoute'
import { ProjectList } from '../../components/projects/ProjectList'
import { useProjectsFromGroup } from '../../components/projects/useProjectsFromGroup'
import { useSortMenu } from '../../components/projects/useSortMenu'
import { EmptyText } from '../../components/ui/EmptyText'
import { Button } from '../../components/ui/forms/Button'
import { Markdown } from '../../components/ui/Markdown'
import { PageContent } from '../../components/ui/PageContent'
import { ToolbarContainer } from '../../components/ui/toolbar/ToolbarContainer'
import { useGroupActions } from './useGroupActions'
import { useGroupDialogs } from './useGroupDialogs'
import { useGroupShortcuts } from './useGroupShortcuts'
import { useGroupToolbarItems } from './useGroupToolbarItems'

export const Group: FC = () => {
  const { t } = useTranslation()

  const { group } = useGroupFromRoute()
  const projects = useProjectsFromGroup(group)
  const { createProject } = useGroupActions()

  const {
    confirmDelete: {
      dialog: confirmDeleteDialog,
      openDialog: openConfirmDeleteDialog,
    },
  } = useGroupDialogs()

  const toolbarItems = useGroupToolbarItems({ openConfirmDeleteDialog })
  const { sortMenu } = useSortMenu()

  useGroupShortcuts()

  if (group === null) {
    return (
      <EmptyText
        icon={<FolderIcon />}
        title={t('groups:empty.title') ?? undefined}
      >
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
        <PageContent>
          <Markdown text={group.notes} />
        </PageContent>

        <PageContent
          title={t('projects:terms.project_plural') ?? undefined}
          titleButtons={
            <div className="flex gap-1">
              {sortMenu}
              <Button
                type="flat"
                icon={<PlusIcon />}
                onClick={createProject}
                size="small"
              >
                {t('projects:buttons.new')}
              </Button>
            </div>
          }
          icon={<InboxStackIcon />}
          iconClassName="text-neutral-500"
          iconType="mini"
          dimmed
        >
          <ProjectList projects={projects} />
        </PageContent>
      </ToolbarContainer>
    </>
  )
}

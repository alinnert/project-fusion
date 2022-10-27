import { ArrowsUpDownIcon, FolderIcon } from '@heroicons/react/20/solid'
import {
  FolderIcon as FolderIconOutline,
  QueueListIcon
} from '@heroicons/react/24/outline'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useGroupFromRoute } from '../../components/groups/useGroupFromRoute'
import { ProjectList } from '../../components/projects/ProjectList'
import { useProjectsFromGroup } from '../../components/projects/useProjectsFromGroup'
import {
  DropdownMenu,
  DropdownMenuItem
} from '../../components/ui/dropdownMenu/DropdownMenu'
import { EmptyText } from '../../components/ui/EmptyText'
import { Markdown } from '../../components/ui/Markdown'
import { PageContent } from '../../components/ui/PageContent'
import { ToolbarContainer } from '../../components/ui/toolbar/ToolbarContainer'
import { useAppSelector } from '../../redux'
import { ProjectsSortOrder } from '../../redux/settings'
import { useGroupActions } from './useGroupActions'
import { useGroupDialogs } from './useGroupDialogs'
import { useGroupShortcuts } from './useGroupShortcuts'
import { useToolbarItems } from './useToolbarItems'

export const Group: FC = () => {
  const { t } = useTranslation()

  const { group } = useGroupFromRoute()
  const projects = useProjectsFromGroup(group)
  const projectsSortOrder = useAppSelector(
    (state) => state.settings.projectsSortOrder,
  )

  const { changeProjectsSortOrder } = useGroupActions()

  const {
    confirmDelete: {
      dialog: confirmDeleteDialog,
      openDialog: openConfirmDeleteDialog,
    },
  } = useGroupDialogs()

  const toolbarItems = useToolbarItems({ openConfirmDeleteDialog })

  useGroupShortcuts()

  const sortButtonText = `${t('common:buttons.sort')}`

  if (group === null) {
    return (
      <EmptyText icon={<FolderIcon />} title={t('groups:empty.title')}>
        {t('groups:empty.body')}
      </EmptyText>
    )
  }

  const getSortLabel = ({ sortBy, sortOrder }: ProjectsSortOrder) =>
    `${t(`projects:labels.${sortBy}`)} (${t(`common:terms.${sortOrder}`)})`

  function createSortMenuItem(
    sortBy: ProjectsSortOrder['sortBy'],
    sortOrder: ProjectsSortOrder['sortOrder'],
  ): DropdownMenuItem {
    return {
      type: 'button',

      label: getSortLabel({ sortBy, sortOrder }),

      checked:
        projectsSortOrder.sortBy === sortBy &&
        projectsSortOrder.sortOrder === sortOrder,

      action() {
        changeProjectsSortOrder({ sortBy, sortOrder })
      },
    }
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
          titleButtons={
            <>
              <DropdownMenu
                buttonType="flat"
                buttonSize="small"
                align="right"
                icon={<ArrowsUpDownIcon />}
                items={[
                  createSortMenuItem('name', 'ascending'),
                  createSortMenuItem('name', 'descending'),
                  createSortMenuItem('projectNumber', 'ascending'),
                  createSortMenuItem('projectNumber', 'descending'),
                ]}
              >
                <span>
                  {getSortLabel({
                    sortBy: projectsSortOrder.sortBy,
                    sortOrder: projectsSortOrder.sortOrder,
                  })}
                </span>
              </DropdownMenu>
            </>
          }
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

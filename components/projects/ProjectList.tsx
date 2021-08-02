import { InboxIcon } from '@heroicons/react/outline'
import { PlusIcon } from '@heroicons/react/solid'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import React, { FC, ReactNode, useCallback, useMemo } from 'react'
import { Project } from '../../redux/projects'
import { EmptyText } from '../ui/EmptyText'
import { PageContent } from '../ui/PageContent'
import { TextDivider } from '../ui/TextDivider'
import { ToolbarContainer, ToolbarItem } from '../ui/ToolbarContainer'
import { ProjectListItem } from './ProjectListItem'

type ArchivedString = 'open' | 'archived'

interface Props {
  projects: Array<Project>
}

export const ProjectList: FC<Props> = ({ projects }) => {
  const { t } = useTranslation()
  const router = useRouter()

  const groupedProjects = useMemo<Record<ArchivedString, Project[]>>(() => {
    const groups: Record<ArchivedString, Project[]> = {
      open: [],
      archived: [],
    }

    for (const project of projects) {
      const groupName: ArchivedString = project.archived ? 'archived' : 'open'
      groups[groupName].push(project)
    }

    return groups
  }, [projects])

  function getGroupedItems(
    groupName: ArchivedString,
    title: string,
  ): ReactNode {
    if (groupedProjects[groupName].length === 0) return null

    return (
      <div className="mb-8">
        <TextDivider label={title} color="brand" className="mb-4" />

        {groupedProjects[groupName].map((project) => (
          <ProjectListItem key={project.id} {...project} />
        ))}
      </div>
    )
  }

  const createProject = useCallback(() => {
    const groupId = router.query.groupId
    if (groupId === undefined) return

    router.push({
      pathname: '/groups/[groupId]/new_project',
      query: { groupId },
    })
  }, [router])

  const toolbarItems = useMemo<ToolbarItem[]>(
    () => [
      {
        type: 'button',
        label: t('projects:terms.project'),
        icon: <PlusIcon />,
        action: createProject,
      },
    ],
    [createProject, t],
  )

  return (
    <ToolbarContainer toolbarItems={toolbarItems}>
      {projects.length === 0 ? (
        <EmptyText
          icon={<InboxIcon />}
          title={t('projects:list.noProjects.title')}
        >
          {t<string, TemplateStringsArray>('projects:list.noProjects.body', {
            returnObjects: true,
          }).map?.((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </EmptyText>
      ) : (
        <PageContent centered={true}>
          <div className="px-2 py-4 text-lg">
            {getGroupedItems(
              'open',
              t('projects:list.itemGroups.activeProjects'),
            )}

            {getGroupedItems(
              'archived',
              t('projects:list.itemGroups.archivedProjects'),
            )}
          </div>
        </PageContent>
      )}
    </ToolbarContainer>
  )
}

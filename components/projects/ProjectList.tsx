import { InboxIcon } from '@heroicons/react/outline'
import { PlusIcon } from '@heroicons/react/solid'
import React, { FC, ReactNode, useMemo } from 'react'
import { Project } from '../../redux/projects'
import { EmptyText } from '../ui/EmptyText'
import { ToolbarContainer } from '../ui/ToolbarContainer'
import { ProjectListItem } from './ProjectListItem'

type ArchivedString = 'open' | 'archived'

interface Props {
  projects: Array<Project>
}

export const ProjectList: FC<Props> = ({ projects }) => {
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
        <div className="font-semibold mb-2 px-4">{title}</div>

        {groupedProjects[groupName].map((project) => (
          <ProjectListItem key={project.id} {...project} />
        ))}
      </div>
    )
  }

  return (
    <ToolbarContainer
      toolbarItems={[
        {
          type: 'button',
          label: 'Projekt',
          icon: <PlusIcon />,
          action() {},
        },
      ]}
    >
      {projects.length === 0 ? (
        <EmptyText icon={<InboxIcon />} title="Keine Projekte vorhanden">
          <p>Es gibt derzeit keine Projekte in dieser Gruppe.</p>
          <p>
            Du kannst ein neues Projekt mit dem Button [+&nbsp;Projekt] oben anlegen.
          </p>
        </EmptyText>
      ) : (
        <div className="px-2 py-4 text-lg">
          {getGroupedItems('open', 'Aktive Projekte')}
          {getGroupedItems('archived', 'Archivierte Projekte')}
        </div>
      )}
    </ToolbarContainer>
  )
}

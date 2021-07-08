import { PlusIcon } from '@heroicons/react/solid'
import React, { FC, ReactNode, useMemo } from 'react'
import { Project, ProjectStatus } from '../../types/FileData'
import { EmptyText } from '../ui/EmptyText'
import { ToolbarContainer } from '../ui/ToolbarContainer'
import { ProjectListItem } from './ProjectListItem'

interface Props {
  projects: Array<Project>
}

export const ProjectList: FC<Props> = ({ projects }) => {
  const groupedProjects = useMemo<Record<ProjectStatus, Project[]>>(() => {
    const groups: Record<ProjectStatus, Project[]> = {
      important: [],
      normal: [],
      archived: [],
    }

    for (const project of projects) {
      groups[project.status].push(project)
    }

    return groups
  }, [projects])

  function getGroupedItems(groupId: ProjectStatus, title: string): ReactNode {
    if (groupedProjects[groupId].length === 0) return null

    return (
      <div className="mb-8">
        <div className="font-semibold mb-2 px-4">{title}</div>

        {groupedProjects[groupId].map((project) => (
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
        <EmptyText>Es gibt derzeit keine Projekte in dieser Gruppe.</EmptyText>
      ) : null}

      <div className="px-2 py-4 text-lg">
        {getGroupedItems('important', 'Wichtige Projekte')}
        {getGroupedItems('normal', 'Normale Projekte')}
        {getGroupedItems('archived', 'Archivierte Projekte')}
      </div>
    </ToolbarContainer>
  )
}

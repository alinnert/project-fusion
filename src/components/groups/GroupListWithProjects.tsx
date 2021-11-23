import { FolderIcon } from '@heroicons/react/solid'
import classNames from 'classnames'
import React, { FC, ReactElement, useMemo } from 'react'
import { ProjectGroup } from '../../redux/groups'
import { Project } from '../../redux/projects'
import { ProjectListItem } from '../projects/ProjectListItem'
import { useGetProjectsFromGroup } from '../projects/useProjectsFromGroup'
import { Heroicon } from '../ui/Heroicon'
import { PageContent } from '../ui/PageContent'

interface Props {
  groups: ProjectGroup[]
  title?: string
  titleIcon?: ReactElement
  titleIconClassName?: string
  emptyPlaceholder?: ReactElement
  showProject?: (project: Project, group: ProjectGroup) => boolean
}

export const GroupListWithProjects: FC<Props> = ({
  groups,
  emptyPlaceholder = null,
  title,
  titleIcon,
  titleIconClassName,
  showProject,
}) => {
  const getProjectsFromGroup = useGetProjectsFromGroup()

  const filteredGroups = useMemo<Map<ProjectGroup, Project[]>>(() => {
    const map = new Map<ProjectGroup, Project[]>()

    for (const group of groups) {
      const projects = getProjectsFromGroup(group).filter(
        (project) => showProject?.(project, group) ?? true,
      )
      if (projects.length === 0) continue
      map.set(group, projects)
    }

    return map
  }, [getProjectsFromGroup, groups, showProject])

  if (filteredGroups.size === 0) {
    return emptyPlaceholder
  }

  return (
    <PageContent
      title={title}
      titleIcon={titleIcon}
      titleIconType="outline"
      titleIconClassName={titleIconClassName}
    >
      {Array.from(filteredGroups).map(([group, projects]) => (
        <div key={group.id} className="mt-8">
          <h3
            className={classNames(
              'flex items-center',
              'text-lg font-semibold',
              'mb-4',
            )}
          >
            <Heroicon
              icon={<FolderIcon />}
              color={group.color}
              iconType="solid"
              scale={1.5}
              className="mr-2"
            />
            {group.name}
          </h3>

          {projects.map((project) => (
            <ProjectListItem key={project.id} {...project} />
          ))}
        </div>
      ))}
    </PageContent>
  )
}

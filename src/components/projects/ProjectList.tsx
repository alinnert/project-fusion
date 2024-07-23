import React, { FC, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useAppSelector } from '../../redux'
import { Project } from '../../redux/projects'
import { sortByProperty } from '../../utils/sortByProperty'
import { ProjectListGroup } from './ProjectListGroup'

type GroupName = 'active' | 'archived'

interface Props {
  projects: Array<Project>
}

export const ProjectList: FC<Props> = ({ projects }) => {
  const { t } = useTranslation()

  const projectsSortOrder = useAppSelector(
    (state) => state.settings.projectsSortOrder,
  )

  const groupedProjects = useMemo<Record<GroupName, Project[]>>(() => {
    const groups: Record<GroupName, Project[]> = { active: [], archived: [] }

    for (const project of projects) {
      const groupName: GroupName = project.archived ? 'archived' : 'active'
      groups[groupName].push(project)
    }

    groups.active.sort(
      sortByProperty((item) => item[projectsSortOrder.sortBy], {
        direction: projectsSortOrder.sortOrder,
      }),
    )

    groups.archived.sort(
      sortByProperty((item) => item[projectsSortOrder.sortBy], {
        direction: projectsSortOrder.sortOrder,
      }),
    )

    return groups
  }, [projects, projectsSortOrder])

  return (
    <div>
      <ProjectListGroup projects={groupedProjects['active']} />
      <ProjectListGroup
        headline={t('projects:list.itemGroups.archivedProjects')}
        projects={groupedProjects['archived']}
      />
    </div>
  )
}

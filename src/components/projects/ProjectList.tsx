import React, { FC, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Project } from '../../redux/projects'
import { ProjectListGroup } from './ProjectListGroup'

type GroupName = 'active' | 'archived'

interface Props {
  projects: Array<Project>
}

export const ProjectList: FC<Props> = ({ projects }) => {
  const { t } = useTranslation()

  const groupedProjects = useMemo<Record<GroupName, Project[]>>(() => {
    const groups: Record<GroupName, Project[]> = { active: [], archived: [] }

    for (const project of projects) {
      const groupName: GroupName = project.archived ? 'archived' : 'active'
      groups[groupName].push(project)
    }

    return groups
  }, [projects])

  return (
    <div>
      <ProjectListGroup
        headline={t('projects:list.itemGroups.activeProjects')}
        projects={groupedProjects['active']}
      />
      <ProjectListGroup
        headline={t('projects:list.itemGroups.archivedProjects')}
        projects={groupedProjects['archived']}
      />
    </div>
  )
}

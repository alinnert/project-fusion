import { useMemo } from 'react'
import { useAppSelector } from '../../redux'
import { ProjectGroup } from '../../redux/groups'
import { Project } from '../../redux/projects'
import { resolveIds } from '../../utils/resolveIds'
import { defaultProjectSorting } from './defaultProjectSorting'

export function useGetProjectsFromGroup(): (
  group: ProjectGroup | null,
) => Project[] {
  const projects = useAppSelector((state) => state.projects.entities)

  return (group) => {
    if (group === null) return []
    const currentProjects = resolveIds(group.projects, projects)
    return currentProjects.sort(defaultProjectSorting)
  }
}

export function useProjectsFromGroup(group: ProjectGroup | null): Project[] {
  const getProjectsFromGroup = useGetProjectsFromGroup()

  const groupProjects = useMemo<Project[]>(
    () => getProjectsFromGroup(group),
    [getProjectsFromGroup, group],
  )

  return groupProjects
}

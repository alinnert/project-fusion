import { useMemo } from 'react'
import { useAppSelector } from '../../redux'
import { ProjectGroup } from '../../redux/groups'
import { Project } from '../../redux/projects'
import { resolveIds } from '../../utils/resolveIds'
import { defaultProjectSorting } from './defaultProjectSorting'

export function useProjectsFromGroup(group: ProjectGroup | null): Project[] {
  const projects = useAppSelector((state) => state.projects.entities)

  const groupProjects = useMemo<Project[]>(() => {
    if (group === null) return []
    const currentProjects = resolveIds(group.projects, projects)
    return currentProjects.sort(defaultProjectSorting)
  }, [group, projects])

  return groupProjects
}

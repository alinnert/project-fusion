import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { useAppSelector } from '../../redux'

export function useProjectFromRoute() {
  const params = useParams()
  const projects = useAppSelector((state) => state.projects.entities)
  const projectIdValue = params.projectId

  const projectId = useMemo(() => {
    if (projectIdValue === undefined) return null
    return (
      (Array.isArray(projectIdValue) ? projectIdValue[0] : projectIdValue) ??
      null
    )
  }, [projectIdValue])

  const project = useMemo(() => {
    if (projectId === null) return null
    return projects[projectId] ?? null
  }, [projectId, projects])

  return { projectId, project }
}

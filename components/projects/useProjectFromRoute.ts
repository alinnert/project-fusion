import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { useAppSelector } from '../../redux'

export function useProjectFromRoute() {
  const router = useRouter()
  const projects = useAppSelector((state) => state.projects.entities)
  const { projectId: projectIdValue } = router.query

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

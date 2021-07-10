import { useRouter } from 'next/router'
import React, { ReactElement, useMemo } from 'react'
import { GroupDetailView } from '../../../components/groups/GroupDetailView'
import { GroupList } from '../../../components/groups/GroupList'
import { ProjectList } from '../../../components/projects/ProjectList'
import { Layout } from '../../../components/app/Layout'
import { useAppSelector } from '../../../redux'
import { selectIsFileOpen } from '../../../redux/database'
import { Project } from '../../../redux/projects'

export default function GroupById(): ReactElement | null {
  const router = useRouter()
  const isFileOpen = useAppSelector(selectIsFileOpen)
  const groups = useAppSelector((state) => state.groups.entities)
  const projects = useAppSelector((state) => state.projects.entities)

  const group = useMemo(() => {
    const groupIdParam = router.query.groupId ?? ''
    const groupId = Array.isArray(groupIdParam) ? groupIdParam[0] : groupIdParam
    return groups[groupId]
  }, [groups, router.query.groupId])

  const groupProjects = useMemo<Array<Project>>(() => {
    const currentProjects =
      (group?.projects
        .map((projectId) => projects[projectId])
        .filter((project) => project !== undefined) as Array<Project>) ?? []

    return currentProjects.sort(defaultProjectSorting)
  }, [group?.projects, projects])

  return (
    <Layout
      left={isFileOpen ? <GroupList /> : null}
      right={<ProjectList projects={groupProjects} />}
    >
      {isFileOpen ? <GroupDetailView /> : null}
    </Layout>
  )
}

function defaultProjectSorting(projectA: Project, projectB: Project): number {
  if (
    (projectA.important && projectB.important) ||
    (!projectA.important && !projectB.important)
  ) {
    const pnA = parseInt(projectB.projectNumber)
    const pnB = parseInt(projectA.projectNumber)
    return pnA > pnB ? 1 : pnA < pnB ? -1 : 0
  }
  if (projectA.important) return -1
  if (projectB.important) return 1
  return 0
}

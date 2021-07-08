import { useRouter } from 'next/router'
import React, { ReactElement, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { GroupDetailView } from '../../../components/groups/GroupDetailView'
import { GroupList } from '../../../components/groups/GroupList'
import { ProjectList } from '../../../components/projects/ProjectList'
import { Layout } from '../../../components/ui/Layout'
import { AppState } from '../../../redux'
import { Project } from '../../../types/FileData'

export default function GroupById(): ReactElement | null {
  const router = useRouter()
  const fileData = useSelector((state: AppState) => state.dataFile.fileData)

  const group = useMemo(() => {
    const groupIdParam = router.query.groupId ?? ''
    const groupId = Array.isArray(groupIdParam) ? groupIdParam[0] : groupIdParam
    return fileData?.groups.find((group) => group.id === groupId)
  }, [fileData?.groups, router.query.groupId])

  const projects = useMemo<Array<Project>>(() => {
    return (
      (group?.projects
        .map((projectId) => fileData?.projects[projectId])
        .filter((project) => project !== undefined) as Array<Project>) ?? []
    ).sort((projectA, projectB) => {
      if (projectA.status === 'important') return -1
      if (projectB.status === 'important') return 1
      if (projectA.status === 'archived') return 1
      if (projectB.status === 'archived') return -1
      return 0
    })
  }, [fileData?.projects, group?.projects])

  return (
    <Layout
      left={fileData !== null ? <GroupList /> : null}
      right={<ProjectList projects={projects} />}
    >
      {fileData !== null ? <GroupDetailView /> : null}
    </Layout>
  )
}

import React, { ReactElement } from 'react'
import { useSelector } from 'react-redux'
import { GroupDetailView } from '../../../components/groups/GroupDetailView'
import { GroupList } from '../../../components/groups/GroupList'
import { ProjectList } from '../../../components/projects/ProjectList'
import { Layout } from '../../../components/ui/Layout'
import { AppState } from '../../../redux'

export default function GroupById(): ReactElement | null {
  const fileData = useSelector((state: AppState) => state.dataFile.fileData)

  return (
    <Layout
      left={fileData !== null ? <GroupList /> : null}
      right={<ProjectList />}
    >
      {fileData !== null ? <GroupDetailView /> : null}
    </Layout>
  )
}

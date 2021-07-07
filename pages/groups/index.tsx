import React, { ReactElement } from 'react'
import { useSelector } from 'react-redux'
import { GroupList } from '../../components/groups/GroupList'
import { Layout } from '../../components/ui/Layout'
import { AppState } from '../../redux'

export default function Favorites(): ReactElement | null {
  const fileData = useSelector((state: AppState) => state.dataFile.fileData)

  return (
    <Layout
      left={fileData !== null ? <GroupList currentId="" /> : null}
    >
      Favoriten
    </Layout>
  )
}

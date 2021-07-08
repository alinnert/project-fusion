import { StarIcon } from '@heroicons/react/outline'
import React, { ReactElement } from 'react'
import { useSelector } from 'react-redux'
import { GroupList } from '../../components/groups/GroupList'
import { EmptyText } from '../../components/ui/EmptyText'
import { Layout } from '../../components/ui/Layout'
import { AppState } from '../../redux'

export default function Favorites(): ReactElement | null {
  const fileData = useSelector((state: AppState) => state.dataFile.fileData)

  return (
    <Layout
      left={fileData !== null ? <GroupList currentId="/favorites" /> : null}
    >
      <EmptyText title="Keine wichtigen Projekte vorhanden" icon={<StarIcon />}>
        Hier erscheinen alle Projekte, die als &quot;wichtig&quot; markiert
        wurden.
      </EmptyText>
    </Layout>
  )
}

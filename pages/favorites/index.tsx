import { StarIcon } from '@heroicons/react/outline'
import React, { ReactElement } from 'react'
import { GroupList } from '../../components/groups/GroupList'
import { EmptyText } from '../../components/ui/EmptyText'
import { Layout } from '../../components/app/Layout'
import { useAppSelector } from '../../redux'

export default function Favorites(): ReactElement | null {
  const filename = useAppSelector((state) => state.database.filename)

  return (
    <Layout
      left={filename !== null ? <GroupList currentId="/favorites" /> : null}
    >
      <EmptyText title="Keine wichtigen Projekte vorhanden" icon={<StarIcon />}>
        Hier erscheinen alle Projekte, die als &quot;wichtig&quot; markiert
        wurden.
      </EmptyText>
    </Layout>
  )
}

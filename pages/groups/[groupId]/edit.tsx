import { BanIcon } from '@heroicons/react/solid'
import React, { ReactElement } from 'react'
import { Layout } from '../../../components/app/Layout'
import { GroupEditForm } from '../../../components/groups/GroupEditForm'
import { useGroupFromRoute } from '../../../components/groups/useGroupFromRoute'
import { EmptyText } from '../../../components/ui/EmptyText'

export default function Page(): ReactElement | null {
  const { group, groupId } = useGroupFromRoute()

  if (group === null) {
    return (
      <Layout>
        <EmptyText title="Keine Gruppe gefunden" icon={<BanIcon />}>
          Es wurde keine Gruppe mit der ID &quot;{groupId}&quot; gefunden.
        </EmptyText>
      </Layout>
    )
  }

  return <GroupEditForm init={group} />
}

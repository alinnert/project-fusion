import React, { ReactElement } from 'react'
import { GroupEditForm } from '../../../components/groups/GroupEditForm'
import { useGroupFromRoute } from '../../../components/groups/useGroupFromRoute'
import { EmptyText } from '../../../components/ui/EmptyText'

export default function Page(): ReactElement | null {
  const { group, groupId } = useGroupFromRoute()

  if (group === null) {
    return (
      <EmptyText title="Keine Gruppe gefunden">
        Für die ID &quot;{groupId}&quot; wurde keine Gruppe gefunden.
      </EmptyText>
    )
  }

  return <GroupEditForm init={group} />
}

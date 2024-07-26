import { useMemo } from 'react'
import { useParams } from 'react-router'
import { useAppSelector } from '../../redux'
import { ProjectGroup } from '../../redux/groups'

type UseGroupFromRouteResult = {
  groupId: string | null
  group: ProjectGroup | null
}

export function useGroupFromRoute(): UseGroupFromRouteResult {
  const { groupId: groupIdValue } = useParams()

  const groups = useAppSelector((state) => state.groups.entities)

  const groupId = useMemo<string | null>(() => {
    if (groupIdValue === undefined) return null
    return (
      (Array.isArray(groupIdValue) ? groupIdValue[0] : groupIdValue) ?? null
    )
  }, [groupIdValue])

  const group = useMemo<ProjectGroup | null>(() => {
    if (groupId === null) return null
    const group = groups[groupId]
    return group ?? null
  }, [groupId, groups])

  return { groupId, group }
}

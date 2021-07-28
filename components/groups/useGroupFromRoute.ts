import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { useAppSelector } from '../../redux'
import { ProjectGroup } from '../../redux/groups'

export function useGroupFromRoute() {
  const router = useRouter()
  const groups = useAppSelector((state) => state.groups.entities)
  const { groupId: groupIdValue } = router.query

  const groupId = useMemo(() => {
    if (groupIdValue === undefined) return null
    return Array.isArray(groupIdValue) ? groupIdValue[0] : groupIdValue
  }, [groupIdValue])

  const group = useMemo<ProjectGroup | null>(() => {
    if (groupId === null) return null
    const group = groups[groupId]
    return group ?? null
  }, [groupId, groups])

  return { groupId, group }
}

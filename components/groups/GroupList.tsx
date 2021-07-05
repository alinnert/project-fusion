import { useRouter } from 'next/router'
import { FC, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { AppState } from '../../redux'
import { ProjectGroup } from '../../types/FileData'
import { VerticalLinkList } from '../ui/VerticalLinkList'

interface Props {}

export const GroupList: FC<Props> = () => {
  const router = useRouter()
  const fileContent = useSelector((state: AppState) => state.dataFile.fileData)

  const currentGroupId = useMemo<string | null>(() => {
    const { groupId } = router.query
    if (typeof groupId !== 'string') {
      return null
    }
    return groupId
  }, [router.query])

  const items = useMemo<ProjectGroup[]>(() => {
    return [{ id: '', name: 'Favoriten' }, ...(fileContent?.groups ?? [])]
  }, [fileContent?.groups])

  return <VerticalLinkList items={items} currentId={currentGroupId} />
}

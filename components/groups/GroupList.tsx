import { PlusIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/router'
import { FC, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { AppState } from '../../redux'
import { ProjectGroup } from '../../types/FileData'
import { ToolbarContainer } from '../ui/ToolbarContainer'
import { VerticalLinkList } from '../ui/VerticalLinkList'

interface Props {
  currentId?: string
}

export const GroupList: FC<Props> = ({ currentId }) => {
  const router = useRouter()
  const fileContent = useSelector((state: AppState) => state.dataFile.fileData)

  const currentGroupId = useMemo<string | null>(() => {
    if (currentId !== undefined) return currentId
    const { groupId } = router.query
    return typeof groupId === 'string' ? groupId : null
  }, [currentId, router.query])

  const items = useMemo<ProjectGroup[]>(() => {
    return [{ id: '', name: 'Favoriten' }, ...(fileContent?.groups ?? [])]
  }, [fileContent?.groups])

  return (
    <ToolbarContainer
      toolbarItems={[
        { type: 'button', label: 'Gruppe', icon: <PlusIcon />, action() {} },
        { type: 'button', label: 'Bereich', icon: <PlusIcon />, action() {} },
      ]}
    >
      <VerticalLinkList
        items={items}
        createLink={(item) => `/groups/${item.id}`}
        currentId={currentGroupId}
      />
    </ToolbarContainer>
  )
}

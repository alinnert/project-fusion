import { PencilIcon, TrashIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/router'
import React, { FC, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { AppState } from '../../redux'
import { ProjectGroup } from '../../types/FileData'
import { ToolbarContainer } from '../ui/ToolbarContainer'

interface Props {}

export const GroupDetailView: FC<Props> = ({}) => {
  const router = useRouter()
  const groups = useSelector(
    (state: AppState) => state.dataFile.fileData?.groups,
  )

  const currentGroup = useMemo<ProjectGroup | null>(() => {
    const { groupId } = router.query
    return groups?.find((group) => group.id === groupId) ?? null
  }, [groups, router.query])

  if (currentGroup === null) return null

  return (
    <ToolbarContainer
      toolbarItems={[
        {
          type: 'button',
          label: 'Bearbeiten',
          icon: <PencilIcon />,
          action() {},
        },
        {
          type: 'button',
          buttonType: 'delete',
          label: 'Löschen',
          icon: <TrashIcon />,
          action() {},
        },
      ]}
    >
      <h1 className="text-3xl">{currentGroup.name}</h1>
    </ToolbarContainer>
  )
}

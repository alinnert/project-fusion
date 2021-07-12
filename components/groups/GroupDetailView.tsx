import { FolderIcon, PencilIcon, TrashIcon } from '@heroicons/react/solid'
import marked from 'marked'
import { useRouter } from 'next/router'
import React, { FC, useMemo } from 'react'
import { useAppSelector } from '../../redux'
import { ProjectGroup } from '../../redux/groups'
import { PageContent } from '../ui/PageContent'
import { ToolbarContainer } from '../ui/ToolbarContainer'

interface Props {}

export const GroupDetailView: FC<Props> = ({}) => {
  const router = useRouter()
  const groups = useAppSelector((state) => state.groups.entities)

  const currentGroup = useMemo<ProjectGroup | undefined>(() => {
    const { groupId: groupIdValue } = router.query
    if (groupIdValue === undefined) return
    const groupId = Array.isArray(groupIdValue) ? groupIdValue[0] : groupIdValue
    return groups[groupId]
  }, [groups, router.query])

  const parsedNotes = useMemo(() => {
    if (currentGroup === undefined) return ''
    if (currentGroup.notes.trim() === '') return ''
    return marked(currentGroup.notes)
  }, [currentGroup])

  if (currentGroup === undefined) return null

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
      <PageContent
        title={currentGroup.name}
        titleIcon={<FolderIcon />}
        titleIconColor={currentGroup.color}
      >
        {currentGroup.notes.trim() !== '' ? (
          <div
            className="prose prose-brand select-text"
            dangerouslySetInnerHTML={{ __html: parsedNotes }}
          />
        ) : null}
      </PageContent>
    </ToolbarContainer>
  )
}

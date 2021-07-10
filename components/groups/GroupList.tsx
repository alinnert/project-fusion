import { FolderAddIcon, PlusIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/router'
import { FC, useMemo } from 'react'
import { useAppSelector } from '../../redux'
import { ProjectGroup } from '../../redux/groups'
import { resolveIds } from '../../tools/resolveIds'
import { ToolbarContainer } from '../ui/ToolbarContainer'
import {
  BasicLinkItem,
  LinkListItems,
  VerticalLinkList,
} from '../ui/VerticalLinkList'

interface Props {
  currentId?: string
}

export const GroupList: FC<Props> = ({ currentId }) => {
  const router = useRouter()
  const categoryIds = useAppSelector((state) => state.settings.categoryOrder)
  const categories = useAppSelector((state) => state.categories.entities)
  const groups = useAppSelector((state) => state.groups.entities)

  const currentGroupId = useMemo<string | null>(() => {
    if (currentId !== undefined) return currentId
    const { groupId } = router.query
    return typeof groupId === 'string' ? groupId : null
  }, [currentId, router.query])

  const prefixedItems = useMemo<Array<BasicLinkItem>>(() => {
    return [{ id: '/favorites', name: 'Favoriten' }]
  }, [])

  const items = useMemo(() => {
    const categoryObjects = resolveIds(categoryIds, categories)
    const categorizedGroups: LinkListItems<ProjectGroup> = categoryObjects.map(
      (category) => {
        const categoryGroups = resolveIds(category.groups, groups)
        return [category, categoryGroups]
      },
    )

    return categorizedGroups
  }, [categories, categoryIds, groups])

  return (
    <ToolbarContainer
      toolbarItems={[
        { type: 'button', label: 'Gruppe', icon: <PlusIcon />, action() {} },
        {
          type: 'button',
          label: 'Kategorie',
          icon: <FolderAddIcon />,
          action() {},
        },
      ]}
    >
      <VerticalLinkList
        items={items}
        prefixedItems={prefixedItems}
        urlPrefix="/groups/"
        currentId={currentGroupId}
      />
    </ToolbarContainer>
  )
}

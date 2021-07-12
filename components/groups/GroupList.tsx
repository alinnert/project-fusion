import { FolderIcon, PlusIcon, StarIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/router'
import { FC, useMemo } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux'
import { addGroupToCategory, updateCategory } from '../../redux/categories'
import { addGroup } from '../../redux/groups'
import { resolveIds } from '../../tools/resolveIds'
import { ToolbarContainer } from '../ui/ToolbarContainer'
import {
  CategorizedLinkItems,
  LinkItem,
  VerticalLinkList,
} from '../ui/VerticalLinkList'

interface Props {
  currentId?: string
}

export const GroupList: FC<Props> = ({ currentId }) => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const categoryIds = useAppSelector((state) => state.settings.categoryOrder)
  const categories = useAppSelector((state) => state.categories.entities)
  const groups = useAppSelector((state) => state.groups.entities)

  const currentGroupId = useMemo<string | null>(() => {
    if (currentId !== undefined) return currentId
    const { groupId } = router.query
    return typeof groupId === 'string' ? groupId : null
  }, [currentId, router.query])

  const prefixedItems = useMemo<LinkItem[]>(() => {
    return [
      {
        id: '/favorites',
        name: 'Favoriten',
        icon: <StarIcon />,
        iconColor: '#D97706',
      },
    ]
  }, [])

  const items = useMemo<CategorizedLinkItems>(() => {
    const categoryObjects = resolveIds(categoryIds, categories)
    const categorizedGroups: CategorizedLinkItems = categoryObjects.map(
      (category) => {
        const categoryGroups = resolveIds(category.groups, groups)
        const categoryLinkItems: LinkItem[] = categoryGroups.map((group) => {
          return { ...group, iconColor: group.color }
        })
        return [category, categoryLinkItems]
      },
    )

    return categorizedGroups
  }, [categories, categoryIds, groups])

  function handleAddButtonClick() {
    dispatch(
      addGroup({
        id: 'foo',
        name: 'Foo',
        notes: 'Standard-Notizen',
        color: '',
        projects: [],
      }),
    )
    dispatch(addGroupToCategory({ category: 'abe', group: 'foo' }))
  }

  return (
    <ToolbarContainer
      toolbarItems={[
        {
          type: 'button',
          label: 'Gruppe',
          icon: <PlusIcon />,
          action: handleAddButtonClick,
        },
      ]}
    >
      <VerticalLinkList
        items={items}
        prefixedItems={prefixedItems}
        showIcons={true}
        defaultIcon={<FolderIcon />}
        urlPrefix="/groups/"
        currentId={currentGroupId}
      />
    </ToolbarContainer>
  )
}

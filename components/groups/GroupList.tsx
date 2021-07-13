import { FolderIcon, PlusIcon, StarIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/router'
import React, { FC, useMemo } from 'react'
import { useAppSelector } from '../../redux'
import { selectGroupsWithoutCategory } from '../../redux/groups'
import { resolveIds } from '../../tools/resolveIds'
import { ToolbarContainer } from '../ui/ToolbarContainer'
import {
  CategorizedLinkItems,
  LinkItem,
  VerticalLinkList,
} from '../ui/VerticalLinkList'
import { useGroupFromRoute } from './useGroupFromRoute'

interface Props {
  currentId?: string
}

export const GroupList: FC<Props> = ({ currentId }) => {
  const router = useRouter()
  const categoryIds = useAppSelector((state) => state.settings.categoryOrder)
  const categories = useAppSelector((state) => state.categories.entities)
  const groups = useAppSelector((state) => state.groups.entities)
  const uncategorizedGroups = useAppSelector(selectGroupsWithoutCategory)
  const { groupId } = useGroupFromRoute()

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
        const categoryLinkItems: LinkItem[] = categoryGroups.map((group) => ({
          ...group,
          iconColor: group.color,
        }))

        return [category, categoryLinkItems]
      },
    )

    const groupsWithoutCategory: CategorizedLinkItems = [
      [
        { id: '', name: 'Unsortiert' },
        uncategorizedGroups.map((group) => ({
          ...group,
          iconColor: group.color,
        })),
      ],
    ]

    return [...groupsWithoutCategory, ...categorizedGroups]
  }, [categories, categoryIds, groups, uncategorizedGroups])

  function handleAddGroupButtonClick() {
    router.push('/new_group')
  }

  return (
    <ToolbarContainer
      toolbarItems={[
        {
          type: 'button',
          label: 'Gruppe',
          icon: <PlusIcon />,
          action: handleAddGroupButtonClick,
        },
      ]}
    >
      <VerticalLinkList
        items={items}
        prefixedItems={prefixedItems}
        showIcons={true}
        defaultIcon={<FolderIcon />}
        urlPrefix="/groups/"
        currentId={currentId ?? groupId}
      />
    </ToolbarContainer>
  )
}

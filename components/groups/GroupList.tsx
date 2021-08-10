import {
  FolderAddIcon,
  FolderIcon,
  StarIcon,
  TagIcon,
} from '@heroicons/react/solid'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import React, { FC, useMemo } from 'react'
import { useAppSelector } from '../../redux'
import { selectIsFileOpen } from '../../redux/database'
import { selectGroupsWithoutCategory } from '../../redux/groups'
import { capitalize } from '../../utils/capitalize'
import { resolveIds } from '../../utils/resolveIds'
import { sortByProperty } from '../../utils/sortByProperty'
import { useOrderedCategories } from '../categories/useOrderedCategories'
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
  const { t } = useTranslation()
  const router = useRouter()
  const { orderedCategories } = useOrderedCategories()
  const isFileOpen = useAppSelector(selectIsFileOpen)
  const groups = useAppSelector((state) => state.groups.entities)
  const uncategorizedGroups = useAppSelector(selectGroupsWithoutCategory)
  const { groupId } = useGroupFromRoute()

  const prefixedItems = useMemo<LinkItem[]>(() => {
    return [
      {
        id: '/favorites',
        name: capitalize(t('groups:list.specialItems.favorites')),
        icon: <StarIcon />,
        iconColor: '#D97706',
      },
    ]
  }, [t])

  const items = useMemo<CategorizedLinkItems>(() => {
    const categorizedGroups: CategorizedLinkItems = orderedCategories.map(
      (category) => {
        const categoryGroups = resolveIds(category.groups, groups)
        const categoryLinkItems = categoryGroups
          .map((group): LinkItem => ({ ...group, iconColor: group.color }))
          .sort(sortByProperty<LinkItem>('name'))

        return [category, categoryLinkItems]
      },
    )

    const groupsWithoutCategory: CategorizedLinkItems = [
      [
        { id: '', name: t('groups:list.noCategory') },
        uncategorizedGroups.map((group) => ({
          ...group,
          iconColor: group.color,
        })),
      ],
    ]

    return [...groupsWithoutCategory, ...categorizedGroups]
  }, [orderedCategories, t, uncategorizedGroups, groups])

  function handleAddGroupButtonClick() {
    router.push('/new_group')
  }

  function handleManageCategoriesButtonClick() {
    router.push('/config/categories')
  }

  if (!isFileOpen) {
    return null
  }

  return (
    <ToolbarContainer
      toolbarItems={[
        {
          type: 'button',
          label: t('groups:list.toolbar.addGroup'),
          icon: <FolderAddIcon />,
          action: handleAddGroupButtonClick,
        },
        { type: 'expander' },
        {
          type: 'button',
          label: t('groups:list.toolbar.manageCategories'),
          icon: <TagIcon />,
          action: handleManageCategoriesButtonClick,
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

import {
  DocumentIcon,
  FolderAddIcon,
  FolderIcon,
  StarIcon,
  TagIcon,
} from '@heroicons/react/solid'
import classNames from 'classnames'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import React, { FC, useMemo } from 'react'
import { useAppSelector } from '../../redux'
import { selectIsFileOpen } from '../../redux/database'
import { ProjectGroup, selectGroupsWithoutCategory } from '../../redux/groups'
import { capitalize } from '../../utils/capitalize'
import { matchBoolToString } from '../../utils/match'
import { resolveIds } from '../../utils/resolveIds'
import { sortByProperty } from '../../utils/sortByProperty'
import { tailwindConfig } from '../../utils/tailwindConfig'
import { useOrderedCategories } from '../categories/useOrderedCategories'
import { Heroicon } from '../ui/Heroicon'
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
  const { groupId } = useGroupFromRoute()
  const { orderedCategories } = useOrderedCategories()

  const isFileOpen = useAppSelector(selectIsFileOpen)
  const groups = useAppSelector((state) => state.groups.entities)
  const uncategorizedGroups = useAppSelector(selectGroupsWithoutCategory)
  const projects = useAppSelector((state) => state.projects.entities)

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
    const createLinkItem = (group: ProjectGroup): LinkItem => {
      const projectItems = resolveIds(group.projects, projects)
      const importantProjectsCount = projectItems.filter(
        (project) => project.important,
      ).length

      return {
        ...group,
        iconColor: group.color,
        secondaryLabel(isCurrent) {
          return (
            <div className="flex gap-x-2 items-center">
              {importantProjectsCount > 0 ? (
                <div
                  className={classNames(
                    'flex gap-x-1 items-center w-10',
                    'text-xs font-semibold',
                    matchBoolToString(
                      isCurrent,
                      'text-important-200',
                      'text-important-600',
                    ),
                  )}
                >
                  <Heroicon icon={<StarIcon />} />
                  {importantProjectsCount}
                </div>
              ) : null}

              <div
                className={classNames(
                  'flex gap-x-1 items-center w-10',
                  'text-xs font-semibold',
                  matchBoolToString(
                    isCurrent,
                    'text-accent-50',
                    'text-neutral-600',
                  ),
                )}
              >
                <Heroicon icon={<DocumentIcon />} />
                {group.projects.length}
              </div>
            </div>
          )
        },
      }
    }

    const categorizedGroups: CategorizedLinkItems = orderedCategories.map(
      (category) => {
        const categoryGroups = resolveIds(category.groups, groups)
        const categoryLinkItems = categoryGroups
          .map(createLinkItem)
          .sort(sortByProperty<LinkItem>('name'))

        return [category, categoryLinkItems]
      },
    )

    const groupsWithoutCategory: CategorizedLinkItems = [
      [
        { id: '', name: t('groups:list.noCategory') },
        uncategorizedGroups.map(createLinkItem),
      ],
    ]

    return [...groupsWithoutCategory, ...categorizedGroups]
  }, [orderedCategories, t, uncategorizedGroups, projects, groups])

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

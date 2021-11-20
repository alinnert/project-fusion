import {
  DocumentIcon,
  FolderAddIcon,
  FolderIcon,
  StarIcon,
  TagIcon,
} from '@heroicons/react/solid'
import classNames from 'classnames'
import React, { FC, useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router'
import { useAppDispatch, useAppSelector } from '../../redux'
import { selectIsFileOpen } from '../../redux/database'
import { ProjectGroup, selectGroupsWithoutCategory } from '../../redux/groups'
import { setCurrentGroupId } from '../../redux/uiState'
import { capitalize } from '../../utils/capitalize'
import { translationNamespaces } from '../../utils/i18next-namespaces'
import { matchBoolToString } from '../../utils/match'
import { resolveIds } from '../../utils/resolveIds'
import { sortByProperty } from '../../utils/sortByProperty'
import { useOrderedCategories } from '../categories/useOrderedCategories'
import { Heroicon } from '../ui/Heroicon'
import { CategorizedLinkItems, LinkItem, LinkList } from '../ui/LinkList'
import { ToolbarContainer } from '../ui/ToolbarContainer'
import { useGroupFromRoute } from './useGroupFromRoute'

export const specialGroupIds = {
  favorites: '_favorites',
}

export const GroupList: FC = () => {
  const { t } = useTranslation(translationNamespaces)
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useAppDispatch()

  const { groupId } = useGroupFromRoute()
  const { orderedCategories } = useOrderedCategories()

  const isFileOpen = useAppSelector(selectIsFileOpen)
  const groups = useAppSelector((state) => state.groups.entities)
  const uncategorizedGroups = useAppSelector(selectGroupsWithoutCategory)
  const projects = useAppSelector((state) => state.projects.entities)

  const prefixedItems = useMemo<LinkItem[]>(() => {
    return [
      {
        id: specialGroupIds.favorites,
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

    const groupsWithoutCategory: CategorizedLinkItems = [
      [
        { id: '', name: t('groups:list.noCategory') },
        uncategorizedGroups.map(createLinkItem),
      ],
    ]

    const categorizedGroups: CategorizedLinkItems = orderedCategories.map(
      (category) => {
        const categoryGroups = resolveIds(category.groups, groups)
        const categoryLinkItems = categoryGroups
          .map(createLinkItem)
          .sort(sortByProperty<LinkItem>('name'))

        return [category, categoryLinkItems]
      },
    )

    return [...groupsWithoutCategory, ...categorizedGroups]
  }, [orderedCategories, t, uncategorizedGroups, projects, groups])

  const currentId = useMemo(() => {
    return location.pathname === `/groups/${specialGroupIds.favorites}`
      ? specialGroupIds.favorites
      : groupId
  }, [groupId, location.pathname])

  function handleAddGroupButtonClick() {
    navigate('/groups/create')
  }

  function handleManageCategoriesButtonClick() {
    navigate('/config/categories')
  }

  function handleItemClick(item: LinkItem): void {
    dispatch(setCurrentGroupId(item.id))
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
      <LinkList
        items={items}
        prefixedItems={prefixedItems}
        showIcons={true}
        defaultIcon={<FolderIcon />}
        urlPrefix="/groups/"
        currentId={currentId}
        onItemClick={handleItemClick}
      />
    </ToolbarContainer>
  )
}

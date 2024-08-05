import {
  DocumentIcon,
  FolderPlusIcon,
  StarIcon,
  TagIcon,
} from '@heroicons/react/16/solid'
import { FolderIcon, HomeIcon } from '@heroicons/react/20/solid'
import classNames from 'classnames'
import React, { FC, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router'
import { useAppDispatch, useAppSelector } from '../../redux'
import { selectIsFileOpen } from '../../redux/database'
import { ProjectGroup, selectGroupsWithoutCategory } from '../../redux/groups'
import { setCurrentGroupId } from '../../redux/uiState'
import { capitalize } from '../../utils/capitalize'
import { mapBooleanToString } from '../../utils/map'
import { resolveIds } from '../../utils/resolveIds'
import { sortByProperty } from '../../utils/sortByProperty'
import { useOrderedCategories } from '../categories/useOrderedCategories'
import { Heroicon } from '../ui/Heroicon'
import { CategorizedLinkItems, LinkItem, LinkList } from '../ui/LinkList'
import { ToolbarContainer } from '../ui/toolbar/ToolbarContainer'
import { useGroupFromRoute } from './useGroupFromRoute'

export const GroupList: FC = () => {
  const { t } = useTranslation()
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
        id: null,
        name: capitalize(t('groups:list.specialItems.dashboard')),
        icon: <HomeIcon />,
        iconColor: '#0369A1',
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
            <div className="flex items-center gap-x-1">
              {importantProjectsCount > 0 ? (
                <div
                  className={classNames(
                    'flex w-10 items-center gap-x-0.5',
                    'text-xs font-semibold',
                    mapBooleanToString(
                      isCurrent,
                      'text-important-200',
                      'text-important-600',
                    ),
                  )}
                >
                  <Heroicon icon={<StarIcon />} iconType="micro" />
                  {importantProjectsCount}
                </div>
              ) : null}

              <div
                className={classNames(
                  'flex w-10 items-center gap-x-0.5',
                  'text-xs font-semibold',
                  mapBooleanToString(
                    isCurrent,
                    'text-accent-50',
                    'text-neutral-600',
                  ),
                )}
              >
                <Heroicon icon={<DocumentIcon />} iconType="micro" />
                {group.projects.length}
              </div>
            </div>
          )
        },
      }
    }

    const groupsWithoutCategory: CategorizedLinkItems = [
      [{ id: '', name: '' }, uncategorizedGroups.map(createLinkItem)],
    ]

    const categorizedGroups: CategorizedLinkItems = orderedCategories.map(
      (category) => {
        const categoryGroups = resolveIds(category.groups, groups)
        const categoryLinkItems = categoryGroups
          .map(createLinkItem)
          .sort(sortByProperty((item) => item.name))

        return [category, categoryLinkItems]
      },
    )

    return [...groupsWithoutCategory, ...categorizedGroups]
  }, [orderedCategories, uncategorizedGroups, projects, groups])

  const currentId = useMemo<LinkItem['id']>(() => {
    return location.pathname === `/groups` ? null : groupId
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
          buttonType: 'flat',
          label: t('groups:list.toolbar.addGroup'),
          icon: <FolderPlusIcon />,
          action: handleAddGroupButtonClick,
        },
        { type: 'expander' },
        {
          type: 'button',
          buttonType: 'flat',
          label: t('groups:list.toolbar.manageCategories'),
          icon: <TagIcon />,
          action: handleManageCategoriesButtonClick,
        },
      ]}
    >
      <div className="overflow-y-auto">
        <LinkList
          items={items}
          prefixedItems={prefixedItems}
          showIcons={true}
          defaultIcon={<FolderIcon />}
          urlPrefix="/groups"
          currentId={currentId}
          onItemClick={handleItemClick}
        />
      </div>
    </ToolbarContainer>
  )
}

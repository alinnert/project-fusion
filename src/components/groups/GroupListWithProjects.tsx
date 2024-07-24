import { FolderIcon } from '@heroicons/react/20/solid'
import { Dictionary } from '@reduxjs/toolkit'
import classNames from 'classnames'
import React, { FC, Fragment, ReactElement, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'
import { useAppSelector } from '../../redux'
import { Category, NO_CATEGORY } from '../../redux/categories'
import { ProjectGroup, selectGroupsWithoutCategory } from '../../redux/groups'
import { Project } from '../../redux/projects'
import { isDefined } from '../../utils/isDefined'
import { sortByProperty } from '../../utils/sortByProperty'
import { ProjectListItem } from '../projects/ProjectListItem'
import { useGetProjectsFromGroup } from '../projects/useProjectsFromGroup'
import { useSortMenu } from '../projects/useSortMenu'
import { Heroicon } from '../ui/Heroicon'
import { PageContent } from '../ui/PageContent'
import { TextDivider } from '../ui/TextDivider'

interface Props {
  groups: Dictionary<ProjectGroup>
  title?: string
  titleIcon?: ReactElement
  titleIconClassName?: string
  emptyPlaceholder?: ReactElement
  showTitleWhenEmpty?: boolean
  showProject?: (project: Project, group: ProjectGroup) => boolean
}

export const GroupListWithProjects: FC<Props> = ({
  groups,
  title,
  titleIcon,
  titleIconClassName,
  emptyPlaceholder,
  showTitleWhenEmpty = true,
  showProject,
}) => {
  const navigate = useNavigate()
  const { t } = useTranslation()

  const getProjectsFromGroup = useGetProjectsFromGroup()
  const categoryEntities = useAppSelector((state) => state.categories.entities)
  const categoryOrder = useAppSelector((state) => state.settings.categoryOrder)
  const groupsWithoutCategory = useAppSelector(selectGroupsWithoutCategory)
  const { sortMenu } = useSortMenu()

  const projectsSortOrder = useAppSelector(
    (state) => state.settings.projectsSortOrder,
  )

  const categories = useMemo(() => {
    return categoryOrder
      .map((categoryId) => categoryEntities[categoryId])
      .filter(isDefined)
  }, [categoryEntities, categoryOrder])

  const filteredGroups = useMemo<Record<ProjectGroup['id'], Project[]>>(() => {
    const result: Record<ProjectGroup['id'], Project[]> = {}

    for (const group of Object.values(groups).filter(isDefined)) {
      const projects = getProjectsFromGroup(group).filter(
        (project) => showProject?.(project, group) ?? true,
      )
      if (projects.length === 0) continue
      result[group.id] = projects
    }

    return result
  }, [getProjectsFromGroup, groups, showProject])

  const filteredGroupIds = useMemo(
    () => Object.keys(filteredGroups),
    [filteredGroups],
  )

  const filteredCategories = useMemo<
    Record<Category['id'], ProjectGroup[]>
  >(() => {
    const result: Record<Category['id'], ProjectGroup[]> = {}

    for (const category of categories) {
      const visibleGroupIds = category.groups.filter((groupId) =>
        filteredGroupIds.includes(groupId),
      )

      if (visibleGroupIds.length === 0) continue

      result[category.id] = visibleGroupIds
        .map((groupId) => groups[groupId])
        .filter(isDefined)
    }

    return result
  }, [categories, filteredGroupIds, groups])

  const groupsWithoutCategories = useMemo(() => {
    return groupsWithoutCategory
      .filter(({ id }) => filteredGroupIds.includes(id))
      .filter(isDefined)
  }, [filteredGroupIds, groupsWithoutCategory])

  const categoriesToDisplay = useMemo(() => {
    if (groupsWithoutCategories.length > 0) {
      return [
        [NO_CATEGORY, groupsWithoutCategories] as [
          typeof NO_CATEGORY,
          ProjectGroup[],
        ],
        ...Object.entries(filteredCategories),
      ]
    }

    return Object.entries(filteredCategories)
  }, [filteredCategories, groupsWithoutCategories])

  const isEmpty = useMemo(() => {
    return Object.keys(filteredGroups).length === 0
  }, [filteredGroups])

  if (isEmpty && !showTitleWhenEmpty && emptyPlaceholder !== undefined) {
    return emptyPlaceholder
  }

  return (
    <PageContent
      title={title}
      titleButtons={<>{sortMenu}</>}
      icon={titleIcon}
      iconType="mini"
      iconClassName={titleIconClassName}
      dimmed
    >
      {isEmpty
        ? emptyPlaceholder
        : categoriesToDisplay.map(([categoryId, groups]) => (
            <Fragment
              key={
                typeof categoryId === 'symbol'
                  ? categoryId.toString()
                  : categoryId
              }
            >
              <TextDivider
                label={
                  typeof categoryId === 'string'
                    ? (categoryEntities[categoryId]?.name ?? '-')
                    : t('groups:list.noCategory')
                }
                color="brand"
                className="mb-4 first:mt-4 not-first:mt-12"
              />

              {groups.sort(sortByProperty((item) => item.name)).map((group) => (
                <Fragment key={group.id}>
                  <h3
                    className={classNames(
                      'flex items-center',
                      'text-base font-semibold',
                      'hover:bg-neutral-200 active:bg-neutral-300',
                      'mb-2 mt-4 px-2 py-1',
                      'rounded-md',
                    )}
                    onClick={() => navigate(`/groups/${group.id}`)}
                  >
                    <Heroicon
                      icon={<FolderIcon />}
                      color={group.color}
                      iconType="mini"
                      scale={1}
                      className="mr-2"
                    />
                    {group.name}
                  </h3>

                  {filteredGroups[group.id]
                    .sort(
                      sortByProperty((item) => item[projectsSortOrder.sortBy], {
                        direction: projectsSortOrder.sortOrder,
                      }),
                    )
                    .map((project) => (
                      <ProjectListItem key={project.id} {...project} />
                    ))}
                </Fragment>
              ))}
            </Fragment>
          ))}
    </PageContent>
  )
}

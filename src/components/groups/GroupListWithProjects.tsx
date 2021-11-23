import { FolderIcon } from '@heroicons/react/solid'
import { Dictionary } from '@reduxjs/toolkit'
import classNames from 'classnames'
import React, { FC, ReactElement, useMemo } from 'react'
import { useNavigate } from 'react-router'
import { useAppSelector } from '../../redux'
import { Category } from '../../redux/categories'
import { ProjectGroup } from '../../redux/groups'
import { Project } from '../../redux/projects'
import { isDefined } from '../../utils/isDefined'
import { sortByProperty } from '../../utils/sortByProperty'
import { ProjectListItem } from '../projects/ProjectListItem'
import { useGetProjectsFromGroup } from '../projects/useProjectsFromGroup'
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

  const getProjectsFromGroup = useGetProjectsFromGroup()
  const categories = useAppSelector((state) => state.categories.entities)

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

  const filteredCategories = useMemo<
    Record<Category['id'], ProjectGroup[]>
  >(() => {
    const result: Record<Category['id'], ProjectGroup[]> = {}
    const filteredGroupIds = Object.keys(filteredGroups)

    for (const category of Object.values(categories).filter(isDefined)) {
      const visibleGroupIds = category.groups.filter((groupId) =>
        filteredGroupIds.includes(groupId),
      )

      if (visibleGroupIds.length === 0) continue

      result[category.id] = visibleGroupIds
        .map((groupId) => groups[groupId])
        .filter(isDefined)
    }

    return result
  }, [categories, filteredGroups, groups])

  const isEmpty = useMemo(() => {
    return Object.keys(filteredGroups).length === 0
  }, [filteredGroups])

  if (isEmpty && !showTitleWhenEmpty && emptyPlaceholder !== undefined) {
    return emptyPlaceholder
  }

  return (
    <PageContent
      title={title}
      titleIcon={titleIcon}
      titleIconType="outline"
      titleIconClassName={titleIconClassName}
    >
      {isEmpty
        ? emptyPlaceholder
        : Object.entries(filteredCategories).map(([categoryId, groups]) => (
            <div key={categoryId}>
              <TextDivider
                label={categories[categoryId]?.name ?? '-'}
                color="brand"
                className="mt-8 mb-4"
              />

              {groups.sort(sortByProperty('name')).map((group) => (
                <div key={group.id}>
                  <h3
                    style={{ backgroundColor: group.color }}
                    className={classNames(
                      'flex items-center',
                      'text-lg font-semibold',
                      'hover:opacity-80 active:opacity-70',
                      'text-white',
                      'mb-2 p-2',
                      'rounded-md',
                    )}
                    onClick={() => navigate(`/groups/${group.id}`)}
                  >
                    <Heroicon
                      icon={<FolderIcon />}
                      color="#ffffffcc"
                      iconType="solid"
                      scale={1.5}
                      className="mr-2"
                    />
                    {group.name}
                  </h3>

                  {filteredGroups[group.id]
                    .sort(sortByProperty('name'))
                    .map((project) => (
                      <ProjectListItem key={project.id} {...project} />
                    ))}
                </div>
              ))}
            </div>
          ))}
    </PageContent>
  )
}

import React, { FC, useCallback, useMemo } from 'react'
import { GroupListWithProjects } from '../../components/groups/GroupListWithProjects'
import { useAppSelector } from '../../redux'
import { ProjectGroup } from '../../redux/groups'
import { Project } from '../../redux/projects'
import { isDefined } from '../../utils/isDefined'
import { sortByProperty } from '../../utils/sortByProperty'

export const Favorites: FC = () => {
  const groupDictionary = useAppSelector((state) => state.groups.entities)

  const groups = useMemo<ProjectGroup[]>(() => {
    return Object.values(groupDictionary)
      .filter(isDefined)
      .sort(sortByProperty('name'))
  }, [groupDictionary])

  const showProject = useCallback((project: Project): boolean => {
    return project.important && !project.archived
  }, [])

  return <GroupListWithProjects groups={groups} showProject={showProject} />
}

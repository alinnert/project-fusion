import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import React, { FC, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { GroupListWithProjects } from '../components/groups/GroupListWithProjects'
import { useAppSelector } from '../redux'
import { Project } from '../redux/projects'

export const Search: FC = () => {
  const { t } = useTranslation()

  const { searchTerm } = useParams()
  const searchTermRegExp = useMemo<RegExp>(
    () => new RegExp(searchTerm ?? '', 'i'),
    [searchTerm],
  )

  const groups = useAppSelector((state) => state.groups.entities)

  function showProject(project: Project): boolean {
    if (project.projectNumber === searchTerm) return true
    if (searchTermRegExp.test(project.name)) return true
    if (searchTermRegExp.test(project.notes)) return true
    return false
  }

  return (
    <GroupListWithProjects
      title={`${t('search:terms.search')}: "${searchTerm}"`}
      titleIcon={<MagnifyingGlassIcon />}
      titleIconClassName="text-brand-700"
      groups={groups}
      showProject={showProject}
    />
  )
}

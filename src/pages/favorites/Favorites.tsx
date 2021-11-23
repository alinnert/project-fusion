import { StarIcon } from '@heroicons/react/outline'
import React, { FC, useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { GroupListWithProjects } from '../../components/groups/GroupListWithProjects'
import { EmptyText } from '../../components/ui/EmptyText'
import { useAppSelector } from '../../redux'
import { ProjectGroup } from '../../redux/groups'
import { Project } from '../../redux/projects'
import { translationNamespaces } from '../../utils/i18next-namespaces'
import { isDefined } from '../../utils/isDefined'
import { sortByProperty } from '../../utils/sortByProperty'

export const Favorites: FC = () => {
  const { t } = useTranslation(translationNamespaces)

  const groups = useAppSelector((state) => state.groups.entities)

  const showProject = useCallback((project: Project): boolean => {
    return project.important && !project.archived
  }, [])

  return (
    <GroupListWithProjects
      groups={groups}
      title={t('groups:terms.favorites')}
      titleIcon={<StarIcon />}
      titleIconClassName="text-yellow-600"
      showTitleWhenEmpty={false}
      showProject={showProject}
      emptyPlaceholder={
        <EmptyText
          title={t('projects:favorites.noFavorites.title')}
          icon={<StarIcon />}
        >
          {t('projects:favorites.noFavorites.body')}
        </EmptyText>
      }
    />
  )
}

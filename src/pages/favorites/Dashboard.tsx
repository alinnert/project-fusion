import { StarIcon } from '@heroicons/react/24/outline'
import { HomeIcon } from '@heroicons/react/20/solid'
import React, { FC, useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { GroupListWithProjects } from '../../components/groups/GroupListWithProjects'
import { EmptyText } from '../../components/ui/EmptyText'
import { PageContent } from '../../components/ui/PageContent'
import {
  ToolbarContainer,
  ToolbarItem,
} from '../../components/ui/toolbar/ToolbarContainer'
import { useAppSelector } from '../../redux'
import { Project } from '../../redux/projects'
import { translationNamespaces } from '../../utils/i18next-namespaces'

export const Dashboard: FC = () => {
  const { t } = useTranslation(translationNamespaces)

  const groups = useAppSelector((state) => state.groups.entities)

  const showProject = useCallback((project: Project): boolean => {
    return project.important && !project.archived
  }, [])

  const toolbarItems = useMemo<ToolbarItem[]>(() => {
    return [
      // {
      //   type: 'button',
      //   label: t('common:buttons.edit'),
      //   icon: <PencilIcon />,
      //   action() {
      //     console.log('hi')
      //   },
      // },
    ]
  }, [])

  return (
    <ToolbarContainer
      title={t('groups:list.specialItems.dashboard')}
      icon={{ element: <HomeIcon />, className: 'text-brand-700' }}
      toolbarItems={toolbarItems}
      toolbarPadding="lg"
    >
      <PageContent centered></PageContent>

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
    </ToolbarContainer>
  )
}

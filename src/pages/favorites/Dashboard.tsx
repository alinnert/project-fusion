import { PencilIcon } from '@heroicons/react/16/solid'
import { HomeIcon, StarIcon } from '@heroicons/react/20/solid'
import React, { FC, useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { GroupListWithProjects } from '../../components/groups/GroupListWithProjects'
import { EmptyText } from '../../components/ui/EmptyText'
import { Markdown } from '../../components/ui/Markdown'
import { PageContent } from '../../components/ui/PageContent'
import {
  ToolbarContainer,
  ToolbarItem,
} from '../../components/ui/toolbar/ToolbarContainer'
import { useAppSelector } from '../../redux'
import { Project } from '../../redux/projects'

export const Dashboard: FC = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const groups = useAppSelector((state) => state.groups.entities)
  const notes = useAppSelector((state) => state.dashboard.notes)

  const showProject = useCallback((project: Project): boolean => {
    return project.important && !project.archived
  }, [])

  const toolbarItems = useMemo((): ToolbarItem[] => {
    return [
      {
        type: 'button',
        label: t('common:buttons.edit'),
        icon: <PencilIcon />,
        action() {
          navigate('/groups/dashboard/edit')
        },
      },
    ]
  }, [navigate, t])

  return (
    <ToolbarContainer
      title={t('groups:list.specialItems.dashboard') ?? undefined}
      icon={{ element: <HomeIcon />, className: 'text-brand-700' }}
      toolbarItems={toolbarItems}
      toolbarPadding="lg"
    >
      <PageContent centered>
        <Markdown text={notes} />
      </PageContent>

      <GroupListWithProjects
        groups={groups}
        title={t('groups:terms.favorites') ?? undefined}
        titleIcon={<StarIcon />}
        titleIconClassName="text-yellow-600"
        showTitleWhenEmpty={false}
        showProject={showProject}
        emptyPlaceholder={
          <EmptyText
            title={t('projects:favorites.noFavorites.title') ?? undefined}
            icon={<StarIcon />}
          >
            {t('projects:favorites.noFavorites.body')}
          </EmptyText>
        }
      />
    </ToolbarContainer>
  )
}

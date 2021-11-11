import Head from 'next/head'
import React, { ReactElement } from 'react'
import { useTranslation } from 'react-i18next'
import { Layout } from '../../../components/app/Layout'
import { GroupDetailView } from '../../../components/groups/GroupDetailView'
import { GroupList } from '../../../components/groups/GroupList'
import { ProjectEditForm } from '../../../components/projects/ProjectEditForm'
import { useAppSelector } from '../../../redux'
import { ProjectTemplate } from '../../../redux/projects'
import { getPageTitle } from '../../../utils/getPageTitle'
import { translationNamespaces } from '../../../utils/i18next-namespaces'
import { useQueryParam } from '../../../utils/useQueryParams'

export default function NewProject(): ReactElement | null {
  const { t } = useTranslation(translationNamespaces)
  const from = useQueryParam('from')

  const projectTemplate = useAppSelector((state): ProjectTemplate | null => {
    if (from === undefined) return null
    const project = (state.projects.entities[from] as ProjectTemplate) ?? null
    if (project === null) return null
    const template = { ...project }
    Reflect.deleteProperty(template, 'id')
    return template
  })

  return (
    <>
      <Head>
        <title>{getPageTitle(t('projects:editForm.create.pageTitle'))}</title>
      </Head>

      <Layout
        left={<GroupList />}
        right={<ProjectEditForm init={projectTemplate} />}
      >
        <GroupDetailView />
      </Layout>
    </>
  )
}

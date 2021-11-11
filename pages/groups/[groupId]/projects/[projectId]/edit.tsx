import Head from 'next/head'
import React, { ReactElement } from 'react'
import { useTranslation } from 'react-i18next'
import { Layout } from '../../../../../components/app/Layout'
import { GroupDetailView } from '../../../../../components/groups/GroupDetailView'
import { GroupList } from '../../../../../components/groups/GroupList'
import { ProjectEditForm } from '../../../../../components/projects/ProjectEditForm'
import { useProjectFromRoute } from '../../../../../components/projects/useProjectFromRoute'
import { getPageTitle } from '../../../../../utils/getPageTitle'
import { translationNamespaces } from '../../../../../utils/i18next-namespaces'

export default function EditProject(): ReactElement | null {
  const { t } = useTranslation(translationNamespaces)
  const { project } = useProjectFromRoute()

  return (
    <>
      <Head>
        <title>{getPageTitle(t('projects:editForm.edit.pageTitle'))}</title>
      </Head>

      <Layout left={<GroupList />} right={<ProjectEditForm init={project} />}>
        <GroupDetailView />
      </Layout>
    </>
  )
}

import Head from 'next/head'
import React, { ReactElement } from 'react'
import { useTranslation } from 'react-i18next'
import { Layout } from '../components/app/Layout'
import { GroupEditForm } from '../components/groups/GroupEditForm'
import { GroupList } from '../components/groups/GroupList'
import { getPageTitle } from '../utils/getPageTitle'
import { translationNamespaces } from '../utils/i18next-namespaces'

export default function NewGroup(): ReactElement | null {
  const { t } = useTranslation(translationNamespaces)

  return (
    <>
      <Head>
        <title>{getPageTitle(t('groups:editForm.create.pageTitle'))}</title>
      </Head>

      <Layout left={<GroupList />}>
        <GroupEditForm />
      </Layout>
    </>
  )
}

import { GetStaticPaths, GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import Head from 'next/head'
import React, { ReactElement } from 'react'
import { Layout } from '../../../components/app/Layout'
import { GroupDetailView } from '../../../components/groups/GroupDetailView'
import { GroupList } from '../../../components/groups/GroupList'
import { ProjectEditForm } from '../../../components/projects/ProjectEditForm'
import { useAppSelector } from '../../../redux'
import { selectIsFileOpen } from '../../../redux/database'
import { getPageTitle } from '../../../utils/getPageTitle'
import { getServerSideTranslations } from '../../../utils/getServerSideTranslations'

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const translations = await getServerSideTranslations(locale)
  return { props: { ...translations } }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: 'blocking' }
}

export default function NewProject(): ReactElement | null {
  const { t } = useTranslation()

  return (
    <>
      <Head>
        <title>{getPageTitle(t('projects:editForm.create.pageTitle'))}</title>
      </Head>

      <Layout left={<GroupList />} right={<ProjectEditForm />}>
        <GroupDetailView />
      </Layout>
    </>
  )
}

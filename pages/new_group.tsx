import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import Head from 'next/head'
import React, { ReactElement } from 'react'
import { Layout } from '../components/app/Layout'
import { GroupEditForm } from '../components/groups/GroupEditForm'
import { GroupList } from '../components/groups/GroupList'
import { getPageTitle } from '../utils/getPageTitle'
import { getServerSideTranslations } from '../utils/getServerSideTranslations'

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const translations = await getServerSideTranslations(locale)
  return { props: { ...translations } }
}

export default function NewGroup(): ReactElement | null {
  const { t } = useTranslation()

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

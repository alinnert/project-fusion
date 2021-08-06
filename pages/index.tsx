import { SparklesIcon } from '@heroicons/react/outline'
import { DatabaseIcon } from '@heroicons/react/solid'
import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import Head from 'next/head'
import React, { ReactElement } from 'react'
import { Layout } from '../components/app/Layout'
import { GroupList } from '../components/groups/GroupList'
import { EmptyText } from '../components/ui/EmptyText'
import { useAppSelector } from '../redux'
import { selectIsFileOpen } from '../redux/database'
import { getPageTitle } from '../utils/getPageTitle'
import { getServerSideTranslations } from '../utils/getServerSideTranslations'

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const translations = await getServerSideTranslations(locale)
  return { props: { ...translations } }
}

export default function Home(): ReactElement | null {
  const { t } = useTranslation()
  const isFileOpen = useAppSelector(selectIsFileOpen)

  return (
    <>
      <Head>
        <title>{getPageTitle()}</title>
      </Head>

      {isFileOpen ? (
        <Layout left={<GroupList />}>
          <EmptyText
            title={t('welcome:fileOpen.title')}
            icon={<DatabaseIcon />}
          >
            {t('welcome:fileOpen.body')}
          </EmptyText>
        </Layout>
      ) : (
        <Layout>
          <EmptyText
            title={t('welcome:noFileOpen.title')}
            icon={<SparklesIcon />}
          >
            {t('welcome:noFileOpen.body')}
          </EmptyText>
        </Layout>
      )}
    </>
  )
}

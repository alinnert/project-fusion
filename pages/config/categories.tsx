import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import Head from 'next/head'
import React, { ReactElement } from 'react'
import { Layout } from '../../components/app/Layout'
import { CategorySettings } from '../../components/settings/CategorySettings'
import { SettingsPagesList } from '../../components/settings/SettingsPagesList'
import { useSettings } from '../../components/settings/useSettings'
import { getPageTitle } from '../../utils/getPageTitle'
import { getServerSideTranslations } from '../../utils/getServerSideTranslations'

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const translations = await getServerSideTranslations(locale)
  return { props: { ...translations } }
}

export default function Categories(): ReactElement | null {
  const { t } = useTranslation()
  const { databaseSettings } = useSettings()

  return (
    <>
      <Head>
        <title>
          {getPageTitle(
            `${t('settings:index.title')}: ${t('settings:categories.title')}`,
          )}
        </title>
      </Head>

      <Layout
        left={
          <SettingsPagesList currentId={databaseSettings.categories.id} />
        }
      >
        <CategorySettings />
      </Layout>
    </>
  )
}

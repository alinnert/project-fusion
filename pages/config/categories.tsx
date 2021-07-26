import { GetStaticProps } from 'next'
import Head from 'next/head'
import React, { ReactElement } from 'react'
import { Layout } from '../../components/app/Layout'
import { CategorySettings } from '../../components/settings/CategorySettings'
import { SettingsCategoryList } from '../../components/settings/SettingsCategoryList'
import { useSettings } from '../../components/settings/useSettings'
import { getPageTitle } from '../../utils/getPageTitle'
import { getServerSideTranslations } from '../../utils/getServerSideTranslations'

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const translations = await getServerSideTranslations(locale)
  return { props: { ...translations } }
}

export default function Categories(): ReactElement | null {
  const { databaseSettings } = useSettings()

  return (
    <>
      <Head>
        <title>{getPageTitle('Einstellungen: Kategorien')}</title>
      </Head>

      <Layout
        left={
          <SettingsCategoryList currentId={databaseSettings.categories.id} />
        }
      >
        <CategorySettings />
      </Layout>
    </>
  )
}

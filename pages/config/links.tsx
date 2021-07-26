import { GetStaticProps } from 'next'
import Head from 'next/head'
import React, { ReactElement } from 'react'
import { Layout } from '../../components/app/Layout'
import { SettingsCategoryList } from '../../components/settings/SettingsCategoryList'
import { getPageTitle } from '../../utils/getPageTitle'
import { getServerSideTranslations } from '../../utils/getServerSideTranslations'

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const translations = await getServerSideTranslations(locale)
  return { props: { ...translations } }
}

export default function Links(): ReactElement | null {
  return (
    <>
      <Head>
        <title>{getPageTitle('Einstellungen: Links')}</title>
      </Head>

      <Layout left={<SettingsCategoryList currentId="links" />}>
        <div>URLs-Konfiguration</div>
      </Layout>
    </>
  )
}

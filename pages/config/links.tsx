import Head from 'next/head'
import React, { ReactElement } from 'react'
import { Layout } from '../../components/app/Layout'
import { SettingsCategoryList } from '../../components/settings/SettingsCategoryList'
import { getPageTitle } from '../../tools/getPageTitle'

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

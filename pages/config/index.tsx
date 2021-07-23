import { CogIcon } from '@heroicons/react/outline'
import Head from 'next/head'
import React, { ReactElement } from 'react'
import { Layout } from '../../components/app/Layout'
import { SettingsCategoryList } from '../../components/settings/SettingsCategoryList'
import { EmptyText } from '../../components/ui/EmptyText'
import { getPageTitle } from '../../tools/getPageTitle'

export default function Config(): ReactElement | null {
  return (
    <>
      <Head>
        <title>{getPageTitle('Einstellungen')}</title>
      </Head>

      <Layout left={<SettingsCategoryList currentId="" />}>
        <EmptyText title="Einstellungen" icon={<CogIcon />}>
          Hier kannst du Einstellungen für die aktuelle Datei ändern.
        </EmptyText>
      </Layout>
    </>
  )
}

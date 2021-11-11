import Head from 'next/head'
import React, { ReactElement } from 'react'
import { useTranslation } from 'react-i18next'
import { Layout } from '../../components/app/Layout'
import { CategorySettings } from '../../components/settings/CategorySettings'
import { SettingsPagesList } from '../../components/settings/SettingsPagesList'
import { useSettings } from '../../components/settings/useSettings'
import { getPageTitle } from '../../utils/getPageTitle'
import { translationNamespaces } from '../../utils/i18next-namespaces'

export default function Categories(): ReactElement | null {
  const { t } = useTranslation(translationNamespaces)
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
        left={<SettingsPagesList currentId={databaseSettings.categories.id} />}
      >
        <CategorySettings />
      </Layout>
    </>
  )
}

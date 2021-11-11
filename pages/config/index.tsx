import { CogIcon } from '@heroicons/react/outline'
import Head from 'next/head'
import React, { ReactElement } from 'react'
import { useTranslation } from 'react-i18next'
import { Layout } from '../../components/app/Layout'
import { SettingsPagesList } from '../../components/settings/SettingsPagesList'
import { EmptyText } from '../../components/ui/EmptyText'
import { getPageTitle } from '../../utils/getPageTitle'
import { translationNamespaces } from '../../utils/i18next-namespaces'

export default function Config(): ReactElement | null {
  const { t } = useTranslation(translationNamespaces)

  return (
    <>
      <Head>
        <title>{getPageTitle(t('settings:index.title'))}</title>
      </Head>

      <Layout left={<SettingsPagesList currentId="" />}>
        <EmptyText title={t('settings:index.title')} icon={<CogIcon />}>
          {t('settings:index.body')}
        </EmptyText>
      </Layout>
    </>
  )
}

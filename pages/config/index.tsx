import { CogIcon } from '@heroicons/react/outline'
import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import Head from 'next/head'
import React, { ReactElement } from 'react'
import { Layout } from '../../components/app/Layout'
import { SettingsPagesList } from '../../components/settings/SettingsPagesList'
import { EmptyText } from '../../components/ui/EmptyText'
import { getPageTitle } from '../../utils/getPageTitle'
import { getServerSideTranslations } from '../../utils/getServerSideTranslations'

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const translations = await getServerSideTranslations(locale)
  return { props: { ...translations } }
}

export default function Config(): ReactElement | null {
  const { t } = useTranslation()

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

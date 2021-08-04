import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import Head from 'next/head'
import React, { ReactElement } from 'react'
import { Layout } from '../../components/app/Layout'
import { SettingsPagesList } from '../../components/settings/SettingsPagesList'
import { PageContent } from '../../components/ui/PageContent'
import { getPageTitle } from '../../utils/getPageTitle'
import { getServerSideTranslations } from '../../utils/getServerSideTranslations'

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const translations = await getServerSideTranslations(locale)
  return { props: { ...translations } }
}

export default function Links(): ReactElement | null {
  const { t } = useTranslation()

  return (
    <>
      <Head>
        <title>{getPageTitle(t('settings:links.title'))}</title>
      </Head>

      <Layout left={<SettingsPagesList currentId="links" />}>
        <PageContent title={t('settings:links.title')} centered={true}>
          {t('settings:links.description')}
        </PageContent>
      </Layout>
    </>
  )
}

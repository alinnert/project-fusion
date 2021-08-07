import { i18n } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import config from '../next-i18next.config'

export async function getServerSideTranslations(locale?: string): Promise<{}> {
  if (process.env.NODE_ENV === 'development') {
    await i18n?.reloadResources()
  }

  const namespaces = [
    'common',
    'welcome',
    'info',
    'groups',
    'projects',
    'settings',
    'search',
  ]

  return locale !== undefined
    ? await serverSideTranslations(locale, namespaces, config)
    : {}
}

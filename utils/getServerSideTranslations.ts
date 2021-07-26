import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import config from '../next-i18next.config'

export async function getServerSideTranslations(locale?: string): Promise<{}> {
  const namespaces = [
    'common',
    'welcome',
    'info',
    'groups',
    'projects',
    'settings',
  ]

  return locale !== undefined
    ? await serverSideTranslations(locale, namespaces, config)
    : {}
}

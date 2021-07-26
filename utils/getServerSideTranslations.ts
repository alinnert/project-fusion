import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export async function getServerSideTranslations(locale?: string): Promise<{}> {
  const namespaces = ['common', 'welcome', 'info']

  return locale !== undefined
    ? await serverSideTranslations(locale, namespaces)
    : {}
}

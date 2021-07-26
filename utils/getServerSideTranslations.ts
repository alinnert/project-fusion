import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export async function getServerSideTranslations(locale?: string): Promise<{}> {
  return locale !== undefined
    ? await serverSideTranslations(locale, ['common'])
    : {}
}

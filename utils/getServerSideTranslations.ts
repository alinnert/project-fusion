import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import config from '../next-i18next.config'

export async function getServerSideTranslations(locale?: string): Promise<{}> {
  return locale !== undefined
    ? await serverSideTranslations(locale, ['common'], config)
    : {}
}

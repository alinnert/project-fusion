import { GetStaticProps, GetStaticPaths } from 'next'
import { useTranslation } from 'next-i18next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { ReactElement, useMemo } from 'react'
import { Layout } from '../../../components/app/Layout'
import { getPageTitle } from '../../../utils/getPageTitle'
import { getServerSideTranslations } from '../../../utils/getServerSideTranslations'

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const translations = await getServerSideTranslations(locale)
  return { props: { ...translations } }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: 'blocking' }
}

export default function SearchPageWithTerm(): ReactElement | null {
  const router = useRouter()
  const { t } = useTranslation()

  const searchTerm = useMemo((): string => {
    const searchTerm = router.query.searchTerm

    return Array.isArray(searchTerm) ? searchTerm[0] : searchTerm ?? ''
  }, [router.query.searchTerm])

  return (
    <>
      <Head>
        <title>
          {getPageTitle(`${t('search:terms.search')}: ${searchTerm}`)}
        </title>
      </Head>

      <Layout>
        Search term: {searchTerm}
      </Layout>
    </>
  )
}

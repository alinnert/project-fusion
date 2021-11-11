import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { ReactElement, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Layout } from '../../../components/app/Layout'
import { getPageTitle } from '../../../utils/getPageTitle'
import { translationNamespaces } from '../../../utils/i18next-namespaces'

export default function SearchPageWithTerm(): ReactElement | null {
  const router = useRouter()
  const { t } = useTranslation(translationNamespaces)

  const searchTerm = useMemo((): string => {
    const searchTerm = router.query.searchTerm

    return (Array.isArray(searchTerm) ? searchTerm[0] : searchTerm) ?? ''
  }, [router.query.searchTerm])

  return (
    <>
      <Head>
        <title>
          {getPageTitle(`${t('search:terms.search')}: ${searchTerm}`)}
        </title>
      </Head>

      <Layout>Search term: {searchTerm}</Layout>
    </>
  )
}

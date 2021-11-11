import { StarIcon } from '@heroicons/react/outline'
import Head from 'next/head'
import React, { ReactElement } from 'react'
import { useTranslation } from 'react-i18next'
import { Layout } from '../../components/app/Layout'
import { GroupList } from '../../components/groups/GroupList'
import { EmptyText } from '../../components/ui/EmptyText'
import { getPageTitle } from '../../utils/getPageTitle'
import { translationNamespaces } from '../../utils/i18next-namespaces'

export default function Favorites(): ReactElement | null {
  const { t } = useTranslation(translationNamespaces)

  return (
    <>
      <Head>
        <title>{getPageTitle('Favoriten')}</title>
      </Head>

      <Layout left={<GroupList currentId="/favorites" />}>
        <EmptyText
          title={t('projects:favorites.noFavorites.title')}
          icon={<StarIcon />}
        >
          {t('projects:favorites.noFavorites.body')}
        </EmptyText>
      </Layout>
    </>
  )
}

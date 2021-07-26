import { StarIcon } from '@heroicons/react/outline'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import React, { ReactElement } from 'react'
import { Layout } from '../../components/app/Layout'
import { GroupList } from '../../components/groups/GroupList'
import { EmptyText } from '../../components/ui/EmptyText'
import { useAppSelector } from '../../redux'
import { getPageTitle } from '../../utils/getPageTitle'
import { getServerSideTranslations } from '../../utils/getServerSideTranslations'

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const translations = await getServerSideTranslations(locale)
  return { props: { ...translations } }
}

export default function Favorites(): ReactElement | null {
  const filename = useAppSelector((state) => state.database.filename)

  return (
    <>
      <Head>
        <title>{getPageTitle('Favoriten')}</title>
      </Head>

      <Layout
        left={filename !== null ? <GroupList currentId="/favorites" /> : null}
      >
        <EmptyText
          title="Keine wichtigen Projekte vorhanden"
          icon={<StarIcon />}
        >
          Hier erscheinen alle Projekte, die als &quot;wichtig&quot; markiert
          wurden.
        </EmptyText>
      </Layout>
    </>
  )
}

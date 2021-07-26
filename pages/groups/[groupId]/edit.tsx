import { BanIcon } from '@heroicons/react/solid'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import React, { ReactElement } from 'react'
import { Layout } from '../../../components/app/Layout'
import { GroupEditForm } from '../../../components/groups/GroupEditForm'
import { useGroupFromRoute } from '../../../components/groups/useGroupFromRoute'
import { EmptyText } from '../../../components/ui/EmptyText'
import { getPageTitle } from '../../../utils/getPageTitle'
import { getServerSideTranslations } from '../../../utils/getServerSideTranslations'

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const translations = await getServerSideTranslations(locale)
  return { props: { ...translations } }
}

export default function Page(): ReactElement | null {
  const { group, groupId } = useGroupFromRoute()

  if (group === null) {
    return (
      <>
        <Head>
          <title>{getPageTitle('Unbekannte Gruppe')}</title>
        </Head>

        <Layout>
          <EmptyText title="Keine Gruppe gefunden" icon={<BanIcon />}>
            Es wurde keine Gruppe mit der ID &quot;{groupId}&quot; gefunden.
          </EmptyText>
        </Layout>
      </>
    )
  }

  return (
    <>
      <Head>
        <title>{getPageTitle(`${group.name} bearbeiten`)}</title>
      </Head>

      <GroupEditForm init={group} />
    </>
  )
}

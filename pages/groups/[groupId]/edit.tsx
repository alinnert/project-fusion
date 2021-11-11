import { BanIcon } from '@heroicons/react/solid'
import Head from 'next/head'
import React, { ReactElement } from 'react'
import { Layout } from '../../../components/app/Layout'
import { GroupEditForm } from '../../../components/groups/GroupEditForm'
import { GroupList } from '../../../components/groups/GroupList'
import { useGroupFromRoute } from '../../../components/groups/useGroupFromRoute'
import { EmptyText } from '../../../components/ui/EmptyText'
import { getPageTitle } from '../../../utils/getPageTitle'

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

      <Layout left={<GroupList />}>
        <GroupEditForm init={group} />
      </Layout>
    </>
  )
}

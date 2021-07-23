import Head from 'next/head'
import React, { ReactElement } from 'react'
import { GroupEditForm } from '../components/groups/GroupEditForm'
import { getPageTitle } from '../tools/getPageTitle'

export default function NewGroup(): ReactElement | null {
  return (
    <>
      <Head>
        <title>{getPageTitle('Neue Gruppe')}</title>
      </Head>

      <GroupEditForm />
    </>
  )
}

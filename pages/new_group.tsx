import { GetStaticProps } from 'next'
import Head from 'next/head'
import React, { ReactElement } from 'react'
import { GroupEditForm } from '../components/groups/GroupEditForm'
import { getPageTitle } from '../utils/getPageTitle'
import { getServerSideTranslations } from '../utils/getServerSideTranslations'

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const translations = await getServerSideTranslations(locale)
  return { props: { ...translations } }
}

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

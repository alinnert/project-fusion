import { GetStaticProps } from 'next'
import Head from 'next/head'
import React, { ReactElement } from 'react'
import { Layout } from '../../../components/app/Layout'
import { GroupDetailView } from '../../../components/groups/GroupDetailView'
import { GroupList } from '../../../components/groups/GroupList'
import { useGroupFromRoute } from '../../../components/groups/useGroupFromRoute'
import { ProjectList } from '../../../components/projects/ProjectList'
import { useProjectsFromGroup } from '../../../components/projects/useProjectsFromGroup'
import { useAppSelector } from '../../../redux'
import { selectIsFileOpen } from '../../../redux/database'
import { getPageTitle } from '../../../utils/getPageTitle'
import { getServerSideTranslations } from '../../../utils/getServerSideTranslations'

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const translations = await getServerSideTranslations(locale)
  return { props: { ...translations } }
}

export default function GroupById(): ReactElement | null {
  const isFileOpen = useAppSelector(selectIsFileOpen)
  const { group } = useGroupFromRoute()
  const groupProjects = useProjectsFromGroup(group)

  return (
    <>
      <Head>
        <title>{getPageTitle(`${group?.name ?? '---'}`)}</title>
      </Head>

      <Layout
        left={isFileOpen ? <GroupList /> : null}
        right={<ProjectList projects={groupProjects} />}
      >
        {isFileOpen ? <GroupDetailView /> : null}
      </Layout>
    </>
  )
}

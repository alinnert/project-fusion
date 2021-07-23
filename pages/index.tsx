import { SparklesIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/router'
import React, { ReactElement, useEffect } from 'react'
import { GroupList } from '../components/groups/GroupList'
import { EmptyText } from '../components/ui/EmptyText'
import { Layout } from '../components/app/Layout'
import { useAppSelector } from '../redux'
import { selectIsFileOpen } from '../redux/database'
import Head from 'next/head'
import { getPageTitle } from '../tools/getPageTitle'

export default function Home(): ReactElement | null {
  const router = useRouter()
  const filename = useAppSelector((state) => state.database.filename)
  const isFileOpen = useAppSelector(selectIsFileOpen)

  useEffect(() => {
    if (filename === null) return
    router.push('/favorites')
  }, [filename, router])

  return (
    <>
      <Head>
        <title>{getPageTitle()}</title>
      </Head>

      <Layout left={isFileOpen ? <GroupList /> : null}>
        {isFileOpen ? (
          <EmptyText>Bitte wähle links eine Gruppe aus.</EmptyText>
        ) : (
          <EmptyText
            title="Willkommen bei ProjectFusion!"
            icon={<SparklesIcon />}
          >
            Erstelle eine neue Datenbank oder öffne eine vorhandene über das
            &quot;Datenbank&quot;-Menü oben links.
          </EmptyText>
        )}
      </Layout>
    </>
  )
}

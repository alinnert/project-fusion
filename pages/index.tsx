import { useRouter } from 'next/router'
import React, { ReactElement, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { GroupList } from '../components/groups/GroupList'
import { EmptyText } from '../components/ui/EmptyText'
import { Layout } from '../components/ui/Layout'
import { AppState } from '../redux'

export default function Home(): ReactElement | null {
  const router = useRouter()
  const fileData = useSelector((state: AppState) => state.dataFile.fileData)

  useEffect(() => {
    if (fileData === null) return
    router.push('/favorites')
  }, [fileData, router])

  return (
    <Layout left={fileData !== null ? <GroupList /> : null}>
      {fileData === null ? (
        <EmptyText>
          <p className="font-semibold mb-4">Willkommen bei ProjectFusion!</p>
          <p>
            Erstelle eine neue Datei oder öffne eine vorhandene über das
            &quot;Datei&quot;-Menü oben.
          </p>
        </EmptyText>
      ) : (
        <EmptyText>Bitte wähle links eine Gruppe aus.</EmptyText>
      )}
    </Layout>
  )
}

import { useRouter } from 'next/router'
import { ReactElement } from 'react'
import { Button } from '../components/ui/Button'
import { Layout } from '../components/ui/Layout'

export default function Config(): ReactElement {
  const router = useRouter()

  return (
    <Layout
      header={
        <>
          <Button showBorder={false} onClick={() => router.push('/')}>
            Daten
          </Button>
        </>
      }
    >
      <h1 className="text-3xl">Konfiguration</h1>
    </Layout>
  )
}

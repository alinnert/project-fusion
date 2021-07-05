import { useRouter } from 'next/router'
import { ReactElement } from 'react'
import { GroupList } from '../components/groups/GroupList'
import { Button } from '../components/ui/Button'
import { Layout } from '../components/ui/Layout'
import { ToolbarContainer } from '../components/ui/ToolbarContainer'

export default function Home(): ReactElement {
  const router = useRouter()

  return (
    <Layout
      header={
        <>
          <Button showBorder={false} onClick={() => router.push('/config')}>
            Einstellungen
          </Button>
        </>
      }
      left={
        <ToolbarContainer
          toolbarItems={[{ type: 'button', label: 'Neue Gruppe', action() {} }]}
        >
          <GroupList />
        </ToolbarContainer>
      }
      right={
        <ToolbarContainer
          toolbarItems={[
            { type: 'button', label: 'Neues Projekt', action() {} },
          ]}
        >
          <div>Detail-Content</div>
        </ToolbarContainer>
      }
    >
      <ToolbarContainer
        toolbarItems={[
          { type: 'button', label: 'Gruppe bearbeiten', action() {} },
          {
            type: 'button',
            buttonType: 'delete',
            label: 'Gruppe löschen',
            action() {},
          },
        ]}
      >
        <h1 className="text-3xl">{'---'}</h1>
      </ToolbarContainer>
    </Layout>
  )
}

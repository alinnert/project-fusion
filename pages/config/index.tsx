import { CogIcon } from '@heroicons/react/outline'
import React, { ReactElement } from 'react'
import { SettingsCategoryList } from '../../components/settings/SettingsCategoryList'
import { EmptyText } from '../../components/ui/EmptyText'
import { Layout } from '../../components/ui/Layout'

export default function Config(): ReactElement | null {
  return (
    <Layout left={<SettingsCategoryList currentId="" />}>
      <EmptyText title="Konfiguration" icon={<CogIcon />}>
        Hier kannst du Einstellungen für die aktuelle Datei ändern.
      </EmptyText>
    </Layout>
  )
}

import React, { ReactElement } from 'react'
import { SettingsCategoryList } from '../../components/settings/SettingsCategoryList'
import { EmptyText } from '../../components/ui/EmptyText'
import { Layout } from '../../components/ui/Layout'

export default function Config(): ReactElement | null {
  return (
    <Layout left={<SettingsCategoryList />}>
      <EmptyText>
        Wähle links eine Kategorie aus.
      </EmptyText>
    </Layout>
  )
}

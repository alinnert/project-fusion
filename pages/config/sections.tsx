import React, { ReactElement } from 'react'
import { SettingsCategoryList } from '../../components/settings/SettingsCategoryList'
import { Layout } from '../../components/app/Layout'

export default function Sections(): ReactElement | null {
  return (
    <Layout left={<SettingsCategoryList currentId="sections" />}>
      <div>Bereiche-Konfiguration</div>
    </Layout>
  )
}

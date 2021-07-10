import { ReactElement } from 'react'
import { SettingsCategoryList } from '../../components/settings/SettingsCategoryList'
import { Layout } from '../../components/app/Layout'

export default function Links(): ReactElement | null {
  return (
    <Layout left={<SettingsCategoryList currentId="links" />}>
      <div>URLs-Konfiguration</div>
    </Layout>
  )
}

import { useRouter } from 'next/router'
import React, { ReactElement } from 'react'
import { SettingsCategoryList } from '../../components/settings/SettingsCategoryList'
import { Layout } from '../../components/ui/Layout'

export default function Sections(): ReactElement | null {
  const router = useRouter()
  // const { param } = router.query

  return (
    <Layout left={<SettingsCategoryList />}>
      <div>Bereiche-Konfiguration</div>
    </Layout>
  )
}

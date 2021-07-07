import { useRouter } from 'next/router'
import { ReactElement } from 'react'
import { SettingsCategoryList } from '../../components/settings/SettingsCategoryList'
import { Layout } from '../../components/ui/Layout'

export default function Links(): ReactElement | null {
  const router = useRouter()
  // const { param } = router.query

  return (
    <Layout left={<SettingsCategoryList />}>
      <div>URLs-Konfiguration</div>
    </Layout>
  )
}

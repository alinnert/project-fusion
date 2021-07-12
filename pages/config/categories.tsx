import React, { ReactElement } from 'react'
import { Layout } from '../../components/app/Layout'
import { CategorySettings } from '../../components/settings/CategorySettings'
import { SettingsCategoryList } from '../../components/settings/SettingsCategoryList'
import { useSettings } from '../../components/settings/useSettings'

export default function Categories(): ReactElement | null {
  const { databaseSettings } = useSettings()

  return (
    <Layout
      left={<SettingsCategoryList currentId={databaseSettings.categories.id} />}
    >
      <CategorySettings />
    </Layout>
  )
}

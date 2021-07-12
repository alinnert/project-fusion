import React, { ReactElement } from 'react'
import { Layout } from '../../components/app/Layout'
import { CategorySettings } from '../../components/settings/CategorySettings'
import { SettingsCategoryList } from '../../components/settings/SettingsCategoryList'

export default function Categories(): ReactElement | null {
  return (
    <Layout left={<SettingsCategoryList currentId="categories" />}>
      <CategorySettings />
    </Layout>
  )
}

import React, { FC } from 'react'
import { Route, Routes } from 'react-router-dom'
import { App } from './components/app/App'
import { useRedirects } from './components/app/useRedirects'
import { ConfigCategories } from './pages/config/ConfigCategories'
import { ConfigInterface } from './pages/config/ConfigInterface'
import { ConfigLinks } from './pages/config/ConfigLinks'
import { Dashboard } from './pages/favorites/Dashboard'
import { CreateGroup } from './pages/groups/CreateGroup'
import { EditGroup } from './pages/groups/EditGroup'
import { Group } from './pages/groups/Group'
import { File } from './pages/File'
import { Info } from './pages/Info'
import { ConfigLayout } from './pages/layouts/ConfigLayout'
import { DataLayout } from './pages/layouts/DataLayout'
import { SimpleLayout } from './pages/layouts/SimpleLayout'
import { CreateProject } from './pages/projects/CreateProject'
import { EditProject } from './pages/projects/EditProject'
import { Search } from './pages/Search'
import { ConfigAbout } from './pages/config/ConfigAbout'
import { EditDashboard } from './pages/dashboard/EditDashboard'

export const AppRoutes: FC = () => {
  useRedirects()

  return (
    <Routes>
      <Route element={<App />}>
        <Route element={<SimpleLayout />}>
          <Route path="/" element={<File />} />
          <Route path="info" element={<Info />} />
          <Route path="search/:searchTerm" element={<Search />} />
          <Route path="*" element={<div>Custom not found page</div>} />
        </Route>

        <Route path="groups" element={<DataLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="create" element={<CreateGroup />} />
          <Route path='dashboard/edit' element={<EditDashboard />} />

          <Route path=":groupId">
            <Route index element={<Group />} />
            <Route path="edit" element={<EditGroup />} />
            <Route path="new-project" element={<CreateProject />} />
            <Route path="projects/:projectId/edit" element={<EditProject />} />
          </Route>
        </Route>

        <Route path="config" element={<ConfigLayout />}>
          <Route path="interface" element={<ConfigInterface />} />
          <Route path="about" element={<ConfigAbout />} />
          <Route path="categories" element={<ConfigCategories />} />
          <Route path="links" element={<ConfigLinks />} />
        </Route>
      </Route>
    </Routes>
  )
}

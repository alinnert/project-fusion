import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { closeDatabase, setDatabase } from '../database'

export interface Project {
  id: string
  name: string
  projectNumber: string
  important: boolean
  archived: boolean
  notes: string
}

export type ProjectTemplate = Partial<Pick<Project, 'id'>> & Omit<Project, 'id'>

const adapter = createEntityAdapter<Project>()

const slice = createSlice({
  name: 'projects',
  initialState: adapter.getInitialState(),
  reducers: {
    addProject: adapter.addOne,
    setProject: adapter.setOne,
    updateProject: adapter.updateOne,
    removeProject: adapter.removeOne,
    setProjects: adapter.setAll,
  },
  extraReducers(builder) {
    builder.addCase(setDatabase, (state, { payload }) => {
      adapter.setAll(state, payload.database.projects)
    })

    builder.addCase(closeDatabase, (state) => {
      adapter.removeAll(state)
    })
  },
})

export const {
  reducer: projectsReducer,
  actions: {
    addProject,
    setProject,
    updateProject,
    removeProject,
    setProjects,
  },
} = slice

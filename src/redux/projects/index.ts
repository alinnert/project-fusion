import { createEntityAdapter, createSlice, EntityState } from '@reduxjs/toolkit'
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

function getInitialProjectsState(): EntityState<Project> {
  return adapter.getInitialState()
}

const slice = createSlice({
  name: 'projects',
  initialState: getInitialProjectsState(),
  reducers: {
    addProject: adapter.addOne,
    setProject: adapter.setOne,
    updateProject: adapter.updateOne,
    removeProject: adapter.removeOne,
    removeProjects: adapter.removeMany,
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

export const projectsReducer = slice.reducer

export const {
  addProject,
  updateProject,
  removeProject,
  removeProjects,
  setProjects,
} = slice.actions

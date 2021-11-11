import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { closeDatabase, setDatabase } from '../database'
import { removeGroup } from '../groups'

export interface Project {
  id: string
  name: string
  projectNumber: string
  important: boolean
  archived: boolean
  notes: string
}

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

export const projectsReducer = slice.reducer

export const { addProject, updateProject, removeProject, setProjects } =
  slice.actions

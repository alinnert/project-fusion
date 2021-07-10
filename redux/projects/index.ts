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

const adapter = createEntityAdapter<Project>()

const slice = createSlice({
  name: 'projects',
  initialState: adapter.getInitialState(),
  reducers: {
    addProject: adapter.addOne,
    setProject: adapter.setOne,
    removeProject: adapter.removeOne,
    setProjects: adapter.setAll,
  },
  extraReducers(builder) {
    builder.addCase(setDatabase, (state, { payload }) => {
      state.entities = payload.database.projects
    })

    builder.addCase(closeDatabase, (state) => {
      return adapter.getInitialState()
    })
  },
})

export const {
  reducer: projectsReducer,
  actions: { addProject, setProject, removeProject, setProjects },
} = slice

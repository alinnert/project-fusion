import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { closeDatabase, setDatabase } from '../database'
import { Project } from '../projects'

export interface ProjectGroup {
  id: string
  name: string
  color: string
  notes: string
  projects: Array<Project['id']>
}

const adapter = createEntityAdapter<ProjectGroup>()

const slice = createSlice({
  name: 'projectGroups',
  initialState: adapter.getInitialState(),
  reducers: {
    addGroup: adapter.addOne,
    setGroup: adapter.setOne,
    removeGroup: adapter.removeOne,
    setGroups: adapter.setAll,
  },
  extraReducers(builder) {
    builder.addCase(setDatabase, (state, { payload }) => {
      state.entities = payload.database.groups
    })

    builder.addCase(closeDatabase, (state) => {
      return adapter.getInitialState()
    })
  },
})

export const {
  reducer: groupsReducer,
  actions: { addGroup, setGroup, removeGroup, setGroups },
} = slice

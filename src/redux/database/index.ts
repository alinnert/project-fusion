import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppState } from '..'
import { Category } from '../categories'
import { Dashboard } from '../dashboard'
import { ProjectGroup } from '../groups'
import { Project } from '../projects'
import { Settings } from '../settings'

export type Database = {
  version?: number
  dashboard: Dashboard
  categories: Record<Category['id'], Category>
  groups: Record<ProjectGroup['id'], ProjectGroup>
  projects: Record<Project['id'], Project>
  settings: Settings
}

export type DatabaseState = {
  filename: string | null
  status: 'ok' | 'loading' | string
  version?: number
}

function getInitialDatabaseState(): DatabaseState {
  return { filename: null, status: 'ok', version: undefined }
}

const slice = createSlice({
  name: 'database',
  initialState: getInitialDatabaseState(),
  reducers: {
    startLoading(state) {
      state.status = 'loading'
    },

    setOpenDatabaseError(state, action: PayloadAction<string>) {
      state.status = action.payload
    },

    setDatabase(
      state,
      action: PayloadAction<{
        filename: string
        database: Database
      }>,
    ) {
      state.status = 'ok'
      state.filename = action.payload.filename
      state.version = action.payload.database.version
    },

    closeDatabase(state) {
      state.status = 'ok'
      state.filename = null
    },
  },
})

export const databaseReducer = slice.reducer

export const {
  startLoading,
  setOpenDatabaseError,
  closeDatabase,
  setDatabase,
} = slice.actions

export const selectIsFileOpen = createSelector(
  (state: AppState) => state.database.filename,
  (filename): boolean => filename !== null,
)

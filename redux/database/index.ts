import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppState } from '..'
import { Category } from '../categories'
import { ProjectGroup } from '../groups'
import { Project } from '../projects'
import { Settings } from '../settings'

export interface Database {
  categories: Record<Category['id'], Category>
  groups: Record<ProjectGroup['id'], ProjectGroup>
  projects: Record<Project['id'], Project>
  settings: Settings
}

export interface DatabaseState {
  filename: string | null
  status: 'ok' | 'loading' | string
}

export function getEmptyDatabase(): Database {
  return {
    categories: {},
    groups: {},
    projects: {},
    settings: { bookingUrl: '', categoryOrder: [] },
  }
}

function getInitialState(): DatabaseState {
  return {
    filename: null,
    status: 'ok',
  }
}

export interface SetDatabaseActionPayload {
  filename: string
  database: Database
}

const slice = createSlice({
  name: 'database',
  initialState: getInitialState(),
  reducers: {
    startLoading(state) {
      state.status = 'loading'
    },

    setOpenDatabaseError(state, action: PayloadAction<string>) {
      state.status = action.payload
    },

    setDatabase(state, action: PayloadAction<SetDatabaseActionPayload>) {
      state.status = 'ok'
      state.filename = action.payload.filename
    },

    closeDatabase(state) {
      state.status = 'ok'
      state.filename = null
    },
  },
})

export const {
  reducer: databaseReducer,
  actions: { startLoading, setOpenDatabaseError, closeDatabase, setDatabase },
} = slice

export const selectIsFileOpen = createSelector(
  (state: AppState) => state.database.filename,
  (filename): boolean => filename !== null,
)

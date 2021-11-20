import {
  createEntityAdapter,
  createSelector,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit'
import { AppState } from '..'
import {
  addFileToRecentFiles,
  clearRecentFiles,
  getFileHandleById,
} from '../database/recentFilesStorage'

export interface RecentFile {
  id: string
  name: string
}

const adapter = createEntityAdapter<RecentFile>()

const slice = createSlice({
  name: 'recentFiles',
  initialState: adapter.getInitialState(),
  reducers: {
    addRecentFile(state, action: PayloadAction<FileSystemFileHandle>) {
      const name = action.payload.name
      const recentFiles = Object.values(state.entities)
      const isAlreadyInList = recentFiles.some((item) => item?.name === name)

      if (isAlreadyInList) {
        adapter.removeOne(state, name)
      }

      adapter.addOne(state, { id: name, name })
      addFileToRecentFiles(action.payload)
    },

    clearRecentFiles(state) {
      adapter.removeAll(state)
      clearRecentFiles()
    },
  },
})

export const recentFilesReducer = slice.reducer

// export const { } = slice.actions

interface SelectRecentFilesItem {
  filename: string
  fileHandle: FileSystemFileHandle
}

export const selectRecentFiles = createSelector(
  (state: AppState) => state.recentFiles.entities,
  (recentFiles): SelectRecentFilesItem[] => {
    return Object.values(recentFiles)
      .map((file): SelectRecentFilesItem | null => {
        if (file === undefined) return null
        const fileHandle = getFileHandleById(file.id)
        if (fileHandle === null) return null
        return { filename: file.name, fileHandle }
      })
      .filter((item): item is SelectRecentFilesItem => item !== null)
  },
)

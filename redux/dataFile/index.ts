import { createSlice } from '@reduxjs/toolkit'
import { AppDispatch, AppState } from '..'
import { FileData } from '../../types/FileData'
import { createFile } from './createFileThunk'
import { openFile } from './openFileThunk'

export interface ThunkConfig {
  dispatch: AppDispatch
  state: AppState
  rejectValue: Error
}

export enum DataFileError {
  unknownError = 'unknown error',
  openFileError = 'open file error',
  parseFileError = 'parse file error',
  writeFileError = 'write file error',
}

export interface DataFileState {
  fileName: string | null
  fileData: FileData | null
  status: 'ok' | 'loading' | Error
}

function getInitialData(): DataFileState {
  return { fileName: null, fileData: null, status: 'ok' }
}

export const dataFileSlice = createSlice({
  name: 'dataFile',
  initialState: getInitialData(),
  reducers: {},
  extraReducers(builder) {
    builder.addCase(createFile.pending, (state, action) => {
      state.fileName = null
      state.fileData = null
      state.status = 'loading'
    })

    builder.addCase(createFile.fulfilled, (state, action) => {
      state.fileName = action.payload.fileName
      state.fileData = action.payload.fileData
      state.status = 'ok'
    })

    builder.addCase(createFile.rejected, (state, action) => {
      state.status =
        action.payload !== undefined
          ? action.payload
          : new Error(DataFileError.unknownError)
    })

    builder.addCase(openFile.pending, (state, action) => {
      state.fileName = null
      state.fileData = null
      state.status = 'loading'
    })

    builder.addCase(openFile.fulfilled, (state, action) => {
      state.fileName = action.payload.fileName
      state.fileData = action.payload.fileData
      state.status = 'ok'
    })

    builder.addCase(openFile.rejected, (state, action) => {
      state.status =
        action.payload !== undefined
          ? action.payload
          : new Error(DataFileError.unknownError)
    })
  },
})

// export const {} = slice.actions

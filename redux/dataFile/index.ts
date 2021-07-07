import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppDispatch, AppState } from '..'
import { FileData } from '../../types/FileData'
import { createFile } from './createFileThunk'
import { openFileFromHandle } from './openFileFromHandleThunk'
import { openFile } from './openFileThunk'

export interface ThunkConfig {
  dispatch: AppDispatch
  state: AppState
  rejectValue: string
}

export interface DataFileState {
  fileName: string | null
  fileData: FileData | null
  status: 'ok' | 'loading' | string
}

function getInitialData(): DataFileState {
  return { fileName: null, fileData: null, status: 'ok' }
}

export const dataFileSlice = createSlice({
  name: 'dataFile',
  initialState: getInitialData(),
  reducers: {
    closeFile(state, action: PayloadAction) {
      state.fileData = null
      state.fileName = null
      state.status = 'ok'
    },
  },
  extraReducers(builder) {
    builder.addCase(createFile.pending, (state, action) => {
      state.status = 'loading'
    })

    builder.addCase(createFile.fulfilled, (state, action) => {
      state.fileName = action.payload.fileName
      state.fileData = action.payload.fileData
      state.status = 'ok'
    })

    builder.addCase(createFile.rejected, (state, action) => {
      state.status =
        action.payload !== undefined ? action.payload : 'unknown error'
    })

    builder.addCase(openFile.pending, (state, action) => {
      state.status = 'loading'
    })

    builder.addCase(openFile.fulfilled, (state, action) => {
      state.fileName = action.payload.fileName
      state.fileData = action.payload.fileData
      state.status = 'ok'
    })

    builder.addCase(openFile.rejected, (state, action) => {
      state.status =
        action.payload !== undefined ? action.payload : 'unknown error'
    })

    builder.addCase(openFileFromHandle.pending, (state, action) => {
      state.status = 'loading'
    })

    builder.addCase(openFileFromHandle.fulfilled, (state, action) => {
      state.fileName = action.payload.fileName
      state.fileData = action.payload.fileData
      state.status = 'ok'
    })

    builder.addCase(openFileFromHandle.rejected, (state, action) => {
      state.status =
        action.payload !== undefined ? action.payload : 'unknown error'
    })
  },
})

export const { closeFile } = dataFileSlice.actions

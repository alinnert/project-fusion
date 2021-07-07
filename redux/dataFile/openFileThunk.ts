import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from '.'
import { asyncTryCatch } from '../../tools/tryCatch'
import {
  filePickerOptions,
  FilePickerResult,
  getDataFromFileHandle,
} from './filePicker'
import { set } from 'idb-keyval'

export const openFile = createAsyncThunk<FilePickerResult, void, ThunkConfig>(
  'dataFile/openFile',
  async (_, thunk) => {
    const filePickerResult = await asyncTryCatch(() =>
      showOpenFilePicker(filePickerOptions),
    )
    if (filePickerResult.caught) {
      return thunk.rejectWithValue(filePickerResult.error.message)
    }

    const [fileHandle] = filePickerResult.value

    const persistHandleResult = await asyncTryCatch(() =>
      set('fileHandle', fileHandle),
    )
    if (persistHandleResult.caught) {
      console.error(persistHandleResult.error)
    }

    const fileDataResult = await asyncTryCatch(() =>
      getDataFromFileHandle(fileHandle),
    )
    if (fileDataResult.caught) {
      return thunk.rejectWithValue(fileDataResult.error.message)
    }

    const fileData = fileDataResult.value
    return { fileName: fileHandle.name, fileData } as FilePickerResult
  },
)

import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from '.'
import { awaitTryCatch } from '../../tools/tryCatch'
import {
  filePickerOptions,
  FilePickerResult,
  getDataFromFileHandle,
} from './filePicker'

export const openFile = createAsyncThunk<FilePickerResult, void, ThunkConfig>(
  'dataFile/openFile',
  async (_, thunk) => {
    const filePickerResult = await awaitTryCatch(() =>
      showOpenFilePicker(filePickerOptions),
    )
    if (filePickerResult.caught) {
      return thunk.rejectWithValue(filePickerResult.error)
    }

    const [fileHandle] = filePickerResult.value

    const fileDataResult = await awaitTryCatch(() =>
      getDataFromFileHandle(fileHandle),
    )
    if (fileDataResult.caught) {
      return thunk.rejectWithValue(fileDataResult.error)
    }

    const fileData = fileDataResult.value
    return { fileName: fileHandle.name, fileData } as FilePickerResult
  },
)

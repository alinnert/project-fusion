import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from '.'
import { awaitTryCatch, tryCatch } from '../../tools/tryCatch'
import { FileData } from '../../types/FileData'
import { filePickerOptions, FilePickerResult } from './filePicker'

function getDefaultData(): FileData {
  return { groups: [], projects: [], settings: { bookingUrl: '' } }
}

export const createFile = createAsyncThunk<FilePickerResult, void, ThunkConfig>(
  'dataFile/createFile',
  async (_, thunk) => {
    const fileHandle = await awaitTryCatch(() =>
      showSaveFilePicker(filePickerOptions),
    )
    if (fileHandle.caught) {
      return thunk.rejectWithValue(fileHandle.error)
    }

    const writable = await awaitTryCatch(() =>
      fileHandle.value.createWritable(),
    )
    if (writable.caught) {
      return thunk.rejectWithValue(writable.error)
    }

    const defaultData = getDefaultData()
    const defaultContent = tryCatch(() => JSON.stringify(defaultData))
    if (defaultContent.caught) {
      return thunk.rejectWithValue(defaultContent.error)
    }
    const writeResult = await awaitTryCatch(() =>
      writable.value.write(defaultContent.value),
    )
    if (writeResult.caught) {
      return thunk.rejectWithValue(writeResult.error)
    }

    const closeResult = await awaitTryCatch(() => writable.value.close())
    if (closeResult.caught) {
      return thunk.rejectWithValue(closeResult.error)
    }

    return { fileName: fileHandle.value.name, fileData: defaultData }
  },
)

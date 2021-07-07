import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from '.'
import { asyncTryCatch } from '../../tools/tryCatch'
import { FilePickerResult, getDataFromFileHandle } from './filePicker'

export const openFileFromHandle = createAsyncThunk<
  FilePickerResult,
  FileSystemFileHandle,
  ThunkConfig
>('dataFile/openFileFromHandle', async (fileHandle, thunk) => {
  const queryPermissionResult = await asyncTryCatch(() =>
    // @ts-expect-error
    fileHandle.queryPermission({ mode: 'readwrite' }),
  )
  if (queryPermissionResult.caught) {
    return thunk.rejectWithValue(queryPermissionResult.error.message)
  }
  if (queryPermissionResult.value === 'denied') {
    console.log('a', queryPermissionResult.value)
    return thunk.rejectWithValue('permission denied')
  }

  if (queryPermissionResult.value === 'prompt') {
    const requestPermissionResult = await asyncTryCatch(() =>
      // @ts-expect-error
      fileHandle.requestPermission({ mode: 'readwrite' }),
    )
    if (requestPermissionResult.caught) {
      return thunk.rejectWithValue(requestPermissionResult.error.message)
    }
    if (requestPermissionResult.value === 'denied') {
      return thunk.rejectWithValue('permission denied')
    }
  }

  const fileDataResult = await asyncTryCatch(() =>
    getDataFromFileHandle(fileHandle),
  )
  if (fileDataResult.caught) {
    return thunk.rejectWithValue(fileDataResult.error.message)
  }

  const fileData = fileDataResult.value
  return { fileName: fileHandle.name, fileData } as FilePickerResult
})

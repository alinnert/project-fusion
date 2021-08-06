import {
  setDatabase,
  SetDatabaseActionPayload,
  setOpenDatabaseError,
  startLoading,
} from '.'
import { store } from '..'
import { asyncTry } from '../../utils/tryCatch'
import { setFileHandle } from './fileHandleStorage'
import { filePickerOptions, getDataFromFileHandle } from './filePicker'
import { addFileToRecentFiles } from './recentFilesStorage'

export async function openDatabaseFile(): Promise<void> {
  store.dispatch(startLoading())

  const filePickerResult = await asyncTry(() =>
    showOpenFilePicker(filePickerOptions),
  )
  if (filePickerResult.caught) {
    store.dispatch(setOpenDatabaseError(filePickerResult.error.message))
    return
  }

  const [fileHandle] = filePickerResult.value

  const persistHandleResult = await asyncTry(() => setFileHandle(fileHandle))
  if (persistHandleResult.caught) {
    console.error(persistHandleResult.error)
  }

  const addToRecentFilesResult = await asyncTry(() =>
    addFileToRecentFiles(fileHandle),
  )
  if (addToRecentFilesResult.caught) {
    console.error(addToRecentFilesResult.error)
  }

  const fileDataResult = await asyncTry(() => getDataFromFileHandle(fileHandle))
  if (fileDataResult.caught) {
    store.dispatch(setOpenDatabaseError(fileDataResult.error.message))
    return
  }

  const payload: SetDatabaseActionPayload = {
    filename: fileHandle.name,
    database: fileDataResult.value,
  }

  store.dispatch(setDatabase(payload))
}

import { set } from 'idb-keyval'
import {
  setDatabase,
  SetDatabaseActionPayload,
  setOpenDatabaseError,
  startLoading,
} from '.'
import { store } from '..'
import { asyncTry } from '../../tools/tryCatch'
import { filePickerOptions, getDataFromFileHandle } from './filePicker'

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

  const persistHandleResult = await asyncTry(() =>
    set('fileHandle', fileHandle),
  )
  if (persistHandleResult.caught) {
    console.error(persistHandleResult.error)
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

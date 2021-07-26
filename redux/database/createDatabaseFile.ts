import { set } from 'idb-keyval'
import {
  getEmptyDatabase,
  setDatabase,
  SetDatabaseActionPayload,
  setOpenDatabaseError,
  startLoading,
} from '.'
import { store } from '..'
import { asyncTry } from '../../utils/tryCatch'
import { filePickerOptions } from './filePicker'

export async function createDatabaseFile(): Promise<void> {
  store.dispatch(startLoading())

  const fileHandleResult = await asyncTry(() =>
    showSaveFilePicker(filePickerOptions),
  )
  if (fileHandleResult.caught) {
    store.dispatch(setOpenDatabaseError(fileHandleResult.error.message))
    return
  }

  const { value: fileHandle } = fileHandleResult

  const persistHandleResult = await asyncTry(() =>
    set('fileHandle', fileHandle),
  )
  if (persistHandleResult.caught) {
    console.error(persistHandleResult.error)
  }

  const writableResult = await asyncTry(() => fileHandle.createWritable())
  if (writableResult.caught) {
    store.dispatch(setOpenDatabaseError(writableResult.error.message))
    return
  }

  const { value: writable } = writableResult

  const writeResult = await asyncTry(() => writable.write(''))
  if (writeResult.caught) {
    store.dispatch(setOpenDatabaseError(writeResult.error.message))
    return
  }

  const closeResult = await asyncTry(() => writable.close())
  if (closeResult.caught) {
    store.dispatch(setOpenDatabaseError(closeResult.error.message))
    return
  }

  const payload: SetDatabaseActionPayload = {
    filename: fileHandleResult.value.name,
    database: getEmptyDatabase(),
  }

  store.dispatch(setDatabase(payload))
}

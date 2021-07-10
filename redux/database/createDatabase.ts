import {
  getEmptyDatabase,
  setDatabase,
  SetDatabaseActionPayload,
  setOpenDatabaseError,
  startLoading
} from '.'
import { store } from '..'
import { asyncTryCatch } from '../../tools/tryCatch'
import { filePickerOptions } from './filePicker'

export async function createDatabase(): Promise<void> {
  store.dispatch(startLoading())

  const fileHandle = await asyncTryCatch(() =>
    showSaveFilePicker(filePickerOptions),
  )
  if (fileHandle.caught) {
    store.dispatch(setOpenDatabaseError(fileHandle.error.message))
    return
  }

  const writable = await asyncTryCatch(() => fileHandle.value.createWritable())
  if (writable.caught) {
    store.dispatch(setOpenDatabaseError(writable.error.message))
    return
  }

  const writeResult = await asyncTryCatch(() => writable.value.write(''))
  if (writeResult.caught) {
    store.dispatch(setOpenDatabaseError(writeResult.error.message))
    return
  }

  const closeResult = await asyncTryCatch(() => writable.value.close())
  if (closeResult.caught) {
    store.dispatch(setOpenDatabaseError(closeResult.error.message))
    return
  }

  const payload: SetDatabaseActionPayload = {
    filename: fileHandle.value.name,
    database: getEmptyDatabase(),
  }

  store.dispatch(setDatabase(payload))
}

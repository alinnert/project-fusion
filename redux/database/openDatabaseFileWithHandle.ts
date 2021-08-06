import { setDatabase, SetDatabaseActionPayload, setOpenDatabaseError } from '.'
import { store } from '..'
import { asyncTry } from '../../utils/tryCatch'
import { setFileHandle } from './currentFileStorage'
import { getDataFromFileHandle } from './filePicker'
import { addFileToRecentFiles } from './recentFilesStorage'

export async function openDatabaseFielWithHandle(
  fileHandle: FileSystemFileHandle,
): Promise<void> {
  const queryPermissionResult = await asyncTry(() =>
    fileHandle.queryPermission({ mode: 'readwrite' }),
  )
  if (queryPermissionResult.caught) {
    store.dispatch(setOpenDatabaseError(queryPermissionResult.error.message))
    return
  }
  if (queryPermissionResult.value === 'denied') {
    store.dispatch(setOpenDatabaseError('permission denied'))
    return
  }

  if (queryPermissionResult.value === 'prompt') {
    const requestPermissionResult = await asyncTry(() =>
      fileHandle.requestPermission({ mode: 'readwrite' }),
    )
    if (requestPermissionResult.caught) {
      store.dispatch(
        setOpenDatabaseError(requestPermissionResult.error.message),
      )
      return
    }
    if (requestPermissionResult.value === 'denied') {
      store.dispatch(setOpenDatabaseError('permission denied'))
      return
    }
  }

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

  const database = fileDataResult.value
  const result: SetDatabaseActionPayload = {
    filename: fileHandle.name,
    database,
  }

  store.dispatch(setDatabase(result))
}

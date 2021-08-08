import { useAppDispatch } from '../../redux'
import {
  setDatabase,
  SetDatabaseActionPayload,
  setOpenDatabaseError,
} from '../../redux/database'
import { setFileHandle } from '../../redux/database/currentFileStorage'
import { getDataFromFileHandle } from '../../redux/database/filePicker'
import { addFileToRecentFiles } from '../../redux/database/recentFilesStorage'
import { asyncTry } from '../../utils/tryCatch'

export function useOpenDatabaseWithFileHandle(): (
  fileHandle: FileSystemFileHandle,
) => Promise<void> {
  const dispatch = useAppDispatch()

  return async (fileHandle: FileSystemFileHandle) => {
    const queryPermissionResult = await asyncTry(() =>
      fileHandle.queryPermission({ mode: 'readwrite' }),
    )
    if (queryPermissionResult.caught) {
      dispatch(setOpenDatabaseError(queryPermissionResult.error.message))
      return
    }
    if (queryPermissionResult.value === 'denied') {
      dispatch(setOpenDatabaseError('permission denied'))
      return
    }

    if (queryPermissionResult.value === 'prompt') {
      const requestPermissionResult = await asyncTry(() =>
        fileHandle.requestPermission({ mode: 'readwrite' }),
      )
      if (requestPermissionResult.caught) {
        dispatch(setOpenDatabaseError(requestPermissionResult.error.message))
        return
      }
      if (requestPermissionResult.value === 'denied') {
        dispatch(setOpenDatabaseError('permission denied'))
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

    const fileDataResult = await asyncTry(() =>
      getDataFromFileHandle(fileHandle),
    )
    if (fileDataResult.caught) {
      dispatch(setOpenDatabaseError(fileDataResult.error.message))
      return
    }

    const database = fileDataResult.value
    const result: SetDatabaseActionPayload = {
      filename: fileHandle.name,
      database,
    }

    dispatch(setDatabase(result))
  }
}

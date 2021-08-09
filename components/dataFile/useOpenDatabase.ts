import { useCallback } from 'react'
import { useAppDispatch } from '../../redux'
import {
  setDatabase,
  SetDatabaseActionPayload,
  setOpenDatabaseError,
  startLoading,
} from '../../redux/database'
import { setFileHandle } from '../../redux/database/currentFileStorage'
import {
  filePickerOptions,
  getDataFromFileHandle,
} from '../../redux/database/filePicker'
import { addFileToRecentFiles } from '../../redux/database/recentFilesStorage'
import { asyncTry } from '../../utils/tryCatch'

export function useOpenDatabase(): () => Promise<void> {
  const dispatch = useAppDispatch()

  const openDatabase = useCallback(async () => {
    dispatch(startLoading())

    const filePickerResult = await asyncTry(() =>
      showOpenFilePicker(filePickerOptions),
    )
    if (filePickerResult.caught) {
      dispatch(setOpenDatabaseError(filePickerResult.error.message))
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

    const fileDataResult = await asyncTry(() =>
      getDataFromFileHandle(fileHandle),
    )
    if (fileDataResult.caught) {
      dispatch(setOpenDatabaseError(fileDataResult.error.message))
      return
    }

    const payload: SetDatabaseActionPayload = {
      filename: fileHandle.name,
      database: fileDataResult.value,
    }

    dispatch(setDatabase(payload))
  }, [dispatch])

  return openDatabase
}

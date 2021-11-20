import { useCallback } from 'react'
import { useAppDispatch } from '../../redux'
import {
  getEmptyDatabase,
  setDatabase,
  SetDatabaseActionPayload,
  setOpenDatabaseError,
  startLoading,
} from '../../redux/database'
import { setFileHandle } from '../../redux/database/currentFileStorage'
import { filePickerOptions } from '../../redux/database/filePicker'
import { addFileToRecentFiles } from '../../redux/database/recentFilesStorage'
import { asyncTry } from '../../utils/tryCatch'

export function useCreateDatabase(): () => Promise<void> {
  const dispatch = useAppDispatch()

  const createDatabase = useCallback(async () => {
    dispatch(startLoading())

    const fileHandleResult = await asyncTry(() =>
      showSaveFilePicker(filePickerOptions),
    )
    if (fileHandleResult.caught) {
      dispatch(setOpenDatabaseError(fileHandleResult.error.message))
      return
    }

    const { value: fileHandle } = fileHandleResult

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

    const writableResult = await asyncTry(() => fileHandle.createWritable())
    if (writableResult.caught) {
      dispatch(setOpenDatabaseError(writableResult.error.message))
      return
    }

    const { value: writable } = writableResult

    const writeResult = await asyncTry(() => writable.write(''))
    if (writeResult.caught) {
      dispatch(setOpenDatabaseError(writeResult.error.message))
      return
    }

    const closeResult = await asyncTry(() => writable.close())
    if (closeResult.caught) {
      dispatch(setOpenDatabaseError(closeResult.error.message))
      return
    }

    const payload: SetDatabaseActionPayload = {
      filename: fileHandleResult.value.name,
      database: getEmptyDatabase(),
    }

    dispatch(setDatabase(payload))
  }, [dispatch])

  return createDatabase
}

import { useCallback } from 'react'
import { useAppDispatch } from '../../redux'
import { setOpenDatabaseError } from '../../redux/database'
import { filePickerOptions } from '../../redux/database/filePicker'
import { asyncTry } from '../../utils/tryCatch'

type UseShowSaveFilePickerResult = () => Promise<FileSystemFileHandle | null>

export function useShowSaveFilePicker(): UseShowSaveFilePickerResult {
  const dispatch = useAppDispatch()

  return useCallback(async () => {
    const fileHandleResult = await asyncTry(() =>
      showSaveFilePicker(filePickerOptions),
    )
    if (fileHandleResult.caught) {
      dispatch(setOpenDatabaseError(fileHandleResult.error.message))
      return null
    }

    const { value: fileHandle } = fileHandleResult
    return fileHandle
  }, [dispatch])
}

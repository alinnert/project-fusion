import { useCallback } from 'react'
import { useAppDispatch } from '../../redux'
import { setOpenDatabaseError } from '../../redux/database'
import { filePickerOptions } from '../../redux/database/filePicker'
import { asyncTry } from '../../utils/tryCatch'

type UseShowOpenFilePickerResult = () => Promise<FileSystemFileHandle | null>

export function useShowOpenFilePicker(): UseShowOpenFilePickerResult {
  const dispatch = useAppDispatch()

  return useCallback(async () => {
    const filePickerResult = await asyncTry(() =>
      showOpenFilePicker(filePickerOptions),
    )
    if (filePickerResult.caught) {
      dispatch(setOpenDatabaseError(filePickerResult.error.message))
      return null
    }

    const fileHandle = filePickerResult.value[0]
    if (fileHandle === undefined) {
      dispatch(setOpenDatabaseError('No file handle returned.'))
      return null
    }

    return fileHandle
  }, [dispatch])
}

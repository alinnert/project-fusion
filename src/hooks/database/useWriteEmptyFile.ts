import { useCallback } from 'react'
import { useAppDispatch } from '../../redux'
import { setOpenDatabaseError } from '../../redux/database'
import { asyncTry } from '../../utils/tryCatch'

type UseWriteEmptyFileResult = (
  handle: FileSystemFileHandle,
) => Promise<boolean>

export function useWriteEmptyFile(): UseWriteEmptyFileResult {
  const dispatch = useAppDispatch()

  return useCallback(
    async (handle) => {
      const writableResult = await asyncTry(() => handle.createWritable())
      if (writableResult.caught) {
        dispatch(setOpenDatabaseError(writableResult.error.message))
        return false
      }

      const { value: writable } = writableResult

      const writeResult = await asyncTry(() => writable.write(''))
      if (writeResult.caught) {
        dispatch(setOpenDatabaseError(writeResult.error.message))
        return false
      }

      const closeResult = await asyncTry(() => writable.close())
      if (closeResult.caught) {
        dispatch(setOpenDatabaseError(closeResult.error.message))
        return false
      }

      return true
    },
    [dispatch],
  )
}

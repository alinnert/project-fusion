import { useCallback } from 'react'
import { useAppDispatch } from '../../redux'
import { Database, setOpenDatabaseError } from '../../redux/database'
import { getDataFromFileHandle } from '../../redux/database/filePicker'
import { asyncTry, TryCatchResult } from '../../utils/tryCatch'

type UseGetDataFromFileHandleResult = (
  handle: FileSystemFileHandle,
) => Promise<TryCatchResult<Database>>

export function useGetDataFromFileHandle(): UseGetDataFromFileHandleResult {
  const dispatch = useAppDispatch()

  return useCallback(
    async (handle) => {
      const fileDataResult = await asyncTry(() => getDataFromFileHandle(handle))
      if (fileDataResult.caught) {
        dispatch(setOpenDatabaseError(fileDataResult.error.message))
      }
      return fileDataResult
    },
    [dispatch],
  )
}

import { useCallback } from 'react'
import { useAppDispatch } from '../../redux'
import { Database, setOpenDatabaseError } from '../../redux/database'
import { getDataFromFileHandle } from '../../redux/database/filePicker'
import { asyncTry, TryCatchResult } from '../../utils/tryCatch'
import { useMigrate } from './useMigrate'

type UseGetDataFromFileHandleResult = (
  handle: FileSystemFileHandle,
) => Promise<TryCatchResult<Database>>

export function useGetDataFromFileHandle(): UseGetDataFromFileHandleResult {
  const dispatch = useAppDispatch()
  const migrate = useMigrate()

  return useCallback(
    async (handle) => {
      const fileDataResult = await asyncTry(() => getDataFromFileHandle(handle))
      if (fileDataResult.caught) {
        dispatch(setOpenDatabaseError(fileDataResult.error.message))
      } else {
        migrate(fileDataResult.value)
      }
      return fileDataResult
    },
    [dispatch, migrate],
  )
}

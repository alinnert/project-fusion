import { useCallback } from 'react'
import { useAppDispatch } from '../../redux'
import { setOpenDatabaseError } from '../../redux/database'
import { asyncTry } from '../../utils/tryCatch'
import { useCloseDatabase } from './useCloseDatabase'

type UseCheckPermissionResult = (
  handle: FileSystemFileHandle,
) => Promise<boolean>

export function useCheckPermission(): UseCheckPermissionResult {
  const dispatch = useAppDispatch()
  const closeDatabase = useCloseDatabase()

  const checkPermission = useCallback(
    async (handle: FileSystemFileHandle) => {
      const queryPermissionResult = await asyncTry(() =>
        handle.queryPermission({ mode: 'readwrite' }),
      )
      if (queryPermissionResult.caught) {
        dispatch(setOpenDatabaseError(queryPermissionResult.error.message))
        return false
      }
      if (queryPermissionResult.value === 'denied') {
        dispatch(setOpenDatabaseError('permission denied'))
        return false
      }

      if (queryPermissionResult.value === 'prompt') {
        const requestPermissionResult = await asyncTry(() =>
          handle.requestPermission({ mode: 'readwrite' }),
        )
        if (requestPermissionResult.caught) {
          dispatch(setOpenDatabaseError(requestPermissionResult.error.message))
          return false
        }
        if (requestPermissionResult.value !== 'granted') {
          dispatch(setOpenDatabaseError('permission denied'))
          return false
        }
      }
      return true
    },
    [dispatch],
  )

  return useCallback(
    (handle) => {
      const hasPermission = checkPermission(handle)
      if (!hasPermission) {
        closeDatabase()
      }
      return hasPermission
    },
    [checkPermission, closeDatabase],
  )
}

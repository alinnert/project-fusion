import { get } from 'idb-keyval'
import { useEffect } from 'react'
import { useAppDispatch } from '../../redux'
import { currentFileStorageKey } from '../../redux/database/currentFileStorage'
import { asyncTry } from '../../utils/tryCatch'
import { useOpenDatabaseWithFileHandle } from '../dataFile/useOpenDatabaseWithFilehandle'

export function usePersistedFileHandle() {
  const dispatch = useAppDispatch()
  const openDatabaseWithFileHandle = useOpenDatabaseWithFileHandle()

  useEffect(() => {
    async function run() {
      const fileHandleResult = await asyncTry(() =>
        get<FileSystemFileHandle>(currentFileStorageKey),
      )
      if (fileHandleResult.caught) return
      if (fileHandleResult.value === undefined) return

      const fileHandle = fileHandleResult.value
      openDatabaseWithFileHandle(fileHandle)
    }

    run()
  }, [dispatch, openDatabaseWithFileHandle])
}

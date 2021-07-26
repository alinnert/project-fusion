import { get } from 'idb-keyval'
import { FC, PropsWithChildren, useEffect } from 'react'
import { useAppDispatch } from '../redux'
import { openDatabaseFielWithHandle } from '../redux/database/openDatabaseFileWithHandle'
import { asyncTry } from '../utils/tryCatch'

interface Props {}

export const WrappedApp: FC<PropsWithChildren<Props>> = ({ children }) => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    async function run() {
      const fileHandleResult = await asyncTry(() =>
        get<FileSystemFileHandle>('fileHandle'),
      )
      if (fileHandleResult.caught) return
      if (fileHandleResult.value === undefined) return
      const fileHandle = fileHandleResult.value
      openDatabaseFielWithHandle(fileHandle)
    }
    run()
  }, [dispatch])

  return <>{children}</>
}

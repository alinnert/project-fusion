import { get } from 'idb-keyval'
import { FC, PropsWithChildren, useEffect } from 'react'
import { useAppDispatch } from '../redux'
import { openDatabaseWithFilehandle } from '../redux/database/openDatabaseWithFilehandle'
import { asyncTryCatch } from '../tools/tryCatch'

interface Props {}

export const WrappedApp: FC<PropsWithChildren<Props>> = ({ children }) => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    async function run() {
      const fileHandleResult = await asyncTryCatch(() =>
        get<FileSystemFileHandle>('fileHandle'),
      )
      if (fileHandleResult.caught) return
      if (fileHandleResult.value === undefined) return
      const fileHandle = fileHandleResult.value
      openDatabaseWithFilehandle(fileHandle)
    }
    run()
  }, [dispatch])

  return <>{children}</>
}

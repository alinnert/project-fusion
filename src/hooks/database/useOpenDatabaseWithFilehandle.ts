import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../redux'
import { setDatabase, SetDatabaseActionPayload } from '../../redux/database'
import { setCurrentFile } from '../../redux/middleware/saveDatabase/currentFile'
import { useCheckPermission } from './useCheckPermission'
import { useGetDataFromFileHandle } from './useGetDataFromFileHandle'
import { useRecentFiles } from './useRecentFiles'

type UseOpenDatabaseWithFileHandleResult = (
  fileHandle: FileSystemFileHandle,
) => Promise<void>

export function useOpenDatabaseWithFileHandle(): UseOpenDatabaseWithFileHandleResult {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const checkPermission = useCheckPermission()
  const [, { addToRecentFiles }] = useRecentFiles()
  const getDataFromFileHandle = useGetDataFromFileHandle()

  return useCallback(
    async (fileHandle: FileSystemFileHandle) => {
      console.log('open with handle', fileHandle)
      const permissionGranted = await checkPermission(fileHandle)
      console.log('permission', permissionGranted)
      if (!permissionGranted) return

      setCurrentFile(fileHandle)
      await addToRecentFiles(fileHandle)
      const fileDataResult = await getDataFromFileHandle(fileHandle)
      if (fileDataResult.caught) return

      const database = fileDataResult.value
      const result: SetDatabaseActionPayload = {
        filename: fileHandle.name,
        database,
      }

      dispatch(setDatabase(result))

      navigate('/groups')
    },
    [
      addToRecentFiles,
      checkPermission,
      dispatch,
      getDataFromFileHandle,
      navigate,
    ],
  )
}

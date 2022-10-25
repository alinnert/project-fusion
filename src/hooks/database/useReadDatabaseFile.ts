import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../redux'
import { setDatabase } from '../../redux/database'
import { setCurrentFile } from '../../redux/middleware/saveDatabase/currentFile'
import { resetLastFileContent } from '../../redux/middleware/saveDatabase/writeStateToFile'
import { useCheckPermission } from './useCheckPermission'
import { useGetDataFromFileHandle } from './useGetDataFromFileHandle'
import { useRecentFiles } from './useRecentFiles'

type UseReadDatabaseFile = (
  fileHandle: FileSystemFileHandle,
) => Promise<void>

export function useReadDatabaseFile(): UseReadDatabaseFile {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const checkPermission = useCheckPermission()
  const [, { addToRecentFiles }] = useRecentFiles()
  const getDataFromFileHandle = useGetDataFromFileHandle()

  return useCallback(
    async (fileHandle: FileSystemFileHandle) => {
      resetLastFileContent()

      const permissionGranted = await checkPermission(fileHandle)
      if (!permissionGranted) return

      setCurrentFile(fileHandle)
      addToRecentFiles(fileHandle)

      const fileDataResult = await getDataFromFileHandle(fileHandle)
      if (fileDataResult.caught) return

      const database = fileDataResult.value
      const filename = fileHandle.name
      dispatch(setDatabase({ filename, database }))

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

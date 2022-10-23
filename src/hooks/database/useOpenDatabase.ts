import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../redux'
import { setDatabase, startLoading } from '../../redux/database'
import { setCurrentFile } from '../../redux/middleware/saveDatabase/currentFile'
import { useCheckPermission } from './useCheckPermission'
import { useGetDataFromFileHandle } from './useGetDataFromFileHandle'
import { useRecentFiles } from './useRecentFiles'
import { useShowOpenFilePicker } from './useShowOpenFilePicker'

type UseOpenDatabaseResult = () => Promise<void>

export function useOpenDatabase(): UseOpenDatabaseResult {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const checkPermission = useCheckPermission()
  const showOpenFilePicker = useShowOpenFilePicker()
  const [, { addToRecentFiles }] = useRecentFiles()
  const getDataFromFileHandle = useGetDataFromFileHandle()

  return useCallback(async () => {
    dispatch(startLoading())

    const fileHandle = await showOpenFilePicker()
    if (fileHandle === null) return

    const permissionGranted = await checkPermission(fileHandle)
    if (!permissionGranted) return

    setCurrentFile(fileHandle)
    await addToRecentFiles(fileHandle)
    const fileDataResult = await getDataFromFileHandle(fileHandle)
    if (fileDataResult.caught) return

    dispatch(
      setDatabase({
        filename: fileHandle.name,
        database: fileDataResult.value,
      }),
    )

    navigate('/groups')
  }, [
    addToRecentFiles,
    checkPermission,
    dispatch,
    getDataFromFileHandle,
    navigate,
    showOpenFilePicker,
  ])
}

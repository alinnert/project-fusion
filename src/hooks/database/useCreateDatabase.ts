import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../redux'
import {
  getEmptyDatabase,
  setDatabase,
  startLoading,
} from '../../redux/database'
import { setCurrentFile } from '../../redux/middleware/saveDatabase/currentFile'
import { useCheckPermission } from './useCheckPermission'
import { useRecentFiles } from './useRecentFiles'
import { useShowSaveFilePicker } from './useShowSaveFilePicker'
import { useWriteEmptyFile } from './useWriteEmptyFile'

type UseCreateDatabaseResult = () => Promise<void>

export function useCreateDatabase(): UseCreateDatabaseResult {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const checkPermission = useCheckPermission()
  const showSaveFilePicker = useShowSaveFilePicker()
  const [, { addToRecentFiles }] = useRecentFiles()
  const writeEmptyFile = useWriteEmptyFile()

  return useCallback(async () => {
    dispatch(startLoading())

    const fileHandle = await showSaveFilePicker()
    if (fileHandle === null) return

    const permissionGranted = await checkPermission(fileHandle)
    if (!permissionGranted) return

    setCurrentFile(fileHandle)
    await addToRecentFiles(fileHandle)

    const writeOk = await writeEmptyFile(fileHandle)
    if (!writeOk) return

    dispatch(
      setDatabase({ filename: fileHandle.name, database: getEmptyDatabase() }),
    )

    navigate('/groups')
  }, [
    addToRecentFiles,
    checkPermission,
    dispatch,
    navigate,
    showSaveFilePicker,
    writeEmptyFile,
  ])
}

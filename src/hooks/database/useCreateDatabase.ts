import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../redux'
import { getInitialDashboardState } from '../../redux/dashboard'
import { Database, setDatabase, startLoading } from '../../redux/database'
import { setCurrentFile } from '../../redux/middleware/saveDatabase/currentFile'
import { getInitialSettingsState } from '../../redux/settings'
import { useCheckPermission } from './useCheckPermission'
import { useRecentFiles } from './useRecentFiles'
import { useShowSaveFilePicker } from './useShowSaveFilePicker'
import { useWriteEmptyFile } from './useWriteEmptyFile'

export function createEmptyDatabase(): Database {
  return {
    dashboard: getInitialDashboardState(),
    categories: {},
    groups: {},
    projects: {},
    settings: getInitialSettingsState(),
  }
}

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
    addToRecentFiles(fileHandle)

    const writeOk = await writeEmptyFile(fileHandle)
    if (!writeOk) return

    dispatch(
      setDatabase({
        filename: fileHandle.name,
        database: createEmptyDatabase(),
      }),
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

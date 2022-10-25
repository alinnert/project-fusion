import { useCallback } from 'react'
import { useAppDispatch } from '../../redux'
import { startLoading } from '../../redux/database'
import { useReadDatabaseFile } from './useReadDatabaseFile'
import { useShowOpenFilePicker } from './useShowOpenFilePicker'

type UseOpenDatabaseResult = () => Promise<void>

export function useOpenDatabase(): UseOpenDatabaseResult {
  const dispatch = useAppDispatch()
  const showOpenFilePicker = useShowOpenFilePicker()
  const readDatabaseFile = useReadDatabaseFile()

  return useCallback(async () => {
    dispatch(startLoading())

    const fileHandle = await showOpenFilePicker()
    if (fileHandle === null) return

    readDatabaseFile(fileHandle)
  }, [dispatch, readDatabaseFile, showOpenFilePicker])
}

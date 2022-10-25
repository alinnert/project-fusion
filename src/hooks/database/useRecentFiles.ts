import { useSyncExternalStore } from 'react'
import {
  addToRecentFiles,
  clearRecentFiles,
  getSnapshot,
  removeFromRecentFiles,
  subscribe,
} from './recentFilesStore'

type UseRecentFilesResult = [
  FileSystemFileHandle[],
  {
    addToRecentFiles: (handle: FileSystemFileHandle) => void
    removeFromRecentFiles: (handle: FileSystemFileHandle) => void
    clearRecentFiles: () => void
  },
]

export function useRecentFiles(): UseRecentFilesResult {
  const useFileHandlesStore = useSyncExternalStore<FileSystemFileHandle[]>
  const recentFiles = useFileHandlesStore(subscribe, getSnapshot)
  const api = { addToRecentFiles, removeFromRecentFiles, clearRecentFiles }
  return [recentFiles, api]
}

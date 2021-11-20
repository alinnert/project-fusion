import { nanoid} from '@reduxjs/toolkit'
import { del, get, update } from 'idb-keyval'
import { asyncTry } from '../../utils/tryCatch'

const storageKey = 'recentFiles'

const fileHandles: Record<string, FileSystemFileHandle> = {}

export function getFileHandleById(id: string): FileSystemFileHandle | null {
  return fileHandles[id] ?? null
}

export async function getRecentFiles(): Promise<FileSystemFileHandle[]> {
  const result = await asyncTry(() => get<FileSystemFileHandle[]>(storageKey))
  if (result.caught) {
    return []
  }

  return result.value ?? []
}

const hasSameNameAs =
  (handleA: FileSystemFileHandle) => (handleB: FileSystemFileHandle) =>
    handleA.name === handleB.name

export async function addFileToRecentFiles(
  handleToAdd: FileSystemFileHandle,
): Promise<void> {
  asyncTry(() =>
    update<FileSystemFileHandle[]>(storageKey, (recentFiles = []) => {
      const handleWithSameName = recentFiles.find(hasSameNameAs(handleToAdd))

      const filteredRecentFiles =
        handleWithSameName !== undefined
          ? recentFiles.filter(hasSameNameAs(handleWithSameName))
          : recentFiles

      const newRecentFiles = [...filteredRecentFiles, handleToAdd]

      for (const file of newRecentFiles) {
        const id = nanoid()
        fileHandles[id] = file
      }
      
      return newRecentFiles
    }),
  )
}

export async function clearRecentFiles(): Promise<void> {
  for (const id of Object.keys(fileHandles)) {
    Reflect.deleteProperty(fileHandles, id)
  }
  del(storageKey)
}

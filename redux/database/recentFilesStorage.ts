import { del, get, update } from 'idb-keyval'
import { asyncTry } from '../../utils/tryCatch'

const storageKey = 'recentFiles'

export async function getRecentFiles(): Promise<FileSystemFileHandle[]> {
  const result = await asyncTry(() => get<FileSystemFileHandle[]>(storageKey))
  if (result.caught) {
    return []
  }

  return result.value ?? []
}

export async function addFileToRecentFiles(
  fileHandle: FileSystemFileHandle,
): Promise<void> {
  asyncTry(() =>
    update<FileSystemFileHandle[]>(storageKey, (recentFilesFromDb) => {
      if (
        recentFilesFromDb?.some((handle) => {
          console.log(`check ${handle.name} and ${fileHandle.name}`)
          return handle.isSameEntry(fileHandle)
        })
      ) {
        console.log('does already exist')
        return recentFilesFromDb
      }

      console.log('should be added')
      return [...(recentFilesFromDb ?? []), fileHandle]
    }),
  )
}

export async function clearRecentFiles(): Promise<void> {
  del(storageKey)
}

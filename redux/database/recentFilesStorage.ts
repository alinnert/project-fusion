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
    update<FileSystemFileHandle[]>(storageKey, (value) => {
      if (value?.some((handle) => handle.isSameEntry(fileHandle))) {
        return value
      }

      return [...(value ?? []), fileHandle]
    }),
  )
}

export async function clearRecentFiles(): Promise<void> {
  del(storageKey)
}

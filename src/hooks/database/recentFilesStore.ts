import { get, update } from 'idb-keyval'
import { arrayWithout } from '../../utils/array'

const storageKey = 'recentFiles'

let recentFiles: FileSystemFileHandle[] = []

init()

async function init(): Promise<void> {
  recentFiles = (await get<FileSystemFileHandle[]>(storageKey)) ?? []
}

const listeners: (() => void)[] = []

const filterHandleWithName = (name: string) => (handle: FileSystemFileHandle) =>
  handle.name === name

export function subscribe(onStoreChange: () => void): () => void {
  listeners.push(onStoreChange)
  return () => listeners.splice(listeners.indexOf(onStoreChange), 1)
}

export function getSnapshot(): FileSystemFileHandle[] {
  return recentFiles
}

function updateStore(handles: FileSystemFileHandle[]): void {
  recentFiles = handles.slice(0, 10)
  update(storageKey, () => handles)

  for (const listener of listeners) {
    listener()
  }
}

export function addToRecentFiles(newHandle: FileSystemFileHandle): void {
  const handleWithSameNameExists = recentFiles.some(
    (handle) => handle.name === newHandle.name,
  )

  if (handleWithSameNameExists) {
    // Move handle to beginning of list
    updateStore([
      newHandle,
      ...arrayWithout(
        recentFiles,
        ...recentFiles.filter(filterHandleWithName(newHandle.name)),
      ),
    ])
    return
  }

  updateStore([newHandle, ...recentFiles])
}

export function removeFromRecentFiles(handle: FileSystemFileHandle): void {
  updateStore(
    arrayWithout(
      recentFiles,
      ...recentFiles.filter(filterHandleWithName(handle.name)),
    ),
  )
}

export function clearRecentFiles(): void {
  updateStore([])
}

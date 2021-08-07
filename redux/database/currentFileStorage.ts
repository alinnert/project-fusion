import { del, get, set } from 'idb-keyval'

export const currentFileStorageKey = 'currentFile'

export async function getFileHandle(): Promise<
  FileSystemFileHandle | undefined
> {
  return get<FileSystemFileHandle>(currentFileStorageKey)
}

export async function hasCurrentFileHandle(): Promise<boolean> {
  const fileHandle = await get<FileSystemFileHandle>(currentFileStorageKey)
  return fileHandle !== undefined
}

export async function setFileHandle(
  fileHandle: FileSystemFileHandle,
): Promise<void> {
  set(currentFileStorageKey, fileHandle)
}

export async function removeFileHandle(): Promise<void> {
  del(currentFileStorageKey)
}

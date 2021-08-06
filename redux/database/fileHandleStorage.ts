import { del, get, set } from 'idb-keyval'

const storageKey = 'currentFile'

export async function setFileHandle(
  fileHandle: FileSystemFileHandle,
): Promise<void> {
  set(storageKey, fileHandle)
}

export async function getFileHandle(): Promise<
  FileSystemFileHandle | undefined
> {
  return get<FileSystemFileHandle>(storageKey)
}

export async function removeFileHandle(): Promise<void> {
  del(storageKey)
}

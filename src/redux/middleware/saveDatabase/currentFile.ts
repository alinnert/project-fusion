let currentFile: FileSystemFileHandle | null = null

export function setCurrentFile(handle: typeof currentFile): void {
  currentFile = handle
}

export function getCurrentFile(): FileSystemFileHandle | null {
  return currentFile
}

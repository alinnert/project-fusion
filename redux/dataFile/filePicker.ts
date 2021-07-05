import { DataFileState } from '.'
import { FileData } from '../../types/FileData'

export interface FilePickerResult {
  fileName: DataFileState['fileName']
  fileData: DataFileState['fileData']
}

export const filePickerOptions: OpenFilePickerOptions & SaveFilePickerOptions =
  {
    types: [
      {
        description: 'Projekt-Datei',
        accept: { 'application/json': ['.json'] },
      },
    ],
  }

export async function getDataFromFileHandle(
  handle: FileSystemFileHandle,
): Promise<FileData> {
  const file = await handle.getFile()
  const content = await file.text()
  try {
    return JSON.parse(content) as FileData
  } catch (error: unknown) {
    throw error
  }
}

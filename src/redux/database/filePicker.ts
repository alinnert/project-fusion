import { Database, DatabaseState } from '../database'
import { isDatabaseObject } from './isDatabaseObject'

export type FilePickerResult = {
  filename: DatabaseState['filename']
  database: Database
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
): Promise<Database> {
  try {
    const file = await handle.getFile()
    const content = await file.text()
    const result = JSON.parse(content) as unknown
    if (!isDatabaseObject(result)) {
      throw new Error('File is not a ProjectFusion database file.')
    }
    return result
  } catch (error: unknown) {
    throw error
  }
}

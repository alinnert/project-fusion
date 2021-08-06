import { get } from 'idb-keyval'
import { asyncTry } from '../../../utils/tryCatch'
import { currentFileStorageKey } from '../../database/currentFileStorage'

export async function writeToFile(content: string): Promise<void> {
  const getHandleResult = await asyncTry(() =>
    get<FileSystemFileHandle>(currentFileStorageKey),
  )
  if (getHandleResult.caught) {
    console.error(getHandleResult.error)
    return
  }

  const { value: fileHandle } = getHandleResult

  if (fileHandle === undefined) {
    console.error('There is no file handle in the database')
    return
  }

  const writableResult = await asyncTry(() => fileHandle.createWritable())
  if (writableResult.caught) {
    console.error(writableResult.error)
    return
  }

  const { value: writable } = writableResult

  const writeResult = await asyncTry(() => writable.write(content))
  if (writeResult.caught) {
    console.error(writeResult.error)
  }

  const closeResult = await asyncTry(() => writable.close())
  if (closeResult.caught) {
    console.error(closeResult.error)
  }
}

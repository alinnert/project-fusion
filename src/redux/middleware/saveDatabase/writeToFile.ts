import { asyncTry } from '../../../utils/tryCatch'
import { getCurrentFile } from './currentFile'

export async function writeToFile(content: string): Promise<void> {
  const fileHandle = getCurrentFile()
  if (fileHandle === null) {
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

  console.log('file written')
}

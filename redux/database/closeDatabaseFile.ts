import { closeDatabase } from '.'
import { store } from '..'
import { asyncTry } from '../../utils/tryCatch'
import { removeFileHandle } from './fileHandleStorage'

export async function closeDatabaseFile() {
  const removeHandleResult = await asyncTry(() => removeFileHandle())
  if (removeHandleResult.caught) {
    console.error(removeHandleResult.error)
  }

  store.dispatch(closeDatabase())
}

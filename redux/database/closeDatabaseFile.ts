import { closeDatabase } from '.'
import { store } from '..'
import { asyncTry } from '../../utils/tryCatch'
import { del } from 'idb-keyval'

export async function closeDatabaseFile() {
  const removeHandleResult = await asyncTry(() => del('fileHandle'))
  if (removeHandleResult.caught) {
    console.error(removeHandleResult.error)
  }

  store.dispatch(closeDatabase())
}

import { useAppDispatch } from '../../redux'
import { closeDatabase } from '../../redux/database'
import { removeFileHandle } from '../../redux/database/currentFileStorage'
import { asyncTry } from '../../utils/tryCatch'

export function useCloseDatabase(): () => Promise<void> {
  const dispatch = useAppDispatch()

  return async () => {
    const removeHandleResult = await asyncTry(() => removeFileHandle())
    if (removeHandleResult.caught) {
      console.error(removeHandleResult.error)
    }

    dispatch(closeDatabase())
  }
}

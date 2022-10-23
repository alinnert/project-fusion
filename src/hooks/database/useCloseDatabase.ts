import { useCallback } from 'react'
import { useAppDispatch } from '../../redux'
import { closeDatabase } from '../../redux/database'
import { resetUiState } from '../../redux/uiState'

type UseCloseDatabaseResult = () => void

export function useCloseDatabase(): UseCloseDatabaseResult {
  const dispatch = useAppDispatch()

  return useCallback(() => {
    dispatch(closeDatabase())
    dispatch(resetUiState())
  }, [dispatch])
}

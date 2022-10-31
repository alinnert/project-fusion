import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../redux'
import { Dashboard, setNotes } from '../../redux/dashboard'

type UseDashboardActionsOptions = {
  notes: Dashboard['notes']
}

type UseDashboardActionsResult = {
  saveDashboard: () => void
}

export function useDashboardActions({
  notes,
}: UseDashboardActionsOptions): UseDashboardActionsResult {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  return {
    saveDashboard() {
      dispatch(setNotes(notes))
      navigate('/groups')
    },
  }
}

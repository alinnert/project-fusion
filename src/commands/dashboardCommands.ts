import { store } from '../redux'
import { Dashboard, dashboardActions } from '../redux/dashboard'
import { NavigableCommand } from './useCommand'

const { dispatch } = store

export const saveDashboardCommand: NavigableCommand<Dashboard> = {
  run({ notes }) {
    dispatch(dashboardActions.setNotes(notes))
  },
  navigate: '/groups',
}

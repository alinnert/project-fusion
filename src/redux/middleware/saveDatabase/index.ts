import { AnyAction, Middleware } from '@reduxjs/toolkit'
import { AppState } from '../..'
import { writeToFile } from './writeToFile'

export const saveDatabaseMiddleware: Middleware = ({ getState }) => {
  return (next) => (action: AnyAction) => {
    const result = next(action)
    const state: AppState = getState()

    if (state.database.filename !== null) {
      const fileData = {
        categories: state.categories.entities,
        groups: state.groups.entities,
        projects: state.projects.entities,
        settings: state.settings,
      }
      const fileContent = JSON.stringify(fileData)
      writeToFile(fileContent)
    }

    return result
  }
}

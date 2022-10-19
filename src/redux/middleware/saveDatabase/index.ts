import { AnyAction, Middleware } from '@reduxjs/toolkit'
import { debounce } from 'throttle-debounce'
import { AppState } from '../..'
import { writeToFile } from './writeToFile'

const debouncedWriteToFile = debounce(1000, (fileContent) => {
  writeToFile(fileContent)
})

let lastFileContent = ''

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

      if (fileContent !== lastFileContent) {
        debouncedWriteToFile(fileContent)
        lastFileContent = fileContent
      }
    }

    return result
  }
}

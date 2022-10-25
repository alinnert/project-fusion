import { AnyAction, Middleware } from '@reduxjs/toolkit'
import { debounce } from 'throttle-debounce'
import { AppState } from '../..'
import { writeStateToFile } from './writeStateToFile'

const debouncedWriteToFile = debounce(1000, writeStateToFile)

export const saveDatabaseMiddleware: Middleware = ({ getState }) => {
  return (next) => (action: AnyAction) => {
    const result = next(action)
    const state: AppState = getState()

    if (state.database.filename !== null) {
      debouncedWriteToFile(state)
    }

    return result
  }
}

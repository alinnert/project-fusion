import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { categoriesReducer } from './categories'
import { databaseReducer } from './database'
import { groupsReducer } from './groups'
import { projectsReducer } from './projects'
import { settingsReducer } from './settings'

export const store = configureStore({
  reducer: {
    database: databaseReducer,
    categories: categoriesReducer,
    groups: groupsReducer,
    projects: projectsReducer,
    settings: settingsReducer,
  },
})

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector
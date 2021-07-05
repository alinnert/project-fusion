import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { dataFileSlice } from './dataFile'

export const store = configureStore({
  reducer: {
    dataFile: dataFileSlice.reducer,
  },
})

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()

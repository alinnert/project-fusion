import { createSlice } from '@reduxjs/toolkit'
import { Category } from '../categories'
import { closeDatabase, setDatabase } from '../database'

export interface Settings {
  categoryOrder: Array<Category['id']>
  bookingUrl: string
}

function getInitialState(): Settings {
  return { bookingUrl: '', categoryOrder: [] }
}

const slice = createSlice({
  name: 'settings',
  initialState: getInitialState(),
  reducers: {},
  extraReducers(builder) {
    builder.addCase(setDatabase, (state, { payload }) => {
      Object.assign(state, payload.database.settings)
    })

    builder.addCase(closeDatabase, (state) => {
      return getInitialState()
    })
  },
})

export const {
  reducer: settingsReducer,
  actions: {},
} = slice

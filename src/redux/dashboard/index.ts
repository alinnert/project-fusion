import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { setDatabase } from '../database'

export type Dashboard = {
  notes: string
}

function getInitialDashboardState(): Dashboard {
  return { notes: '' }
}

const slice = createSlice({
  name: 'dashboard',
  initialState: getInitialDashboardState(),
  reducers: {
    setNotes(state, action: PayloadAction<string>) {
      state.notes = action.payload
    },
  },
  extraReducers(builder) {
    builder.addCase(setDatabase, (state, { payload }) => {
      state.notes = payload.database.dashboard.notes
    })
  },
})

export const dashboardReducer = slice.reducer

export const { setNotes } = slice.actions

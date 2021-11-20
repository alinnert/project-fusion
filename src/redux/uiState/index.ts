import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface UiSettings {
  currentGroupId: string | null
  currentConfigId: string
}

function getInitialState(): UiSettings {
  return { currentGroupId: null, currentConfigId: 'interface' }
}

const slice = createSlice({
  name: 'uiState',
  initialState: getInitialState(),

  reducers: {
    setCurrentGroupId(
      state,
      action: PayloadAction<UiSettings['currentGroupId']>,
    ) {
      state.currentGroupId = action.payload
    },

    setCurrentConfigId(
      state,
      action: PayloadAction<UiSettings['currentConfigId']>,
    ) {
      state.currentConfigId = action.payload
    },
  },
})

export const uiStateReducer = slice.reducer

export const { setCurrentGroupId, setCurrentConfigId } = slice.actions

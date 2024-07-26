import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type UiSettings = {
  currentGroupId: string | null
  currentConfigId: string
}

function getInitialUiSettingsState(): UiSettings {
  return { currentGroupId: null, currentConfigId: 'interface' }
}

const slice = createSlice({
  name: 'uiState',
  initialState: getInitialUiSettingsState(),

  reducers: {
    resetUiState() {
      return getInitialUiSettingsState()
    },

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

export const { resetUiState, setCurrentGroupId, setCurrentConfigId } =
  slice.actions

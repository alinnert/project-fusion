import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { swapArrayElements } from '../../utils/array'
import { addCategory, Category, removeCategory } from '../categories'
import { closeDatabase, setDatabase } from '../database'
import { SortOrder } from './SortOrder'

export interface CustomLink {
  label: string
  url: string
}

export type ProjectsSortOrder = {
  sortBy: 'name' | 'projectNumber'
  sortOrder: SortOrder
}

export interface Settings {
  categoryOrder: Array<Category['id']>
  primaryProjectLink: CustomLink | null
  projectLinks: CustomLink[]
  projectsSortOrder: ProjectsSortOrder
  projectIdWording: string | null
}

export function getInitialSettingsState(): Settings {
  return {
    categoryOrder: [],
    primaryProjectLink: null,
    projectLinks: [],
    projectsSortOrder: { sortBy: 'projectNumber', sortOrder: 'ascending' },
    projectIdWording: null,
  }
}

const slice = createSlice({
  name: 'settings',
  initialState: getInitialSettingsState(),

  reducers: {
    setPrimaryProjectLink(state, action: PayloadAction<CustomLink | null>) {
      state.primaryProjectLink = action.payload
    },

    swapCategories(
      state,
      action: PayloadAction<{
        categoryId: Category['id']
        direction: 'up' | 'down'
      }>,
    ) {
      const index = state.categoryOrder.indexOf(action.payload.categoryId)
      swapArrayElements(state.categoryOrder, index, action.payload.direction)
    },

    setProjectsSortOrder(state, action: PayloadAction<ProjectsSortOrder>) {
      state.projectsSortOrder = action.payload
    },
  },

  extraReducers(builder) {
    builder.addCase(setDatabase, (state, { payload }) => {
      Object.assign(state, payload.database.settings)
    })

    builder.addCase(closeDatabase, () => getInitialSettingsState())

    builder.addCase(addCategory, (state, { payload }) => {
      state.categoryOrder.push(payload.id)
    })

    builder.addCase(removeCategory, (state, { payload }) => {
      const spliceIndex = state.categoryOrder.indexOf(payload.toString())
      state.categoryOrder.splice(spliceIndex, 1)
    })
  },
})

export const settingsReducer = slice.reducer

export const { setPrimaryProjectLink, swapCategories, setProjectsSortOrder } =
  slice.actions

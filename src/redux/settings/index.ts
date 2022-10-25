import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { swapArrayElements } from '../../utils/array'
import { addCategory, Category, removeCategory } from '../categories'
import { closeDatabase, setDatabase } from '../database'

export interface CustomLink {
  label: string
  url: string
}

type ProjectSortOrder = {
  sortBy: 'name' | 'id'
  sortOrder: 'ascending' | 'descending'
}

export interface Settings {
  categoryOrder: Array<Category['id']>
  primaryProjectLink: CustomLink | null
  projectLinks: CustomLink[]
  projectsSortOrder: ProjectSortOrder
  projectIdWording: string | null
}

export function getInitialSettingsState(): Settings {
  return {
    categoryOrder: [],
    primaryProjectLink: null,
    projectLinks: [],
    projectsSortOrder: { sortBy: 'id', sortOrder: 'ascending' },
    projectIdWording: null
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

export const { setPrimaryProjectLink, swapCategories } = slice.actions

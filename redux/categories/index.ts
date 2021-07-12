import {
  createEntityAdapter,
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit'
import { closeDatabase, setDatabase } from '../database'
import { ProjectGroup } from '../groups'

export interface Category {
  id: string
  name: string
  groups: Array<ProjectGroup['id']>
}

const adapter = createEntityAdapter<Category>()

const slice = createSlice({
  name: 'categories',
  initialState: adapter.getInitialState(),
  reducers: {
    addCategory: adapter.addOne,
    setCategory: adapter.setOne,
    updateCategory: adapter.updateOne,
    removeCategory: adapter.removeOne,
    setCategories: adapter.setAll,

    addGroupToCategory(
      state,
      action: PayloadAction<{
        category: Category['id']
        group: ProjectGroup['id']
      }>,
    ) {
      state.entities[action.payload.category]?.groups.push(action.payload.group)
    },
  },
  extraReducers(builder) {
    builder.addCase(setDatabase, (state, { payload }) => {
      adapter.setAll(state, payload.database.categories)
    })
    builder.addCase(closeDatabase, (state) => {
      adapter.removeAll(state)
    })
  },
})

export const {
  reducer: categoriesReducer,
  actions: {
    addCategory,
    setCategory,
    updateCategory,
    removeCategory,
    setCategories,
    addGroupToCategory,
  },
} = slice

import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
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
    removeCategory: adapter.removeOne,
    setCategories: adapter.setAll,
  },
  extraReducers(builder) {
    builder.addCase(setDatabase, (state, { payload }) => {
      state.entities = payload.database.categories
    })
    builder.addCase(closeDatabase, (state) => {
      return adapter.getInitialState()
    })
  },
})

export const {
  reducer: categoriesReducer,
  actions: { addCategory, setCategory, removeCategory, setCategories },
} = slice

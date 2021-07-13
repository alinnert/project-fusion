import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
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
        categoryId: Category['id']
        groupId: ProjectGroup['id']
      }>,
    ) {
      for (const category of Object.values(state.entities)) {
        if (!category?.groups.includes(action.payload.groupId)) continue
        category.groups.splice(
          category.groups.indexOf(action.payload.groupId),
          1,
        )
      }

      state.entities[action.payload.categoryId]?.groups.push(
        action.payload.groupId,
      )
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

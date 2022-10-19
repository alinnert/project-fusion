import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit'
import { removeElementsFromArray } from '../../utils/array'
import { closeDatabase, setDatabase } from '../database'
import { ProjectGroup } from '../groups'

export interface Category {
  id: string
  name: string
  groups: Array<ProjectGroup['id']>
}

export const NO_CATEGORY = Symbol('no category')

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
        categoryId: Category['id'] | null
        groupId: ProjectGroup['id']
      }>,
    ) {
      const { categoryId, groupId } = action.payload

      // Remove group from all categories before adding it to the intended one.
      for (const category of Object.values(state.entities)) {
        if (category === undefined) continue
        removeElementsFromArray(category.groups, groupId)
      }

      if (categoryId !== null) {
        state.entities[categoryId]?.groups.push(groupId)
      }
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

export const categoriesReducer = slice.reducer

export const {
  addCategory,
  setCategory,
  updateCategory,
  removeCategory,
  setCategories,
  addGroupToCategory,
} = slice.actions

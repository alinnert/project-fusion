import {
  createEntityAdapter,
  createSelector,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit'
import { AppState } from '..'
import { removeElementsFromArray } from '../../utils/array'
import { closeDatabase, setDatabase } from '../database'
import { Project } from '../projects'

export interface ProjectGroup {
  id: string
  name: string
  color: string
  notes: string
  projects: Array<Project['id']>
}

const adapter = createEntityAdapter<ProjectGroup>()

const slice = createSlice({
  name: 'projectGroups',
  initialState: adapter.getInitialState(),
  reducers: {
    addGroup: adapter.addOne,
    setGroup: adapter.setOne,
    updateGroup: adapter.updateOne,
    removeGroup: adapter.removeOne,
    setGroups: adapter.setAll,

    addProjectToGroup(
      state,
      action: PayloadAction<{
        groupId: ProjectGroup['id']
        projectId: Project['id']
      }>,
    ) {
      const { projectId, groupId } = action.payload

      // Remove project from all groups before adding it to the intended one.
      for (const group of Object.values(state.entities)) {
        if (group === undefined) continue
        removeElementsFromArray(group.projects, projectId)
      }

      state.entities[groupId]?.projects.push(projectId)
    },
  },
  extraReducers(builder) {
    builder.addCase(setDatabase, (state, { payload }) => {
      adapter.setAll(state, payload.database.groups)
    })

    builder.addCase(closeDatabase, (state) => {
      adapter.removeAll(state)
    })
  },
})

export const {
  reducer: groupsReducer,
  actions: {
    addGroup,
    setGroup,
    updateGroup,
    removeGroup,
    setGroups,
    addProjectToGroup,
  },
} = slice

export const selectGroupIdsWithoutCategory = createSelector(
  [(state: AppState) => state.categories.entities, (state) => state.groups.ids],
  (categories, groupIds): Array<ProjectGroup['id']> => {
    const categorizedGroupIds = Object.values(categories).flatMap(
      (category) => category?.groups ?? [],
    )

    const uncategorizedGroupIds = groupIds
      .filter((groupId) => !categorizedGroupIds.includes(groupId.toString()))
      .map((id) => id.toString())

    return uncategorizedGroupIds
  },
)

export const selectGroupsWithoutCategory = createSelector(
  (state: AppState) => state.groups.entities,
  selectGroupIdsWithoutCategory,
  (groups, groupIds) => {
    return groupIds.flatMap((groupId) => {
      const group = groups[groupId]
      return group !== undefined ? [group] : []
    })
  },
)

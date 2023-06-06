import { EntityId } from '@reduxjs/toolkit'
import { store } from '../redux'
import { addGroupToCategory } from '../redux/categories'
import { addGroup, ProjectGroup, updateGroup } from '../redux/groups'
import { setCurrentGroupId } from '../redux/uiState'
import { Command, NavigableCommand } from './useCommand'

const { dispatch } = store

export const setCurrentGroupCommand: Command<EntityId | null> = {
  run(payload) {
    dispatch(setCurrentGroupId(payload))
  },
}

export const createGroupCommand: NavigableCommand<{
  groupId: EntityId
  group: ProjectGroup
  categoryId: EntityId | null
}> = {
  run({ groupId, group, categoryId }) {
    dispatch(addGroup(group))
    if (categoryId !== null) {
      dispatch(addGroupToCategory({ categoryId, groupId }))
    }
  },
  navigate: ({ groupId }) => `/groups/${groupId}`,
}

export const updateGroupCommand: NavigableCommand<{
  id: EntityId
  changes: Partial<ProjectGroup>
  categoryId: EntityId | null
}> = {
  run({ id, changes, categoryId }) {
    dispatch(updateGroup({ id, changes }))
    dispatch(addGroupToCategory({ groupId: id, categoryId }))
  },
  navigate: (payload) => `/groups/${payload.id}`,
}

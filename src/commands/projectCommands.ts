import { EntityId, Update } from '@reduxjs/toolkit'
import { store } from '../redux'
import { addProjectToGroup, groupsActions, ProjectGroup } from '../redux/groups'
import {
  Project,
  projectsActions,
  removeProject,
  updateProject,
} from '../redux/projects'
import { Command, NavigableCommand } from './useCommand'

const { dispatch } = store

export const createProjectCommand: NavigableCommand<{
  project: Project
  groupId: ProjectGroup['id']
}> = {
  run({ project, groupId }) {
    dispatch(projectsActions.addProject(project))
    dispatch(
      groupsActions.addProjectToGroup({ groupId, projectId: project.id }),
    )
  },
  navigate: ({ groupId }) => `/groups/${groupId}`,
}

export const updateProjectCommand: NavigableCommand<
  Update<Project> & { groupId: ProjectGroup['id'] | null }
> = {
  run({ id, changes, groupId }) {
    dispatch(projectsActions.updateProject({ id, changes }))
    if (groupId !== null) {
      dispatch(addProjectToGroup({ groupId, projectId: id }))
    }
  },
  navigate: ({ groupId }) => `/groups/${groupId}`,
}

export const removeProjectCommand: Command<EntityId> = {
  run(payload) {
    dispatch(removeProject(payload))
  },
}

export const setProjectArchivedPropCommand: Command<{
  id: EntityId
  archived: Project['archived']
}> = {
  run({ id, archived }) {
    dispatch(updateProject({ id, changes: { archived } }))
  },
}

export const setProjectImportantPropCommand: Command<{
  id: EntityId
  important: Project['important']
}> = {
  run({ id, important }) {
    dispatch(updateProject({ id, changes: { important } }))
  },
}

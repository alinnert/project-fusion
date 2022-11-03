import { Update } from '@reduxjs/toolkit'
import { store } from '../redux'
import { addProjectToGroup, groupsActions, ProjectGroup } from '../redux/groups'
import { Project, projectsActions } from '../redux/projects'
import { NavigableCommand } from './useCommand'

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

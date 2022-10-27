import { useNavigate } from 'react-router-dom'
import { useGroupFromRoute } from '../../components/groups/useGroupFromRoute'
import { useProjectsFromGroup } from '../../components/projects/useProjectsFromGroup'
import {
  useConfirmDialog,
  UseConfirmDialogResult,
} from '../../components/ui/dialogs/useConfirmDialog'
import { useAppDispatch } from '../../redux'
import { addGroupToCategory } from '../../redux/categories'
import { removeGroup } from '../../redux/groups'
import { removeProjects } from '../../redux/projects'

export type GroupDialogs = 'confirmDelete'

type UseGroupDialogsResult = Record<GroupDialogs, UseConfirmDialogResult>

export function useGroupDialogs(): UseGroupDialogsResult {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const { group, groupId } = useGroupFromRoute()
  const projects = useProjectsFromGroup(group)

  return {
    confirmDelete: useConfirmDialog({
      onConfirm() {
        if (groupId === null) return
        dispatch(removeProjects(projects.map(({ id }) => id)))
        dispatch(addGroupToCategory({ groupId, categoryId: null }))
        dispatch(removeGroup(groupId))
        navigate('/groups')
      },
    }),
  }
}

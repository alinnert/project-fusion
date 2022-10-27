import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../../redux'
import { addGroupToCategory, Category } from '../../../redux/categories'
import { addGroup, ProjectGroup, updateGroup } from '../../../redux/groups'
import { createId } from '../../../utils/customNanoId'

type UseGroupEditFormActionsOptions = {
  name: string
  color: string
  notes: string
  categoryId: Category['id'] | null
  init: ProjectGroup | null
}

type UseGroupEditFormActions = {
  saveGroup: () => void
}

export function useGroupEditFormActions({
  name,
  color,
  notes,
  init,
  categoryId,
}: UseGroupEditFormActionsOptions): UseGroupEditFormActions {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  function editGroup(): void {
    if (init === null) return

    dispatch(
      updateGroup({
        id: init.id,
        changes: { name, color, notes, projects: init.projects },
      }),
    )

    dispatch(addGroupToCategory({ groupId: init.id, categoryId }))

    navigate(`/groups/${init.id}`)
  }

  function createGroup(): void {
    const id = createId()

    dispatch(addGroup({ id, name, color, notes, projects: [] }))

    if (categoryId !== null) {
      dispatch(addGroupToCategory({ categoryId: categoryId, groupId: id }))
    }

    navigate(`/groups/${id}`)
  }

  return {
    saveGroup() {
      if (init !== null) {
        editGroup()
      } else {
        createGroup()
      }
    },
  }
}

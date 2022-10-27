import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch } from '../../redux'
import { ProjectsSortOrder, setProjectsSortOrder } from '../../redux/settings'

export type UseGroupActionsResult = {
  createProject: () => void
  editGroup: () => void
  changeProjectsSortOrder: (sortOrder: ProjectsSortOrder) => void
}

export function useGroupActions(): UseGroupActionsResult {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const params = useParams()
  const { groupId } = params

  return {
    createProject() {
      if (groupId === undefined) return
      navigate(`/groups/${groupId}/new-project`)
    },

    editGroup() {
      if (groupId === undefined) return
      navigate(`/groups/${groupId}/edit`)
    },

    changeProjectsSortOrder(sortOrder) {
      dispatch(setProjectsSortOrder(sortOrder))
    },
  }
}

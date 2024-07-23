import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch } from '../../redux'
import { ProjectsSortOrder, setProjectsSortOrder } from '../../redux/settings'

export type UseGroupActionsResult = {
  editGroup: () => void
  changeProjectsSortOrder: (sortOrder: ProjectsSortOrder) => void
}

export function useGroupActions(): UseGroupActionsResult {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { groupId } = useParams()

  return {
    editGroup() {
      if (groupId === undefined) return
      navigate(`/groups/${groupId}/edit`)
    },

    changeProjectsSortOrder(sortOrder) {
      dispatch(setProjectsSortOrder(sortOrder))
    },
  }
}

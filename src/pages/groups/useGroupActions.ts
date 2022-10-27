import { useNavigate, useParams } from 'react-router-dom'

export type UseGroupActionsResult = {
  createProject: () => void
  editGroup: () => void
}

export function useGroupActions(): UseGroupActionsResult {
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
  }
}

import { useGlobalKeyDown } from '../../utils/events'
import { ctrlOrCmd } from '../../utils/keyboard'
import { useGroupActions } from './useGroupActions'

export function useGroupShortcuts(): void {
  const { createProject, editGroup } = useGroupActions()

  useGlobalKeyDown((event) => {
    if (ctrlOrCmd(event) && event.key === 'e') {
      event.preventDefault()
      editGroup()
    }

    if (ctrlOrCmd(event) && event.key === 'n') {
      event.preventDefault()
      createProject()
    }
  })
}

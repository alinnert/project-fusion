import { useGlobalKeyDown } from '../../../utils/events'
import { ctrlOrCmd } from '../../../utils/keyboard'

type UseGroupEditFormShortcutsOptions = {
  saveGroup: () => void
}

export function useGroupEditFormShortcuts({
  saveGroup,
}: UseGroupEditFormShortcutsOptions): void {
  useGlobalKeyDown((event) => {
    if (ctrlOrCmd(event) && event.key === 's') {
      event.preventDefault()
      saveGroup()
    }
  })
}

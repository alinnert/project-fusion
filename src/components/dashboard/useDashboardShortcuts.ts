import { useGlobalKeyDown } from '../../utils/events'
import { ctrlOrCmd } from '../../utils/keyboard'

type UseDashboardShortcutsOptions = {
  saveDashboard: () => void
}

export function useDashboardShortcuts({
  saveDashboard,
}: UseDashboardShortcutsOptions): void {
  useGlobalKeyDown((event) => {
    if (ctrlOrCmd(event) && event.key === 's') {
      event.preventDefault()
      saveDashboard()
    }
  })
}

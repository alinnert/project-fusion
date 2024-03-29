import { KeyboardEvent as ReactKeyboardEvent } from 'react'

export function ctrlOrCmd(event: KeyboardEvent | ReactKeyboardEvent): boolean {
  // @ts-expect-error This api is very new. No types are available yet.
  const platform = navigator.userAgentData?.platform ?? navigator.platform
  const isMac = /Mac|iPod|iPhone|iPad/i.test(platform)

  return isMac ? event.metaKey : event.ctrlKey
}

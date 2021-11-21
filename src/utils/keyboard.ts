import { KeyboardEvent } from 'react'

export function useCtrlOrCmd(): (event: KeyboardEvent) => boolean {
  return (event) => {
    // @ts-expect-error This api is very new. No types are available yet.
    const platform = navigator.userAgentData?.platform ?? navigator.platform
    const isMac = /Mac|iPod|iPhone|iPad/i.test(platform)

    return isMac ? event.metaKey : event.ctrlKey
  }
}

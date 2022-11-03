import { useNavigate } from 'react-router-dom'

type CommandNavigate<P> = { navigate: ((payload: P) => string) | string }

export type Command<P = void> = { run: (payload: P) => void }
export type NavigableCommand<P = void> = Command<P> & CommandNavigate<P>

type CommandResult<P> = { run: (payload: P) => void }
type NavigableCommandResult<P> = CommandResult<P> & {
  runAndNavigate: (payload: P) => void
}

export function useCommand<P>(
  command: NavigableCommand<P>,
): NavigableCommandResult<P>
export function useCommand<P>(command: Command<P>): CommandResult<P>
export function useCommand<P>(
  command: Command<P> | NavigableCommand<P>,
): CommandResult<P> | NavigableCommandResult<P> {
  const navigate = useNavigate()

  const run: CommandResult<P>['run'] = (payload) => {
    command.run(payload)
  }

  const runAndNavigate: NavigableCommandResult<P>['runAndNavigate'] = (
    payload,
  ) => {
    run(payload)

    if (!('navigate' in command)) return

    const route =
      typeof command.navigate === 'string'
        ? command.navigate
        : command.navigate(payload)

    navigate(route)
  }

  return 'navigate' in command ? { run, runAndNavigate } : { run }
}

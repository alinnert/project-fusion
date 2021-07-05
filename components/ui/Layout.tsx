import { FC, PropsWithChildren, ReactNode, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { AppState, useAppDispatch } from '../../redux'
import { createFile } from '../../redux/dataFile/createFileThunk'
import { openFile } from '../../redux/dataFile/openFileThunk'
import { Button } from './Button'
import { Input } from './Input'

interface Props {
  header?: ReactNode
  left?: ReactNode
  right?: ReactNode
}

export const Layout: FC<PropsWithChildren<Props>> = ({
  children,
  header,
  left,
  right,
}) => {
  const dispatch = useAppDispatch()
  const fileName = useSelector(
    (state: AppState) => state.dataFile.fileName ?? '(no file)',
  )
  const showRightPanel = useMemo(() => right ?? null !== null, [right])

  function handleCreateProjectClick(): void {
    dispatch(createFile())
  }

  function handleOpenProjectClick(): void {
    dispatch(openFile())
  }

  return (
    <div
      className="
        grid grid-cols-[300px,1fr,1fr] grid-rows-[auto,1fr]
        fixed inset-0
      "
    >
      <div
        className="
          row-start-1 col-start-1 col-span-3
          grid grid-cols-[1fr,auto]
          bg-brand-600 text-white
          px-4 py-2
        "
      >
        <div
          className="
            row-start-1 col-start-1
            flex items-center
          "
        >
          <div className="mr-4 text-xl font-semibold tracking-wide">
            ProjectFusion
          </div>

          <span className="inline-flex items-center gap-x-2">
            <Button showBorder={false} onClick={handleCreateProjectClick}>
              Neue Datei
            </Button>
            <Button showBorder={false} onClick={handleOpenProjectClick}>
              Datei öffnen
            </Button>
            {fileName ?? '(no file)'}
            {header}
          </span>
        </div>

        <div
          className="
            row-start-1 col-start-2
            flex items-center gap-x-2
          "
        >
          <Input
            showBorder={false}
            placeholder="Suchen / Zu Projekt springen..."
          />
          <Button showBorder={false}>Suchen</Button>
        </div>
      </div>

      <div className="row-start-2 col-start-1 bg-neutral-50">{left}</div>

      <div
        className={`row-start-2 col-start-2 ${
          showRightPanel ? '' : 'col-span-2'
        }`}
      >
        {children}
      </div>

      {showRightPanel ? (
        <div className="row-start-2 col-start-3">{right}</div>
      ) : null}
    </div>
  )
}

import React, { FC, PropsWithChildren, ReactNode, useMemo } from 'react'
import { useAppSelector } from '../../redux'
import { selectIsFileOpen } from '../../redux/database'
import { FileControls } from '../dataFile/FileControls'
import { ViewAreaTabs } from '../dataFile/ViewAreaTabs'
import { HeaderSearch } from '../ui/HeaderSearch'
import { Logo } from '../ui/Logo'

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
  const isFileOpen = useAppSelector(selectIsFileOpen)
  const showRightPanel = useMemo(() => right ?? null !== null, [right])

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
          <Logo />

          <span className="flex items-center gap-x-2">
            <FileControls />
            {isFileOpen ? <ViewAreaTabs /> : null}
            {header}
          </span>
        </div>

        <div className="row-start-1 col-start-2 flex items-center gap-x-2">
          {isFileOpen ? <HeaderSearch /> : null}
        </div>
      </div>

      <div className="row-start-2 col-start-1 bg-neutral-50 border-r border-neutral-400">
        {left}
      </div>

      <div
        className={`row-start-2 col-start-2 ${
          showRightPanel ? '' : 'col-span-2'
        }`}
      >
        {children}
      </div>

      {showRightPanel ? (
        <div className="row-start-2 col-start-3 border-l border-neutral-400">
          {right}
        </div>
      ) : null}
    </div>
  )
}

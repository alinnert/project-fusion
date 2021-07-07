import React, { FC, PropsWithChildren, ReactNode, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { AppState } from '../../redux'
import { FileControls } from '../dataFile/FileControls'
import { ViewAreaTabs } from '../dataFile/ViewAreaTabs'
import { Button } from './Button'
import { HeaderButton } from './HeaderButton'
import { HeaderSearch } from './HeaderSearch'
import { Input } from './Input'
import { Logo } from './Logo'

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
  const fileData = useSelector((state: AppState) => state.dataFile.fileData)
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
            {fileData !== null ? <ViewAreaTabs /> : null}
            {header}
          </span>
        </div>

        <div className="row-start-1 col-start-2 flex items-center gap-x-2">
          {fileData !== null ? <HeaderSearch /> : null}
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

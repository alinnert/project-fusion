import classNames from 'classnames'
import React, { FC, PropsWithChildren, ReactNode, useMemo } from 'react'
import { useAppSelector } from '../../redux'
import { selectIsFileOpen } from '../../redux/database'
import { matchBoolToString } from '../../utils/match'
import { FileControls } from '../dataFile/FileControls'
import { ViewAreaTabs } from '../dataFile/ViewAreaTabs'
import { LanguageChooser } from '../settings/LanguageChooser'
import { HeaderSearch } from '../ui/HeaderSearch'
import { Separator } from '../ui/HeaderSeparator'
import { Logo } from '../ui/Logo'

interface Props {
  left?: ReactNode
  right?: ReactNode
}

export const Layout: FC<PropsWithChildren<Props>> = ({
  children,
  left,
  right,
}) => {
  const isFileOpen = useAppSelector(selectIsFileOpen)
  const showRightPanel = useMemo(() => (right ?? null) !== null, [right])

  return (
    <div
      className={classNames(
        'grid grid-cols-[300px,1fr,1fr] grid-rows-[auto,1fr]',
        'fixed inset-0',
      )}
    >
      <div
        className={classNames(
          'row-start-1 col-start-1 col-span-3',
          'grid grid-cols-[1fr,auto]',
          'px-2 py-2',
          'bg-gradient-brand',
          'text-white',
        )}
      >
        <div
          className={classNames('row-start-1 col-start-1', 'flex items-center')}
        >
          <Logo />
          <FileControls />
          <Separator type="header" />
          <ViewAreaTabs />

          <div className="ml-auto">
            <LanguageChooser />
          </div>
        </div>

        <div
          className={classNames(
            'row-start-1 col-start-2',
            'flex items-center gap-x-2',
          )}
        >
          {isFileOpen ? <HeaderSearch /> : null}
        </div>
      </div>

      <div
        className={classNames(
          'row-start-2 col-start-1 overflow-hidden',
          'bg-neutral-50',
          'border-r border-neutral-300',
        )}
      >
        {left}
      </div>

      <div
        className={classNames(
          'row-start-2 col-start-2 overflow-hidden',
          matchBoolToString(!showRightPanel, 'col-span-2'),
        )}
      >
        {children}
      </div>

      {showRightPanel ? (
        <div
          className={classNames(
            'row-start-2 col-start-3 overflow-hidden',
            'border-l border-neutral-300',
          )}
        >
          {right}
        </div>
      ) : null}
    </div>
  )
}

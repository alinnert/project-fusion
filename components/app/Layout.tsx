import classNames from 'classnames'
import Image from 'next/image'
import React, { FC, PropsWithChildren, ReactNode, useMemo } from 'react'
import IconWhite from '../../public/icon-white.svg'
import { useAppSelector } from '../../redux'
import { selectIsFileOpen } from '../../redux/database'
import { matchBoolToString } from '../../utils/match'
import { DatabaseMenu } from '../dataFile/DatabaseMenu'
import { LanguageChooser } from '../settings/LanguageChooser'
import { HeaderSearch } from '../ui/HeaderSearch'
import { Separator } from '../ui/HeaderSeparator'
import { ViewAreaTabs } from './ViewAreaTabs'

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
  const showLeftPanel = useMemo(() => (left ?? null) !== null, [left])

  return (
    <div
      className={classNames(
        'grid grid-cols-[360px,1fr,1fr] grid-rows-[auto,1fr]',
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
          <div className="ml-2 mr-4 leading-[0]">
            <Image src={IconWhite} alt="" width="28" height="28" />
          </div>
          <DatabaseMenu />
          <Separator type="header" />
          <ViewAreaTabs />
        </div>

        <div
          className={classNames('row-start-1 col-start-2', 'flex items-center')}
        >
          {isFileOpen ? (
            <>
              <HeaderSearch />
              <Separator type="header" />
            </>
          ) : null}

          <LanguageChooser />
        </div>
      </div>

      {showLeftPanel ? (
        <div
          className={classNames(
            'row-start-2 col-start-1 overflow-hidden',
            'bg-neutral-50',
            'border-r border-neutral-200',
          )}
        >
          {left}
        </div>
      ) : null}

      <div
        className={classNames(
          'row-start-2 overflow-hidden',
          matchBoolToString(showLeftPanel, 'col-start-2', 'col-start-1'),
          matchBoolToString(showRightPanel, 'col-end-3', 'col-end-4'),
        )}
      >
        {children}
      </div>

      {showRightPanel ? (
        <div
          className={classNames(
            'row-start-2 col-start-3 overflow-hidden',
            'border-l border-neutral-200',
          )}
        >
          {right}
        </div>
      ) : null}
    </div>
  )
}

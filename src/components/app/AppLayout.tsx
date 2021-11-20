import classNames from 'classnames'
import React, { FC, PropsWithChildren, ReactNode, useMemo } from 'react'
import { useAppSelector } from '../../redux'
import { selectIsFileOpen } from '../../redux/database'
import { matchBoolToString } from '../../utils/match'
import { DatabaseMenu } from '../dataFile/DatabaseMenu'
import { HeaderSearch } from '../ui/HeaderSearch'
import { AppLogo } from './AppLogo'
import { AppTabs } from './AppTabs'

interface Props {
  left?: ReactNode
  right?: ReactNode
}

export const AppLayout: FC<PropsWithChildren<Props>> = ({ children, left }) => {
  const isFileOpen = useAppSelector(selectIsFileOpen)
  const showLeftPanel = useMemo(() => (left ?? null) !== null, [left])

  return (
    <div
      className={classNames(
        'grid grid-cols-[360px,1fr] grid-rows-[auto,1fr]',
        'fixed inset-0',
      )}
    >
      <div className={classNames('row-start-1 col-start-1 col-span-3')}>
        <div
          className={classNames(
            'grid grid-cols-[1fr,auto,1fr]',
            'p-2',
            'bg-brand-900',
            'text-white',
          )}
        >
          <div className={classNames('col-start-1', 'flex items-center')}>
            <AppLogo />
            <DatabaseMenu />
          </div>

          <div className="col-start-2">
            <AppTabs />
          </div>

          <div
            className={classNames(
              'col-start-3 justify-self-end',
              'flex items-center',
            )}
          >
            {isFileOpen ? <HeaderSearch /> : null}
          </div>
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
          'col-end-3',
        )}
      >
        {children}
      </div>
    </div>
  )
}
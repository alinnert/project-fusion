import classNames from 'classnames'
import React, { FC, PropsWithChildren, ReactNode, useMemo } from 'react'
import { AppLogo } from '../../components/app/AppLogo'
import { AppTabs } from '../../components/app/AppTabs'
import { HeaderSearch } from '../../components/ui/header/HeaderSearch'
import { useAppSelector } from '../../redux'
import { selectIsFileOpen } from '../../redux/database'
import { mapBooleanToString } from '../../utils/map'
import { Header } from '../ui/header/Header'
import { LeftPanel } from '../ui/LeftPanel'
import { CurrentFile } from './CurrentFile'

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
        <Header
          left={
            <>
              <AppLogo />
              <CurrentFile />
            </>
          }
          center={<AppTabs />}
          right={isFileOpen ? <HeaderSearch /> : null}
        />
      </div>

      {showLeftPanel ? <LeftPanel>{left}</LeftPanel> : null}

      <div
        className={classNames(
          'row-start-2 overflow-hidden',
          mapBooleanToString(showLeftPanel, 'col-start-2', 'col-start-1'),
          'col-end-3',
        )}
      >
        {children}
      </div>
    </div>
  )
}

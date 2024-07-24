import React, { FC, PropsWithChildren } from 'react'

export const LeftPanel: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="col-start-1 row-start-2 overflow-hidden bg-neutral-100">
      {children}
    </div>
  )
}

import React, { FC, PropsWithChildren, ReactNode } from 'react'
import { Headline } from './Headline'

type Props = {
  title?: ReactNode
}

export const ContentSection: FC<PropsWithChildren<Props>> = ({
  children,
  title,
}) => {
  return (
    <div className="my-12">
      {title !== undefined ? <Headline>{title}</Headline> : null}
      <div>{children}</div>
    </div>
  )
}

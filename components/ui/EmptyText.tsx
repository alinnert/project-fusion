import { FC, PropsWithChildren } from 'react'

interface Props {}

export const EmptyText: FC<PropsWithChildren<Props>> = ({ children }) => {
  return (
    <div className="h-full grid items-center justify-center p-16">
      <div className="text-xl text-neutral-700 text-center">{children}</div>
    </div>
  )
}

import classNames from 'classnames'
import { FC, PropsWithChildren } from 'react'

interface Props {}

export const Headline: FC<PropsWithChildren<Props>> = ({ children }) => {
  return (
    <div
      className={classNames(
        'grid grid-cols-[auto,1fr] items-center gap-x-2',
        'mt-12 mb-6',
      )}
    >
      <div className="text-lg text-brand-800 font-semibold">{children}</div>
      <div className="bg-neutral-300 h-px"></div>
    </div>
  )
}

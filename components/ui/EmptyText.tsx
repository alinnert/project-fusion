import { FC, PropsWithChildren, ReactElement } from 'react'
import { Heroicon } from './Heroicon'

interface Props {
  title?: string
  icon?: ReactElement
}

export const EmptyText: FC<PropsWithChildren<Props>> = ({
  children,
  title,
  icon,
}) => {
  return (
    <div className="h-full grid items-center justify-center p-16">
      <div className="text-center">
        {icon !== undefined ? (
          <div className="flex justify-center text-brand-200 mb-8">
            <Heroicon icon={icon} scale={4} />
          </div>
        ) : null}

        {title !== undefined ? (
          <div className="text-2xl font-semibold mb-4 text-neutral-700">
            {title}
          </div>
        ) : null}

        <div className="text-xl text-neutral-600">{children}</div>
      </div>
    </div>
  )
}

import classNames from 'classnames'
import { FC, PropsWithChildren, ReactElement } from 'react'
import { Heroicon } from './Heroicon'

interface Props {
  title?: string
  titleIcon?: ReactElement
  titleIconColor?: string
}

export const PageContent: FC<PropsWithChildren<Props>> = ({
  children,
  title,
  titleIcon,
  titleIconColor,
}) => {
  return (
    <div className="p-4 w-full h-full overflow-y-auto">
      <div className="font-semibold text-3xl mb-6 flex items-center">
        {titleIcon !== undefined ? (
          <div className={classNames('flex-0 mr-4')}>
            <Heroicon icon={titleIcon} color={titleIconColor} scale={2} />
          </div>
        ) : null}
        <div className="flex-1">{title}</div>
      </div>
      <div>{children}</div>
    </div>
  )
}

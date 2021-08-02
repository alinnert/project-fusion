import classNames from 'classnames'
import { FC, PropsWithChildren, ReactElement } from 'react'
import { matchBoolToString } from '../../utils/match'
import { Heroicon } from './Heroicon'

interface Props {
  title?: string
  titleIcon?: ReactElement
  titleIconColor?: string
  centered?: boolean
}

export const PageContent: FC<PropsWithChildren<Props>> = ({
  children,
  title,
  titleIcon,
  titleIconColor,
  centered = false,
}) => {
  return (
    <div
      className={classNames(
        matchBoolToString(
          centered,
          'w-[600px] max-w-full mx-auto py-8',
          'w-full py-4',
        ),
        'px-4 h-full overflow-y-auto',
      )}
    >
      <div className="text-2xl font-semibold mb-4 flex items-center">
        {titleIcon !== undefined ? (
          <div className={classNames('flex-0 mr-2')}>
            <Heroicon icon={titleIcon} color={titleIconColor} scale={1.5} />
          </div>
        ) : null}
        <div className="flex-1 select-text">{title}</div>
      </div>
      <div>{children}</div>
    </div>
  )
}

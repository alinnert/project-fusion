import classNames from 'classnames'
import { FC, PropsWithChildren, ReactElement } from 'react'
import { matchBoolToString } from '../../utils/match'
import { Heroicon } from './Heroicon'

interface Props {
  title?: string
  titleIcon?: ReactElement
  titleIconColor?: string
  titleIconType?: 'solid' | 'outline'
  centered?: boolean
}

export const PageContent: FC<PropsWithChildren<Props>> = ({
  children,
  title,
  titleIcon,
  titleIconColor,
  titleIconType = 'solid',
  centered = false,
}) => {
  return (
    <div className="px-4 h-full overflow-y-auto">
      <div
        className={classNames(
          matchBoolToString(
            centered,
            'w-[600px] max-w-full mx-auto py-8',
            'w-full py-4',
          ),
        )}
      >
        {title !== undefined ? (
          <div className="text-2xl font-semibold mb-4 flex items-center">
            {titleIcon !== undefined ? (
              <div className={classNames('flex-0 mr-2')}>
                <Heroicon
                  icon={titleIcon}
                  color={titleIconColor}
                  scale={1.5}
                  iconType={titleIconType}
                />
              </div>
            ) : null}

            <div className="flex-1 select-text">{title}</div>
          </div>
        ) : null}

        {children}
      </div>
    </div>
  )
}

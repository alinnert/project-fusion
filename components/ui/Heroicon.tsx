import classNames from 'classnames'
import { Children, cloneElement, FC, isValidElement, ReactElement } from 'react'
import { defaultMatch, matchString } from '../../tools/match'

interface Props {
  icon: ReactElement<{ className: string }>
  color?: string
  scale?: 1 | 2 | 3 | 4
}

export const Heroicon: FC<Props> = ({ icon, color, scale = 1 }) => {
  return (
    <div style={{ color }}>
      {Children.map(icon, (child) => {
        if (!isValidElement(child)) return null
        return cloneElement(child, {
          className: classNames(
            child.props.className,
            matchString(scale, {
              1: 'w-5 h-5',
              2: 'w-10 h-10',
              3: 'w-16 h-16',
              4: 'w-24 h-24',
              [defaultMatch]: 'w-5 h-5'
            }),
          ),
        })
      })}
    </div>
  )
}

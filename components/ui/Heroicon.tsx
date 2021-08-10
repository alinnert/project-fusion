import classNames from 'classnames'
import { Children, cloneElement, FC, isValidElement, ReactElement } from 'react'
import { matchUnionToString } from '../../utils/match'

interface Props {
  icon: ReactElement<{ className: string }>
  color?: string
  scale?: 1 | 1.5 | 2 | 4
  iconType?: 'solid' | 'outline'
}

export const Heroicon: FC<Props> = ({
  icon,
  color,
  scale = 1,
  iconType = 'solid',
}) => {
  return (
    <div style={{ color }}>
      {Children.map(icon, (child) => {
        if (!isValidElement(child)) return null
        return cloneElement(child, {
          className: classNames(
            child.props.className,
            matchUnionToString(scale, {
              1: matchUnionToString(iconType, {
                solid: 'w-[20px] h-[20px]',
                outline: 'w-[24px] h-[24px]',
              }),
              1.5: matchUnionToString(iconType, {
                solid: 'w-[30px] h-[30px]',
                outline: 'w-[36px] h-[36px]',
              }),
              2: matchUnionToString(iconType, {
                solid: 'w-[40px] h-[40px]',
                outline: 'w-[48px] h-[48px]',
              }),
              4: matchUnionToString(iconType, {
                solid: 'w-[80px] h-[80px]',
                outline: 'w-[96px] h-[96px]',
              }),
            }),
          ),
        })
      })}
    </div>
  )
}

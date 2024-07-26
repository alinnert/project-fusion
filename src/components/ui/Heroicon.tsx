import classNames from 'classnames'
import React, {
  Children,
  cloneElement,
  FC,
  isValidElement,
  ReactElement,
} from 'react'
import { mapUnionToString } from '../../utils/map'

type Props = {
  icon: ReactElement<{ className: string }>
  color?: string
  scale?: 1 | 1.5 | 2 | 4
  iconType?: 'big' | 'mini' | 'micro'
  className?: string
}

export const Heroicon: FC<Props> = ({
  icon,
  color,
  scale = 1,
  iconType = 'big',
  className,
}) => {
  return (
    <div className={className} style={{ color }}>
      {Children.map(icon, (child) => {
        if (!isValidElement(child)) return null
        return cloneElement(child, {
          className: classNames(
            child.props.className,
            mapUnionToString(scale, {
              1: mapUnionToString(iconType, {
                micro: 'w-[16px] h-[16px]',
                mini: 'w-[20px] h-[20px]',
                big: 'w-[24px] h-[24px]',
              }),
              1.5: mapUnionToString(iconType, {
                micro: 'w-[24px] h-[24px]',
                mini: 'w-[30px] h-[30px]',
                big: 'w-[36px] h-[36px]',
              }),
              2: mapUnionToString(iconType, {
                micro: 'w-[32px] h-[32px]',
                mini: 'w-[40px] h-[40px]',
                big: 'w-[48px] h-[48px]',
              }),
              4: mapUnionToString(iconType, {
                micro: 'w-[64px] h-[64px]',
                mini: 'w-[80px] h-[80px]',
                big: 'w-[96px] h-[96px]',
              }),
            }),
          ),
        })
      })}
    </div>
  )
}

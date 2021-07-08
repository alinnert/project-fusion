import {
  Children,
  cloneElement,
  FC,
  isValidElement,
  PropsWithChildren,
  ReactElement,
} from 'react'
import { match } from '../../tools/match'

interface Props {
  icon: ReactElement<{ className: string }>
  scale?: 1 | 2 | 3 | 4
}

export const Heroicon: FC<Props> = ({ icon, scale = 1 }) => {
  return (
    <>
      {Children.map(icon, (child) => {
        if (!isValidElement(child)) return null
        return cloneElement(child, {
          className: `${child.props.className} ${match(scale, {
            1: 'w-5 h-5',
            2: 'w-10 h-10',
            3: 'w-16 h-16',
            4: 'w-24 h-24',
          })}`,
        })
      })}
    </>
  )
}

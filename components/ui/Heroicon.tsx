import {
  Children,
  cloneElement,
  FC,
  isValidElement,
  PropsWithChildren,
  ReactElement,
} from 'react'

interface Props {
  icon: ReactElement<{ className: string }>
}

export const Heroicon: FC<Props> = ({ icon }) => {
  return (
    <>
      {Children.map(icon, (child) => {
        if (!isValidElement(child)) return null
        return cloneElement(child, {
          className: `${child.props.className} w-5 h-5`,
        })
      })}
    </>
  )
}

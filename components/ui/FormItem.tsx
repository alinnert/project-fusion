import classNames from 'classnames'
import { FC, PropsWithChildren } from 'react'

interface Props {
  label?: string
  className?: string
}

export const FormItem: FC<PropsWithChildren<Props>> = ({
  label,
  className,
  children,
}) => {
  return (
    <div className={classNames('flex flex-col', className)}>
      {label !== undefined ? (
        <span className="font-semibold text-sm mb-1">{label}</span>
      ) : null}

      {children}
    </div>
  )
}

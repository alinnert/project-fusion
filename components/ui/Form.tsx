import classNames from 'classnames'
import { FC, FormHTMLAttributes } from 'react'

interface Props extends FormHTMLAttributes<HTMLFormElement> {}

export const Form: FC<Props> = ({ children, className, ...formProps }) => {
  return (
    <form
      {...formProps}
      className={classNames(className, 'flex flex-col gap-y-6 w-[600px]')}
    >
      {children}
    </form>
  )
}

import classNames from 'classnames'
import React from 'react'
import { FC, FormEvent, FormHTMLAttributes } from 'react'
import { matchUnionToString } from '../../utils/match'

export type FormType = 'unstyled' | 'page' | 'inline'

interface Props {
  className?: string
  type?: FormType
  formProps?: Omit<
    FormHTMLAttributes<HTMLFormElement>,
    'className' | 'onSubmit'
  >
  onSubmit?: (event: FormEvent) => void
}

export const Form: FC<Props> = ({
  children,
  className,
  type = 'unstyled',
  formProps,
  onSubmit,
}) => {
  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    onSubmit?.(event)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={classNames(
        matchUnionToString(type, {
          unstyled: '',
          inline: 'flex items-center gap-x-2',
          page: 'flex flex-col gap-y-6 w-[600px] max-w-full',
        }),
        className,
      )}
      {...formProps}
    >
      {children}
    </form>
  )
}

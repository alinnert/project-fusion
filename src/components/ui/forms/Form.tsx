import classNames from 'classnames'
import React, {
  FC,
  FormEvent,
  FormHTMLAttributes,
  KeyboardEvent,
  PropsWithChildren,
} from 'react'
import { ctrlOrCmd } from '../../../utils/keyboard'
import { mapUnionToString } from '../../../utils/map'

export type FormType = 'unstyled' | 'page' | 'inline'

interface Props {
  className?: string
  type?: FormType
  formProps?: Omit<
    FormHTMLAttributes<HTMLFormElement>,
    'className' | 'onSubmit'
  >
  submitOnCtrlEnter?: boolean
  onSubmit?: (
    event: FormEvent<HTMLFormElement> | KeyboardEvent<HTMLFormElement>,
  ) => void
}

export const Form: FC<PropsWithChildren<Props>> = ({
  children,
  className,
  type = 'unstyled',
  formProps,
  submitOnCtrlEnter = false,
  onSubmit,
}) => {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onSubmit?.(event)
  }

  function handleKeyDown(event: KeyboardEvent<HTMLFormElement>): void {
    if (ctrlOrCmd(event) && event.key === 'Enter') {
      if (!submitOnCtrlEnter) return
      onSubmit?.(event)
    }
  }

  return (
    <form
      className={classNames(
        mapUnionToString(type, {
          unstyled: '',
          inline: 'flex items-center gap-x-2',
          page: 'flex w-[600px] max-w-full flex-col gap-y-6',
        }),
        className,
      )}
      onSubmit={handleSubmit}
      onKeyDown={handleKeyDown}
      {...formProps}
    >
      {children}
    </form>
  )
}

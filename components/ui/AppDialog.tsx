import { Dialog } from '@headlessui/react'
import classNames from 'classnames'
import React, { FC, ReactNode } from 'react'

interface Props {
  title: string
  footer?: ReactNode
  open: boolean
  onClose: () => void
}

export const AppDialog: FC<Props> = ({
  title,
  footer,
  open,
  onClose,
  children,
}) => {
  return (
    <Dialog
      className={classNames(
        'fixed inset-0 z-50',
        'flex flex-col items-center justify-center',
      )}
      open={open}
      onClose={onClose}
    >
      <Dialog.Overlay
        className={classNames(
          'fixed inset-0 z-40',
          'bg-white/80',
          'backdrop-blur',
        )}
      />

      <div
        className={classNames(
          'relative z-50',
          'grid grid-cols-1 grid-rows-[auto,auto]',
          'min-w-[400px]',
          'border border-neutral-200',
          'bg-white rounded-lg shadow-2xl',
        )}
      >
        <div className="p-4">
          <Dialog.Title className="mb-4 text-lg font-semibold">
            {title}
          </Dialog.Title>

          {children}
        </div>

        {footer !== undefined ? (
          <div
            className={classNames(
              'flex justify-end gap-x-2',
              'p-4 rounded-b-lg',
              'bg-neutral-100',
              'border-t border-neutral-200',
            )}
          >
            {footer}
          </div>
        ) : null}
      </div>
    </Dialog>
  )
}

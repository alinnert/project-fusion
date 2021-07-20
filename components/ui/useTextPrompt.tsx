import { Dialog } from '@headlessui/react'
import classNames from 'classnames'
import React, { ReactElement, useCallback, useMemo, useState } from 'react'
import { Button } from './Button'
import { Input } from './Input'

interface OpenDialogOptions {
  title: string
  inputLabel: string
  primaryButtonLabel?: string
  value: string
}

interface Options {
  primaryButtonLabel?: string
  onConfirm: (value: string) => void
}

interface Result {
  dialog: ReactElement
  openDialog: (options: OpenDialogOptions) => void
}

const primaryButtonDefaultLabel = 'OK'

export function useTextPrompt({ onConfirm }: Options): Result {
  const [title, setTitle] = useState('')
  const [inputLabel, setInputLabel] = useState('')
  const [primaryButtonLabel, setPrimaryButtonLabel] = useState(
    primaryButtonDefaultLabel,
  )
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [value, setValue] = useState('')

  function openDialog({
    title,
    inputLabel,
    value,
    primaryButtonLabel,
  }: OpenDialogOptions): void {
    setTitle(title)
    setInputLabel(inputLabel)
    setValue(value)
    setPrimaryButtonLabel(primaryButtonLabel ?? primaryButtonDefaultLabel)
    setIsModalOpen(true)
  }

  function handleClose() {
    setIsModalOpen(false)
    setValue('')
  }

  const handleConfirm = useCallback(() => {
    onConfirm(value)
    setIsModalOpen(false)
  }, [onConfirm, value])

  const dialog = useMemo(() => {
    return (
      <Dialog
        className={classNames(
          'fixed inset-0 z-50',
          'flex flex-col items-center justify-center',
        )}
        open={isModalOpen}
        onClose={handleClose}
      >
        <Dialog.Overlay
          className={classNames(
            'fixed inset-0 z-40',
            'bg-white/80',
            'backdrop-blur-sm',
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
            <Dialog.Title
              className={classNames('mb-4', 'text-lg font-semibold')}
            >
              {title}
            </Dialog.Title>

            <div>
              <Input value={value} label={inputLabel} onChange={setValue} />
            </div>
          </div>

          <div
            className={classNames(
              'flex justify-end gap-x-2',
              'p-4 rounded-b-lg',
              'bg-neutral-100',
              'border-t border-neutral-200',
            )}
          >
            <Button buttonType="primary" onClick={handleConfirm}>
              {primaryButtonLabel}
            </Button>
            <Button onClick={handleClose}>Abbrechen</Button>
          </div>
        </div>
      </Dialog>
    )
  }, [handleConfirm, inputLabel, isModalOpen, primaryButtonLabel, title, value])

  return { dialog, openDialog }
}

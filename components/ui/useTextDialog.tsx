import React, { ReactElement, useCallback, useMemo, useState } from 'react'
import { AppDialog } from './AppDialog'
import { Button } from './Button'
import { Input } from './Input'

interface OpenDialogOptions {
  title: string
  inputLabel: string
  primaryButtonLabel?: string
  value: string
}

interface Options {
  onConfirm: (value: string) => void
}

interface Result {
  dialog: ReactElement
  openDialog: (options: OpenDialogOptions) => void
}

const primaryButtonDefaultLabel = 'OK'

export function useTextDialog({ onConfirm }: Options): Result {
  const [title, setTitle] = useState('')
  const [inputLabel, setInputLabel] = useState('')
  const [primaryButtonLabel, setPrimaryButtonLabel] = useState(
    primaryButtonDefaultLabel,
  )
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [value, setValue] = useState('')

  function openDialog(options: OpenDialogOptions): void {
    setTitle(options.title)
    setInputLabel(options.inputLabel)
    setValue(options.value)
    setPrimaryButtonLabel(
      options.primaryButtonLabel ?? primaryButtonDefaultLabel,
    )
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
      <AppDialog
        title={title}
        open={isModalOpen}
        onClose={handleClose}
        footer={
          <>
            <Button buttonType="primary" onClick={handleConfirm}>
              {primaryButtonLabel}
            </Button>
            <Button onClick={handleClose}>Abbrechen</Button>
          </>
        }
      >
        <Input value={value} label={inputLabel} onChange={setValue} />
      </AppDialog>
    )
  }, [handleConfirm, inputLabel, isModalOpen, primaryButtonLabel, title, value])

  return { dialog, openDialog }
}

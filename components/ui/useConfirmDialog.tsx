import { useTranslation } from 'next-i18next'
import React, { ReactElement, useCallback, useMemo, useState } from 'react'
import { AppDialog } from './AppDialog'
import { Button, ButtonType } from './Button'

interface OpenDialogOptions {
  title: string
  message: string
  confirmButtonLabel?: string
  confirmButtonType?: ButtonType
  cancelButtonLabel?: string
}

interface Options {
  onConfirm: () => void
  onCancel?: () => void
}

interface Result {
  dialog: ReactElement
  openDialog: (options: OpenDialogOptions) => void
}

const confirmButtonDefaultType: ButtonType = 'primary'

export function useConfirmDialog({ onConfirm, onCancel }: Options): Result {
  const { t } = useTranslation()
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')
  const [confirmButtonLabel, setConfirmButtonLabel] = useState('')
  const [confirmButtonType, setConfirmButtonType] = useState<ButtonType>(
    confirmButtonDefaultType,
  )
  const [cancelButtonLabel, setCancelButtonLabel] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)

  function openDialog(options: OpenDialogOptions): void {
    setTitle(options.title)
    setMessage(options.message)
    setConfirmButtonLabel(options.confirmButtonLabel ?? t('buttons.ok'))
    setConfirmButtonType(options.confirmButtonType ?? confirmButtonDefaultType)
    setCancelButtonLabel(options.cancelButtonLabel ?? t('buttons.cancel'))
    setIsModalOpen(true)
  }

  const handleConfirm = useCallback(() => {
    onConfirm()
  }, [onConfirm])

  const handleClose = useCallback(() => {
    setIsModalOpen(false)
    onCancel?.()
  }, [onCancel])

  const dialog = useMemo(() => {
    return (
      <AppDialog
        title={title}
        open={isModalOpen}
        onClose={handleClose}
        footer={
          <>
            <Button onClick={handleConfirm} buttonType={confirmButtonType}>
              {confirmButtonLabel}
            </Button>
            <Button onClick={handleClose}>{cancelButtonLabel}</Button>
          </>
        }
      >
        {message}
      </AppDialog>
    )
  }, [
    cancelButtonLabel,
    confirmButtonLabel,
    confirmButtonType,
    handleClose,
    handleConfirm,
    isModalOpen,
    message,
    title,
  ])

  return { dialog, openDialog }
}

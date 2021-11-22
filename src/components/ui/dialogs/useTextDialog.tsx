import React, { ReactElement, useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { translationNamespaces } from '../../../utils/i18next-namespaces'
import { Button } from '../forms/Button'
import { Input } from '../forms/Input'
import { AppDialog } from './AppDialog'

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
  const { t } = useTranslation(translationNamespaces)
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
            <Button type="primary" onClick={handleConfirm} size="big">
              {primaryButtonLabel}
            </Button>
            <Button onClick={handleClose} size="big">
              {t('common:buttons.cancel')}
            </Button>
          </>
        }
      >
        <Input value={value} label={inputLabel} onChange={setValue} />
      </AppDialog>
    )
  }, [
    handleConfirm,
    inputLabel,
    isModalOpen,
    primaryButtonLabel,
    t,
    title,
    value,
  ])

  return { dialog, openDialog }
}

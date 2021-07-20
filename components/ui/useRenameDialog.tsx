import { Dialog } from '@headlessui/react'
import classNames from 'classnames'
import React, { ReactElement, useCallback, useMemo, useState } from 'react'
import { Button } from './Button'
import { Input } from './Input'

interface UseRenameDialogOptions {
  onRename: (value: string) => void
}

interface UseRenameDialogResult {
  renameDialog: ReactElement
  openRenameDialog: (value: string) => void
}

export function useRenameDialog({
  onRename,
}: UseRenameDialogOptions): UseRenameDialogResult {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [originalValue, setOriginalValue] = useState('')
  const [value, setValue] = useState(originalValue)

  function openRenameDialog(value: string): void {
    setOriginalValue(value)
    setValue(value)
    setIsModalOpen(true)
  }

  function handleClose() {
    setIsModalOpen(false)
    setOriginalValue('')
    setValue('')
  }

  const handleRename = useCallback(() => {
    onRename(value)
    setIsModalOpen(false)
  }, [onRename, value])

  const renameDialog = useMemo(() => {
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
          className={classNames('fixed inset-0 z-40', 'bg-black/50')}
        />

        <div
          className={classNames(
            'relative z-50',
            'grid grid-cols-1 grid-rows-[auto,auto]',
            'min-w-[400px]',
            'bg-white rounded-lg shadow-2xl',
          )}
        >
          <div className="p-4">
            <Dialog.Title
              className={classNames('mb-4', 'text-lg font-semibold')}
            >
              &quot;{originalValue}&quot; umbenennen in:
            </Dialog.Title>

            <div>
              <Input value={value} onChange={setValue} />
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
            <Button buttonType="primary" onClick={handleRename}>
              Umbenennen
            </Button>
            <Button onClick={handleClose}>Abbrechen</Button>
          </div>
        </div>
      </Dialog>
    )
  }, [handleRename, isModalOpen, originalValue, value])

  return { renameDialog, openRenameDialog }
}

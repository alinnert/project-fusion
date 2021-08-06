import {
  DatabaseIcon,
  DocumentAddIcon,
  FolderIcon,
  TrashIcon,
  XIcon,
} from '@heroicons/react/solid'
import { useTranslation } from 'next-i18next'
import React, { FC, useEffect, useMemo, useState } from 'react'
import { useAppSelector } from '../../redux'
import { selectIsFileOpen } from '../../redux/database'
import { closeDatabaseFile } from '../../redux/database/closeDatabaseFile'
import { createDatabaseFile } from '../../redux/database/createDatabaseFile'
import { openDatabaseFile } from '../../redux/database/openDatabaseFile'
import { openDatabaseFielWithHandle } from '../../redux/database/openDatabaseFileWithHandle'
import {
  clearRecentFiles,
  getRecentFiles,
} from '../../redux/database/recentFilesStorage'
import { tailwindConfig, useBreakpoint } from '../../utils/tailwindConfig'
import { asyncTry } from '../../utils/tryCatch'
import { DropdownMenu, DropdownMenuItem } from '../ui/DropdownMenu'
import { DropdownMenuItemButton } from '../ui/DropdownMenuButton'

interface Props {}

export const FileControls: FC<Props> = ({}) => {
  const { t } = useTranslation()
  const isXlScreen = useBreakpoint(tailwindConfig.theme.screens?.xl)
  const filename = useAppSelector((state) => state.database.filename)
  const isFileOpen = useAppSelector(selectIsFileOpen)

  const [recentFiles, setRecentFiles] = useState<FileSystemFileHandle[]>([])

  useEffect(() => {
    async function run() {
      const files = await asyncTry(() => getRecentFiles())
      setRecentFiles(files.caught ? [] : files.value)
    }
    run()
  }, [])

  const recentFilesMenuItems = useMemo<DropdownMenuItem[]>(
    () =>
      recentFiles.map<DropdownMenuItem>((fileHandle) => ({
        type: 'button',
        label: fileHandle.name,
        action: () => openDatabaseFielWithHandle(fileHandle),
        icon: <DatabaseIcon />,
      })),
    [recentFiles],
  )

  const menuItems = useMemo(() => {
    const createItem: DropdownMenuItemButton = {
      type: 'button',
      label: t('header.menu.database.items.create'),
      icon: <DocumentAddIcon />,
      action: createDatabaseFile,
    }

    const openItem: DropdownMenuItemButton = {
      type: 'button',
      label: t('header.menu.database.items.open'),
      icon: <FolderIcon className="h-5 w-5" />,
      action: openDatabaseFile,
    }

    const closeItem: DropdownMenuItemButton = {
      type: 'button',
      label: t('header.menu.database.items.close'),
      icon: <XIcon />,
      action: closeDatabaseFile,
    }

    const clearRecentFilesItem: DropdownMenuItemButton = {
      type: 'button',
      label: t('header.menu.database.items.clearRecent'),
      icon: <TrashIcon />,
      buttonType: 'delete',
      action: clearRecentFiles,
    }

    const recentFilesItemsBatch: DropdownMenuItem[] =
      recentFilesMenuItems.length > 0
        ? [
            { type: 'separator' },
            ...recentFilesMenuItems,
            { type: 'separator' },
            clearRecentFilesItem,
          ]
        : []

    if (isFileOpen) {
      return [createItem, openItem, closeItem, ...recentFilesItemsBatch]
    }

    return [createItem, openItem, ...recentFilesItemsBatch]
  }, [isFileOpen, recentFilesMenuItems, t])

  if (!isFileOpen) {
    return (
      <DropdownMenu
        icon={<DatabaseIcon />}
        items={menuItems}
        buttonType="header"
      >
        {t('header.menu.database.label')}
      </DropdownMenu>
    )
  }

  return (
    <DropdownMenu
      icon={<DatabaseIcon />}
      items={menuItems}
      buttonType="header"
      secondaryLabel={filename ?? undefined}
    >
      {isXlScreen || !isFileOpen ? t('header.menu.database.label') : null}
    </DropdownMenu>
  )
}

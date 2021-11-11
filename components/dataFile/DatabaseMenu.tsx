import {
  DatabaseIcon,
  DocumentAddIcon,
  FolderIcon,
  TrashIcon,
  XIcon
} from '@heroicons/react/solid'
import React, { FC, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useAppSelector } from '../../redux'
import { selectIsFileOpen } from '../../redux/database'
import { clearRecentFiles } from '../../redux/database/recentFilesStorage'
import { selectRecentFiles } from '../../redux/recentFiles'
import { translationNamespaces } from '../../utils/i18next-namespaces'
import { tailwindConfig, useBreakpoint } from '../../utils/tailwindConfig'
import { DropdownMenu, DropdownMenuItem } from '../ui/DropdownMenu'
import { DropdownMenuItemButton } from '../ui/DropdownMenuButton'
import { useCloseDatabase } from './useCloseDatabase'
import { useCreateDatabase } from './useCreateDatabase'
import { useOpenDatabase } from './useOpenDatabase'
import { useOpenDatabaseWithFileHandle } from './useOpenDatabaseWithFilehandle'

interface Props {}

export const DatabaseMenu: FC<Props> = ({}) => {
  const { t } = useTranslation(translationNamespaces)

  const isXlScreen = useBreakpoint(tailwindConfig.theme.screens?.xl)
  const filename = useAppSelector((state) => state.database.filename)
  const isFileOpen = useAppSelector(selectIsFileOpen)
  const recentFiles = useAppSelector(selectRecentFiles)

  const createDatabase = useCreateDatabase()
  const openDatabase = useOpenDatabase()
  const openDatabaseWithFileHandle = useOpenDatabaseWithFileHandle()
  const closeDatabase = useCloseDatabase()

  const recentFilesMenuItems = useMemo<DropdownMenuItem[]>(
    () =>
      recentFiles.map<DropdownMenuItem>(({ fileHandle }) => ({
        type: 'button',
        label: fileHandle.name,
        action: () => openDatabaseWithFileHandle(fileHandle),
        icon: <DatabaseIcon />,
      })),
    [openDatabaseWithFileHandle, recentFiles],
  )

  const menuItems = useMemo(() => {
    const createItem: DropdownMenuItemButton = {
      type: 'button',
      label: t('header.menu.database.items.create'),
      icon: <DocumentAddIcon />,
      action: createDatabase,
    }

    const openItem: DropdownMenuItemButton = {
      type: 'button',
      label: t('header.menu.database.items.open'),
      icon: <FolderIcon className="h-5 w-5" />,
      action: openDatabase,
    }

    const closeItem: DropdownMenuItemButton = {
      type: 'button',
      label: t('header.menu.database.items.close'),
      icon: <XIcon />,
      action: closeDatabase,
    }

    const clearRecentFilesItem: DropdownMenuItemButton = {
      type: 'button',
      label: t('header.menu.database.items.clearRecent'),
      icon: <TrashIcon />,
      buttonType: 'delete',
      action: clearRecentFiles,
    }

    const recentFilesItemsBatch: DropdownMenuItem[] = []
    // const recentFilesItemsBatch: DropdownMenuItem[] =
    //   recentFilesMenuItems.length > 0
    //     ? [
    //         { type: 'separator' },
    //         ...recentFilesMenuItems,
    //         { type: 'separator' },
    //         clearRecentFilesItem,
    //       ]
    //     : []

    if (isFileOpen) {
      return [createItem, openItem, closeItem, ...recentFilesItemsBatch]
    }

    return [createItem, openItem, ...recentFilesItemsBatch]
  }, [closeDatabase, createDatabase, isFileOpen, openDatabase, t])

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

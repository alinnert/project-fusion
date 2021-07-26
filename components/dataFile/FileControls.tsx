import {
  DatabaseIcon,
  DocumentAddIcon,
  FolderIcon,
  XIcon,
} from '@heroicons/react/solid'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import React, { FC, useMemo } from 'react'
import { useAppSelector } from '../../redux'
import { selectIsFileOpen } from '../../redux/database'
import { closeDatabaseFile } from '../../redux/database/closeDatabaseFile'
import { createDatabaseFile } from '../../redux/database/createDatabaseFile'
import { openDatabaseFile } from '../../redux/database/openDatabaseFile'
import { DropdownMenu, MenuItem } from '../ui/DropdownMenu'

interface Props {}

export const FileControls: FC<Props> = ({}) => {
  const { t } = useTranslation()
  const router = useRouter()
  const filename = useAppSelector((state) => state.database.filename)
  const isFileOpen = useAppSelector(selectIsFileOpen)

  const menuItems = useMemo(() => {
    const createItem: MenuItem = {
      label: t('header.menu.database.items.create'),
      icon: <DocumentAddIcon />,
      action() {
        createDatabaseFile()
        router.push('/')
      },
    }

    const openItem: MenuItem = {
      label: t('header.menu.database.items.open'),
      icon: <FolderIcon className="h-5 w-5" />,
      action() {
        openDatabaseFile()
        router.push('/')
      },
    }

    const closeItem: MenuItem = {
      label: t('header.menu.database.items.close'),
      action() {
        closeDatabaseFile()
        router.push('/')
      },
      icon: <XIcon />,
    }

    if (isFileOpen) {
      return [createItem, openItem, closeItem]
    }

    return [createItem, openItem]
  }, [isFileOpen, router, t])

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
    <DropdownMenu icon={<DatabaseIcon />} items={menuItems} buttonType="header">
      {t('header.menu.database.label')}:{' '}
      <span className="text-white">{filename}</span>
    </DropdownMenu>
  )
}

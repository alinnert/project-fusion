import {
  DatabaseIcon,
  DocumentAddIcon,
  FolderIcon,
  XIcon,
} from '@heroicons/react/solid'
import { useRouter } from 'next/router'
import React, { FC, useMemo } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux'
import { closeDatabase, selectIsFileOpen } from '../../redux/database'
import { createDatabase } from '../../redux/database/createDatabase'
import { openDatabase } from '../../redux/database/openDatabase'
import { DropdownMenu, MenuItem } from '../ui/DropdownMenu'

interface Props {}

export const FileControls: FC<Props> = ({}) => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const filename = useAppSelector((state) => state.database.filename)
  const isFileOpen = useAppSelector(selectIsFileOpen)

  const menuItems = useMemo(() => {
    const createItem: MenuItem = {
      label: 'Erstellen',
      icon: <DocumentAddIcon />,
      action() {
        createDatabase()
        router.push('/')
      },
    }

    const openItem: MenuItem = {
      label: 'Öffnen',
      icon: <FolderIcon className="h-5 w-5" />,
      action() {
        openDatabase()
        router.push('/')
      },
    }

    const closeItem: MenuItem = {
      label: 'Schließen',
      action() {
        dispatch(closeDatabase())
        router.push('/')
      },
      icon: <XIcon />,
    }

    if (isFileOpen) {
      return [createItem, openItem, closeItem]
    }

    return [createItem, openItem]
  }, [dispatch, isFileOpen, router])

  if (!isFileOpen) {
    return (
      <DropdownMenu
        icon={<DatabaseIcon />}
        items={menuItems}
        buttonType="header"
      >
        Datenbank
      </DropdownMenu>
    )
  }

  return (
    <DropdownMenu icon={<DatabaseIcon />} items={menuItems} buttonType="header">
      {filename}
    </DropdownMenu>
  )
}

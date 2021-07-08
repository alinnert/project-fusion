import {
  DatabaseIcon,
  DocumentAddIcon, FolderIcon,
  XIcon
} from '@heroicons/react/solid'
import { useRouter } from 'next/router'
import React, { FC, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { AppState, useAppDispatch } from '../../redux'
import { closeFile } from '../../redux/dataFile'
import { createFile } from '../../redux/dataFile/createFileThunk'
import { openFile } from '../../redux/dataFile/openFileThunk'
import { DropdownMenu, MenuItem } from '../ui/DropdownMenu'

interface Props {}

export const FileControls: FC<Props> = ({}) => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const fileName = useSelector((state: AppState) => state.dataFile.fileName)

  const menuItems = useMemo(() => {
    const mainMenuItems: Array<MenuItem> = [
      {
        label: 'Erstellen',
        icon: <DocumentAddIcon />,
        action() {
          dispatch(createFile())
          router.push('/')
        },
      },
      {
        label: 'Öffnen',
        icon: <FolderIcon className="h-5 w-5" />,
        action() {
          dispatch(openFile())
          router.push('/')
        },
      },
    ]

    const closeMenuItem: MenuItem = {
      label: 'Schließen',
      action() {
        dispatch(closeFile())
        router.push('/')
      },
      icon: <XIcon />,
    }

    return [...mainMenuItems, ...(fileName !== null ? [closeMenuItem] : [])]
  }, [dispatch, fileName, router])

  if (fileName === null) {
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
      {fileName}
    </DropdownMenu>
  )
}

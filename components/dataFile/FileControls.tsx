import {
  DocumentIcon,
  FolderIcon,
  PlusIcon,
  XIcon,
} from '@heroicons/react/solid'
import { useRouter } from 'next/router'
import React, { FC, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { AppState, useAppDispatch } from '../../redux'
import { closeFile } from '../../redux/dataFile'
import { createFile } from '../../redux/dataFile/createFileThunk'
import { openFile } from '../../redux/dataFile/openFileThunk'
import { HeaderMenu, MenuItem } from '../ui/HeaderMenu'

interface Props {}

export const FileControls: FC<Props> = ({}) => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const fileName = useSelector((state: AppState) => state.dataFile.fileName)

  const menuItems = useMemo(() => {
    const mainMenuItems: Array<MenuItem> = [
      {
        label: 'Erstellen',
        icon: <PlusIcon />,
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
      <HeaderMenu label="Datei" icon={<DocumentIcon />} items={menuItems} />
    )
  }

  return (
    <HeaderMenu
      label={fileName}
      icon={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-brand-100"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
            clipRule="evenodd"
          />
        </svg>
      }
      items={menuItems}
    />
  )
}

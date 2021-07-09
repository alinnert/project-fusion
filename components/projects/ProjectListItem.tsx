import {
  ArchiveIcon,
  ArrowCircleDownIcon,
  DocumentDuplicateIcon,
  DotsHorizontalIcon,
  ExclamationIcon,
  InboxIcon,
  PencilIcon,
  TrashIcon,
} from '@heroicons/react/solid'
import React, { FC, useMemo } from 'react'
import { match } from '../../tools/match'
import { Project } from '../../types/FileData'
import { DropdownMenu, MenuItem } from '../ui/DropdownMenu'

interface Props extends Project {}

export const ProjectListItem: FC<Props> = ({
  id,
  name,
  projectNumber,
  important,
  archived,
  notes,
}) => {
  const menuItems = useMemo<Array<MenuItem>>(() => {
    const items: Array<MenuItem> = [
      { label: 'Bearbeiten', icon: <PencilIcon /> },

      important
        ? {
            label: 'Markierung: "Normal"',
            icon: <ArrowCircleDownIcon />,
          }
        : { label: 'Markierung: "Wichtig"', icon: <ExclamationIcon /> },

      archived
        ? { label: 'Aus Archiv wiederherstellen', icon: <InboxIcon /> }
        : { label: 'Archivieren', icon: <ArchiveIcon /> },

      { label: 'Duplizieren', icon: <DocumentDuplicateIcon /> },

      { label: 'Löschen', icon: <TrashIcon /> },
    ]

    return items
  }, [archived, important])

  const textClasses = useMemo(() => {
    return [
      'select-text',
      match(String(important) as 'true' | 'false', {
        true: archived ? 'text-yellow-500' : 'text-yellow-700',
        false: archived ? 'text-neutral-500' : 'text-neutral-700',
      }),
    ].join(' ')
  }, [archived, important])

  return (
    <div
      key={id}
      className={[
        'px-4 py-2 mb-2 last:mb-0 rounded',
        match(String(important) as 'true' | 'false', {
          true: archived ? 'bg-yellow-100/40' : 'bg-yellow-100',
          false: archived ? 'bg-neutral-100/40' : 'bg-neutral-100',
        }),
      ].join(' ')}
    >
      <div
        className={[
          'flex',
          'text-lg',
          match(String(important) as 'true' | 'false', {
            true: 'font-semibold text-yellow-800',
            false: '',
          }),
        ].join(' ')}
      >
        <div className={`flex-1 pr-4 ${textClasses}`}>{name}</div>

        {projectNumber !== undefined ? (
          <div className={textClasses}>{projectNumber}</div>
        ) : null}

        <div className="ml-2">
          <DropdownMenu
            buttonType="flat"
            items={menuItems}
            icon={<DotsHorizontalIcon />}
            align="right"
          />
        </div>
      </div>

      {notes.trim() !== '' ? (
        <div className="prose select-text text-base mt-2">{notes}</div>
      ) : null}
    </div>
  )
}

import {
  ArchiveIcon,
  ArrowCircleDownIcon,
  DocumentDuplicateIcon,
  DotsHorizontalIcon,
  ExclamationIcon,
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
  status,
  notes,
}) => {
  const menuItems = useMemo<Array<MenuItem>>(() => {
    const items: Array<MenuItem> = [
      { label: 'Bearbeiten', icon: <PencilIcon /> },
    ]

    if (status !== 'important') {
      items.push({ label: 'Markierung: "Wichtig"', icon: <ExclamationIcon /> })
    }

    if (status !== 'normal') {
      items.push({
        label: 'Markierung: "Normal"',
        icon: <ArrowCircleDownIcon />,
      })
    }

    if (status !== 'archived') {
      items.push({ label: 'Archivieren', icon: <ArchiveIcon /> })
    }

    items.push(
      { label: 'Duplizieren', icon: <DocumentDuplicateIcon /> },
      { label: 'Löschen', icon: <TrashIcon /> },
    )

    return items
  }, [status])

  return (
    <div
      key={id}
      className={[
        'px-4 py-2 mb-2 last:mb-0 rounded',
        match(status, {
          normal: 'bg-neutral-100',
          important: 'bg-yellow-100',
          archived: ['bg-neutral-50', 'text-neutral-400'].join(' '),
        }),
      ].join(' ')}
    >
      <div
        className={[
          'flex',
          'text-lg',
          match(status, {
            normal: '',
            important: 'font-semibold text-yellow-800',
            archived: '',
          }),
        ].join(' ')}
      >
        <div
          className={[
            'select-text',
            'flex-1',
            status === 'archived' ? 'italic' : '',
          ].join(' ')}
        >
          {name}
        </div>

        {projectNumber !== undefined ? (
          <div
            className={[
              'select-text',
              status === 'archived' ? 'italic' : '',
            ].join(' ')}
          >
            {projectNumber}
          </div>
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
        <div className="prose select-text">{notes}</div>
      ) : null}
    </div>
  )
}

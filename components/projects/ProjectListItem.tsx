import {
  ArchiveIcon,
  ChevronDoubleDownIcon,
  DocumentDuplicateIcon,
  DotsHorizontalIcon,
  InboxIcon,
  PencilIcon,
  StarIcon,
  TrashIcon
} from '@heroicons/react/solid'
import marked from 'marked'
import React, { FC, useMemo } from 'react'
import { Project } from '../../redux/projects'
import { match } from '../../tools/match'
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
            label: 'Aus Favoriten entfernen',
            icon: <ChevronDoubleDownIcon />,
          }
        : { label: 'Zu Favoriten', icon: <StarIcon /> },

      archived
        ? { label: 'In aktive Projekte verschieben', icon: <InboxIcon /> }
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
        true: archived ? 'text-yellow-400 italic' : 'text-yellow-700',
        false: archived ? 'text-neutral-400 italic' : 'text-neutral-700',
      }),
    ].join(' ')
  }, [archived, important])

  const parsedNotes = useMemo(() => {
    if (notes.trim() === '') return ''
    return marked(notes)
  }, [notes])

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
        <div
          className="prose prose-brand select-text text-base mt-2"
          dangerouslySetInnerHTML={{ __html: parsedNotes }}
        ></div>
      ) : null}
    </div>
  )
}

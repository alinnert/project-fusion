import {
  ArchiveIcon,
  ChevronDoubleDownIcon,
  DocumentDuplicateIcon,
  DotsHorizontalIcon,
  InboxIcon,
  PencilIcon,
  StarIcon,
  TrashIcon,
} from '@heroicons/react/solid'
import classNames from 'classnames'
import marked from 'marked'
import React, { FC, useMemo } from 'react'
import { Project } from '../../redux/projects'
import { matchBool } from '../../tools/match'
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
    return classNames(
      'select-text',
      matchBool(
        important,
        matchBool(
          archived,
          'text-amber-500 italic line-through',
          'text-amber-800',
        ),
        matchBool(
          archived,
          'text-neutral-400 italic line-through',
          'text-neutral-800',
        ),
      ),
    )
  }, [archived, important])

  const parsedNotes = useMemo(() => {
    if (notes.trim() === '') return ''
    return marked(notes)
  }, [notes])

  return (
    <div
      key={id}
      className={classNames(
        'px-4 py-2 mb-2 last:mb-0',
        'rounded',
        matchBool(
          important,
          matchBool(archived, 'bg-amber-100/40', 'bg-amber-100'),
          matchBool(archived, 'bg-neutral-100/40', 'bg-neutral-100'),
        ),
      )}
    >
      <div
        className={classNames(
          'flex',
          'text-lg',
          matchBool(important, 'font-semibold text-amber-800'),
        )}
      >
        <div className={classNames('flex-1 pr-4', textClasses)}>{name}</div>

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

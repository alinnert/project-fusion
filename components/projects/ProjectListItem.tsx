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
import React, { FC, useCallback, useMemo } from 'react'
import { useAppDispatch } from '../../redux'
import { Project, removeProject, updateProject } from '../../redux/projects'
import { matchBool } from '../../utils/match'
import { DropdownMenu, MenuItem } from '../ui/DropdownMenu'
import { useConfirmDialog } from '../ui/useConfirmDialog'

interface Props extends Project {}

export const ProjectListItem: FC<Props> = ({
  id,
  name,
  projectNumber,
  important,
  archived,
  notes,
}) => {
  const dispatch = useAppDispatch()
  const { dialog: confirmDeleteDialog, openDialog: openConfirmDeleteDialog } =
    useConfirmDialog({
      onConfirm() {
        dispatch(removeProject(id))
      },
    })

  const handleEdit = useCallback(() => {
    console.warn('not yet implemented')
  }, [])

  const handleAddToFavorites = useCallback(() => {
    dispatch(updateProject({ id, changes: { important: true } }))
  }, [dispatch, id])

  const handleRemoveFromFavorites = useCallback(() => {
    dispatch(updateProject({ id, changes: { important: false } }))
  }, [dispatch, id])

  const handleAddToArchive = useCallback(() => {
    dispatch(updateProject({ id, changes: { archived: true } }))
  }, [dispatch, id])

  const handleRestoreFromArchive = useCallback(() => {
    dispatch(updateProject({ id, changes: { archived: false } }))
  }, [dispatch, id])

  const handleDuplicate = useCallback(() => {
    console.warn('not yet implemented')
  }, [])

  const handleDelete = useCallback(() => {
    openConfirmDeleteDialog({
      title: 'Projekt löschen?',
      message: `Soll das Projekt "${name}" gelöscht werden?`,
      confirmButtonLabel: 'Löschen',
      confirmButtonType: 'delete',
    })
  }, [name, openConfirmDeleteDialog])

  const menuItems = useMemo<Array<MenuItem>>(() => {
    const items: Array<MenuItem> = [
      { label: 'Bearbeiten', icon: <PencilIcon />, action: handleEdit },

      important
        ? {
            label: 'Aus Favoriten entfernen',
            icon: <ChevronDoubleDownIcon />,
            action: handleRemoveFromFavorites,
          }
        : {
            label: 'Zu Favoriten',
            icon: <StarIcon />,
            action: handleAddToFavorites,
          },

      archived
        ? {
            label: 'Zu aktive Projekte',
            icon: <InboxIcon />,
            action: handleRestoreFromArchive,
          }
        : {
            label: 'Archivieren',
            icon: <ArchiveIcon />,
            action: handleAddToArchive,
          },

      {
        label: 'Duplizieren',
        icon: <DocumentDuplicateIcon />,
        action: handleDuplicate,
      },

      { label: 'Löschen', icon: <TrashIcon />, action: handleDelete },
    ]

    return items
  }, [
    archived,
    handleAddToArchive,
    handleAddToFavorites,
    handleDelete,
    handleDuplicate,
    handleEdit,
    handleRemoveFromFavorites,
    handleRestoreFromArchive,
    important,
  ])

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
    <>
      {confirmDeleteDialog}

      <div
        key={id}
        className={classNames(
          'px-4 py-2 mb-2 last:mb-0',
          'rounded-md shadow',
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
          />
        ) : null}
      </div>
    </>
  )
}

import {
  ArchiveIcon,
  ChevronDoubleDownIcon,
  DocumentDuplicateIcon,
  DotsVerticalIcon,
  InboxIcon,
  LinkIcon,
  PencilIcon,
  StarIcon,
  TrashIcon,
} from '@heroicons/react/solid'
import classNames from 'classnames'
import marked from 'marked'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import React, { FC, useCallback, useMemo } from 'react'
import { useAppDispatch } from '../../redux'
import { Project, removeProject, updateProject } from '../../redux/projects'
import { matchBoolToString } from '../../utils/match'
import { useGroupFromRoute } from '../groups/useGroupFromRoute'
import { Button } from '../ui/Button'
import { DropdownMenu, DropdownMenuItem } from '../ui/DropdownMenu'
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
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { groupId } = useGroupFromRoute()
  const { dialog: confirmDeleteDialog, openDialog: openConfirmDeleteDialog } =
    useConfirmDialog({
      onConfirm() {
        dispatch(removeProject(id))
      },
    })

  const handleEdit = useCallback(() => {
    router.push({
      pathname: '/groups/[groupId]/projects/[projectId]/edit',
      query: { groupId, projectId: id },
    })
  }, [groupId, id, router])

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
      title: t('projects:deleteDialog.title'),
      message: t('projects:deleteDialog.message', { project: name }),
      confirmButtonLabel: t('buttons.delete'),
      confirmButtonType: 'delete',
    })
  }, [name, openConfirmDeleteDialog, t])

  const menuItems = useMemo<DropdownMenuItem[]>(() => {
    const items: DropdownMenuItem[] = [
      {
        type: 'button',
        label: t('buttons.edit'),
        icon: <PencilIcon />,
        action: handleEdit,
      },

      important
        ? {
            type: 'button',
            label: t('projects:item.actions.removeFromFavorites'),
            icon: <ChevronDoubleDownIcon />,
            action: handleRemoveFromFavorites,
          }
        : {
            type: 'button',
            label: t('projects:item.actions.addToFavorites'),
            icon: <StarIcon />,
            action: handleAddToFavorites,
          },

      archived
        ? {
            type: 'button',
            label: t('projects:item.actions.unarchiveProject'),
            icon: <InboxIcon />,
            action: handleRestoreFromArchive,
          }
        : {
            type: 'button',
            label: t('projects:item.actions.archiveProject'),
            icon: <ArchiveIcon />,
            action: handleAddToArchive,
          },

      {
        type: 'button',
        label: t('buttons.duplicate'),
        icon: <DocumentDuplicateIcon />,
        action: handleDuplicate,
      },

      {
        label: t('buttons.delete'),
        icon: <TrashIcon />,
        type: 'button',
        buttonType: 'delete',
        action: handleDelete,
      },
    ]

    const customLinks: DropdownMenuItem[] = []

    if (customLinks.length > 0) {
      items.push({ type: 'separator' }, ...customLinks)
    }

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
    t,
  ])

  const textClasses = useMemo(() => {
    return classNames(
      'select-text',
      'font-semibold',
      matchBoolToString(
        important,
        matchBoolToString(
          archived,
          'text-important-500 italic line-through',
          'text-important-800',
        ),
        matchBoolToString(
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

  const projectItemClasses = useMemo(() => {
    return classNames(
      'p-2 mb-2 last:mb-0',
      'rounded-md border',
      matchBoolToString(
        important,
        matchBoolToString(
          archived,
          'border-important-200',
          'border-important-300',
        ),
        matchBoolToString(archived, 'border-neutral-200', 'border-neutral-300'),
      ),
      matchBoolToString(
        important,
        matchBoolToString(archived, 'bg-important-100/40', 'bg-important-100'),
        matchBoolToString(archived, 'bg-neutral-50', 'bg-neutral-100'),
      ),
    )
  }, [archived, important])

  return (
    <>
      {confirmDeleteDialog}

      <div key={id} className={projectItemClasses}>
        <div className={classNames('flex items-center gap-x-1 text-lg')}>
          <div className={classNames('flex-1', textClasses)}>{name}</div>

          {projectNumber !== undefined ? (
            <div className={classNames('flex-0 mr-4', textClasses)}>
              {projectNumber}
            </div>
          ) : null}

          <Button buttonType="flat" buttonSize="small" icon={<LinkIcon />}>
            Buchen
          </Button>

          <DropdownMenu
            buttonType="flat"
            buttonSize="small"
            items={menuItems}
            icon={<DotsVerticalIcon />}
            align="right"
          />
        </div>

        {notes.trim() !== '' ? (
          <div
            className="prose prose-brand select-text text-base mt-4"
            dangerouslySetInnerHTML={{ __html: parsedNotes }}
          />
        ) : null}
      </div>
    </>
  )
}

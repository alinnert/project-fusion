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
import { marked } from 'marked'
import React, { FC, useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'
import { useAppDispatch, useAppSelector } from '../../redux'
import { Project, removeProject, updateProject } from '../../redux/projects'
import { translationNamespaces } from '../../utils/i18next-namespaces'
import { isDefined } from '../../utils/isDefined'
import { mapBooleanToString } from '../../utils/map'
import { useConfirmDialog } from '../ui/dialogs/useConfirmDialog'
import { DropdownMenu, DropdownMenuItem } from '../ui/dropdownMenu/DropdownMenu'
import { Button } from '../ui/forms/Button'
import { Heroicon } from '../ui/Heroicon'

export const ProjectListItem: FC<Project> = ({
  id,
  name,
  projectNumber,
  important,
  archived,
  notes,
}) => {
  const { t } = useTranslation(translationNamespaces)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { dialog: confirmDeleteDialog, openDialog: openConfirmDeleteDialog } =
    useConfirmDialog({
      onConfirm() {
        dispatch(removeProject(id))
      },
    })

  const primaryProjectLink = useAppSelector(
    (state) => state.settings.primaryProjectLink,
  )

  const groupEntities = useAppSelector((state) => state.groups.entities)

  const group = useMemo(() => {
    return (
      Object.values(groupEntities)
        .filter(isDefined)
        .find((group) => group.projects.includes(id)) ?? null
    )
  }, [groupEntities, id])

  const handleEdit = useCallback(() => {
    if (group === null) return
    navigate(`/groups/${group.id}/projects/${id}/edit`)
  }, [group, id, navigate])

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
    if (group === null) return
    navigate(`/groups/${group.id}/new-project`)
  }, [group, navigate])

  const handleDelete = useCallback(() => {
    openConfirmDeleteDialog({
      title: t('projects:deleteDialog.title'),
      message: t('projects:deleteDialog.message', { project: name }),
      confirmButtonLabel: t('common:buttons.delete'),
      confirmButtonType: 'delete',
    })
  }, [name, openConfirmDeleteDialog, t])

  const menuItems = useMemo<DropdownMenuItem[]>(() => {
    const items: DropdownMenuItem[] = [
      {
        type: 'button',
        label: t('common:buttons.edit'),
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
        label: t('common:buttons.duplicate'),
        icon: <DocumentDuplicateIcon />,
        action: handleDuplicate,
      },

      {
        label: t('common:buttons.delete'),
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
      'text-lg font-semibold',
      mapBooleanToString(
        important,
        mapBooleanToString(
          archived,
          'text-important-700/60 italic line-through',
          'text-important-700',
        ),
        mapBooleanToString(
          archived,
          'text-neutral-800/60 italic line-through',
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
      'p-4 mb-2 last:mb-0',
      'rounded-md',
      'shadow',
      mapBooleanToString(
        important,
        mapBooleanToString(
          archived,
          'bg-important-50/40 border border-important-200',
          'bg-important-50 border border-important-300',
        ),
        mapBooleanToString(
          archived,
          'bg-white/40 border border-neutral-200',
          'bg-white border border-neutral-300',
        ),
      ),
    )
  }, [archived, important])

  function handlePrimaryProjectLinkClick(): void {
    if (primaryProjectLink === null) return
    const url = primaryProjectLink.url.replaceAll(
      '{projectNumber}',
      projectNumber,
    )
    globalThis.open(url, '_blank')
  }

  return (
    <>
      {confirmDeleteDialog}

      <div key={id} className={projectItemClasses}>
        <div className={classNames('flex items-center gap-x-1 text-base')}>
          {important ? (
            <Heroicon className="text-important-600" icon={<StarIcon />} />
          ) : null}

          <div className={classNames('flex-1', textClasses)}>{name}</div>

          {projectNumber !== undefined ? (
            <div className={classNames('flex-0 mr-4', textClasses)}>
              {projectNumber}
            </div>
          ) : null}

          {primaryProjectLink !== null ? (
            <Button
              type="flat"
              size="small"
              icon={<LinkIcon />}
              onClick={handlePrimaryProjectLinkClick}
            >
              {primaryProjectLink.label}
            </Button>
          ) : null}

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
            className={classNames(
              'prose prose-brand select-text text-base mt-4',
              mapBooleanToString(archived, 'opacity-60'),
            )}
            dangerouslySetInnerHTML={{ __html: parsedNotes }}
          />
        ) : null}
      </div>
    </>
  )
}

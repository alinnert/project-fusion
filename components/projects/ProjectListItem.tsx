import {
  ArchiveIcon,
  ChevronDoubleDownIcon,
  DocumentDuplicateIcon,
  DotsVerticalIcon,
  InboxIcon,
  LinkIcon,
  PencilIcon,
  StarIcon,
  TrashIcon
} from '@heroicons/react/solid'
import classNames from 'classnames'
import marked from 'marked'
import { useRouter } from 'next/router'
import React, { FC, useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from '../../redux'
import { Project, removeProject, updateProject } from '../../redux/projects'
import { translationNamespaces } from '../../utils/i18next-namespaces'
import { matchBoolToString } from '../../utils/match'
import { tailwindConfig } from '../../utils/tailwindConfig'
import { useGroupFromRoute } from '../groups/useGroupFromRoute'
import { Button } from '../ui/Button'
import { DropdownMenu, DropdownMenuItem } from '../ui/DropdownMenu'
import { Heroicon } from '../ui/Heroicon'
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
  const { t } = useTranslation(translationNamespaces)
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { groupId } = useGroupFromRoute()
  const { dialog: confirmDeleteDialog, openDialog: openConfirmDeleteDialog } =
    useConfirmDialog({
      onConfirm() {
        dispatch(removeProject(id))
      },
    })

  const primaryProjectLink = useAppSelector(
    (state) => state.settings.primaryProjectLink,
  )

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
    router.push({
      pathname: `/groups/[groupId]/new-project`,
      query: { groupId, from: id },
    })
  }, [groupId, id, router])

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
      'text-base font-semibold',
      matchBoolToString(
        important,
        matchBoolToString(
          archived,
          'text-important-800/60 italic line-through',
          'text-important-800',
        ),
        matchBoolToString(
          archived,
          'text-neutral-600/60 italic line-through',
          'text-neutral-600',
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
            <Heroicon
              // @ts-expect-error
              color={tailwindConfig.theme.colors?.important['600']}
              icon={<StarIcon />}
            />
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
              matchBoolToString(archived, 'opacity-60'),
            )}
            dangerouslySetInnerHTML={{ __html: parsedNotes }}
          />
        ) : null}
      </div>
    </>
  )
}

import { FolderIcon, XMarkIcon } from '@heroicons/react/20/solid'
import { CheckIcon } from '@heroicons/react/24/outline'
import React, { FC, FormEvent, useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router'
import { useAppDispatch, useAppSelector } from '../../redux'
import { addProjectToGroup } from '../../redux/groups'
import {
  addProject,
  Project,
  ProjectTemplate,
  updateProject
} from '../../redux/projects'
import { createId } from '../../utils/customNanoId'
import { useGlobalKeyDown } from '../../utils/events'
import { useCtrlOrCmd } from '../../utils/keyboard'
import { Checkbox } from '../ui/forms/Checkbox'
import { Form } from '../ui/forms/Form'
import { Input } from '../ui/forms/Input'
import { Textarea } from '../ui/forms/Textarea'
import { Heroicon } from '../ui/Heroicon'
import { PageContent } from '../ui/PageContent'
import { ToolbarContainer, ToolbarItem } from '../ui/toolbar/ToolbarContainer'

interface Props {
  init?: Project | ProjectTemplate | null
}

export const ProjectEditForm: FC<Props> = ({ init = null }) => {
  const { t } = useTranslation()
  const params = useParams()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const ctrlOrCmd = useCtrlOrCmd()

  const [name, setName] = useState(init?.name ?? '')
  const [projectNumber, setProjectNumber] = useState(init?.projectNumber ?? '')
  const [notes, setNotes] = useState(init?.notes ?? '')
  const [important, setImportant] = useState(init?.important ?? false)
  const [archived, setArchived] = useState(init?.archived ?? false)

  const groups = useAppSelector((state) => state.groups.entities)

  const groupId = useMemo<string | null>(() => {
    const groupIdValue = params.groupId
    if (Array.isArray(groupIdValue)) return groupIdValue[0] ?? null
    return groupIdValue ?? null
  }, [params.groupId])

  const group = useMemo(() => {
    if (groupId === null) return null
    return groups[groupId]
  }, [groupId, groups])

  const isFormValid = useMemo<boolean>(() => {
    if (name.trim() === '') return false
    return true
  }, [name])

  const isEditingExistingProject = useMemo(
    () => init !== null && init.id !== undefined,
    [init],
  )

  const pageTitle = useMemo(() => {
    return isEditingExistingProject
      ? `${t('projects:editForm.edit.pageTitle')}`
      : `${t('projects:editForm.create.pageTitle')}`
  }, [isEditingExistingProject, t])

  const createProject = useCallback(() => {
    if (groupId === null) return

    const id = createId()

    dispatch(
      addProject({ id, name, projectNumber, important, archived, notes }),
    )

    dispatch(addProjectToGroup({ groupId, projectId: id }))

    navigate(`/groups/${groupId}`)
  }, [
    groupId,
    dispatch,
    name,
    projectNumber,
    important,
    archived,
    notes,
    navigate,
  ])

  const editProject = useCallback(() => {
    if (init === null) return
    if (init.id === undefined) return

    dispatch(
      updateProject({
        id: init.id,
        changes: { name, projectNumber, important, archived, notes },
      }),
    )

    if (groupId !== null) {
      dispatch(addProjectToGroup({ groupId: groupId, projectId: init.id }))
    }

    navigate(`/groups/${groupId}`)
  }, [
    init,
    dispatch,
    name,
    projectNumber,
    important,
    archived,
    notes,
    groupId,
    navigate,
  ])

  const saveProject = useCallback(() => {
    if (isEditingExistingProject) {
      editProject()
    } else {
      createProject()
    }
  }, [createProject, editProject, isEditingExistingProject])

  const cancel = useCallback(() => {
    const groupId = params.groupId
    if (groupId === undefined) return

    navigate(`/groups/${groupId}`)
  }, [navigate, params.groupId])

  const toolbarItems = useMemo<ToolbarItem[]>(
    () => [
      {
        type: 'button',
        buttonType: 'primary',
        label: t('common:buttons.save'),
        icon: <CheckIcon />,
        disabled: !isFormValid,
        action: saveProject,
      },
      {
        type: 'button',
        buttonType: 'default',
        label: t('common:buttons.cancel'),
        icon: <XMarkIcon />,
        action: cancel,
      },
    ],
    [cancel, isFormValid, saveProject, t],
  )

  useGlobalKeyDown((event) => {
    if (ctrlOrCmd(event) && event.key === 's') {
      event.preventDefault()
      saveProject()
    }
  })

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault()
    saveProject()
  }

  return (
    <ToolbarContainer
      title={pageTitle}
      toolbarItems={toolbarItems}
      toolbarPadding="lg"
    >
      <PageContent centered>
        <div className="text-xl mb-8 flex items-center gap-x-2">
          <Heroicon icon={<FolderIcon />} color={group?.color} scale={1.5} />
          {group?.name ?? '--'}
          {' » '}
          {isEditingExistingProject ? init?.name ?? '-' : null}
        </div>

        <Form type="page" onSubmit={handleSubmit} submitOnCtrlEnter>
          <div className="grid grid-cols-[3fr,1fr] gap-x-4">
            <Input
              label={`${t('projects:labels.name')} *`}
              value={name}
              onChange={setName}
            />

            <Input
              label={t('projects:labels.projectNumber')}
              value={projectNumber}
              onChange={setProjectNumber}
            />
          </div>

          <div className="grid grid-cols-3">
            <Checkbox
              label={t('projects:labels.important')}
              value={important}
              onChange={setImportant}
            />

            <Checkbox
              label={t('projects:labels.archived')}
              value={archived}
              onChange={setArchived}
            />
          </div>

          <Textarea
            label={t('projects:labels.notes')}
            value={notes}
            onChange={setNotes}
          />
        </Form>
      </PageContent>
    </ToolbarContainer>
  )
}

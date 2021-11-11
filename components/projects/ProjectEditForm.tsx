import { SaveIcon, XIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/router'
import React, { FC, useCallback, useDebugValue, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useAppDispatch } from '../../redux'
import { addProjectToGroup } from '../../redux/groups'
import {
  addProject,
  Project,
  ProjectTemplate,
  updateProject,
} from '../../redux/projects'
import { createId } from '../../utils/customNanoId'
import { translationNamespaces } from '../../utils/i18next-namespaces'
import { Checkbox } from '../ui/Checkbox'
import { Form } from '../ui/Form'
import { Input } from '../ui/Input'
import { PageContent } from '../ui/PageContent'
import { Textarea } from '../ui/Textarea'
import { ToolbarContainer, ToolbarItem } from '../ui/ToolbarContainer'

interface Props {
  init?: Project | ProjectTemplate | null
}

export const ProjectEditForm: FC<Props> = ({ init = null }) => {
  useDebugValue(init === null ? 'new project' : init.name)
  const { t } = useTranslation(translationNamespaces)
  const router = useRouter()
  const dispatch = useAppDispatch()
  const [name, setName] = useState(init?.name ?? '')
  const [projectNumber, setProjectNumber] = useState(init?.projectNumber ?? '')
  const [notes, setNotes] = useState(init?.notes ?? '')
  const [important, setImportant] = useState(init?.important ?? false)
  const [archived, setArchived] = useState(init?.archived ?? false)

  const groupId = useMemo<string | null>(() => {
    const groupIdValue = router.query.groupId
    if (Array.isArray(groupIdValue)) return groupIdValue[0] ?? null
    return groupIdValue ?? null
  }, [router.query.groupId])

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
      ? `${t('projects:editForm.edit.pageTitle')}: ${init?.name ?? '-'}`
      : `${t('projects:editForm.create.pageTitle')}`
  }, [init, isEditingExistingProject, t])

  const createProject = useCallback(() => {
    if (groupId === null) return

    const id = createId()

    dispatch(
      addProject({ id, name, projectNumber, important, archived, notes }),
    )

    dispatch(addProjectToGroup({ groupId, projectId: id }))

    router.push({ pathname: '/groups/[groupId]', query: { groupId: groupId } })
  }, [
    archived,
    groupId,
    dispatch,
    important,
    notes,
    name,
    projectNumber,
    router,
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

    router.push({ pathname: '/groups/[groupId]', query: { groupId } })
  }, [
    archived,
    groupId,
    dispatch,
    important,
    init,
    notes,
    name,
    projectNumber,
    router,
  ])

  const saveProject = useCallback(() => {
    if (isEditingExistingProject) {
      editProject()
    } else {
      createProject()
    }
  }, [createProject, editProject, isEditingExistingProject])

  const cancel = useCallback(() => {
    const groupId = router.query.groupId
    if (groupId === undefined) return

    router.push({ pathname: '/groups/[groupId]', query: { groupId } })
  }, [router])

  const toolbarItems = useMemo<ToolbarItem[]>(
    () => [
      {
        type: 'button',
        buttonType: 'primary',
        label: t('buttons.save'),
        icon: <SaveIcon />,
        disabled: !isFormValid,
        action: saveProject,
      },
      {
        type: 'button',
        buttonType: 'default',
        label: t('buttons.cancel'),
        icon: <XIcon />,
        action: cancel,
      },
    ],
    [cancel, isFormValid, saveProject, t],
  )

  return (
    <ToolbarContainer toolbarItems={toolbarItems}>
      <PageContent title={pageTitle} centered={true}>
        <Form type="page">
          <div className="grid grid-cols-[3fr,1fr] gap-x-4">
            <Input
              label={`${t('projects:editForm.labels.name')} *`}
              value={name}
              onChange={setName}
            />

            <Input
              label={t('projects:editForm.labels.projectNumber')}
              value={projectNumber}
              onChange={setProjectNumber}
            />
          </div>

          <Checkbox
            label={t('projects:editForm.labels.important')}
            value={important}
            onChange={setImportant}
          />

          <Checkbox
            label={t('projects:editForm.labels.archived')}
            value={archived}
            onChange={setArchived}
          />

          <Textarea
            label={t('projects:editForm.labels.notes')}
            value={notes}
            onChange={setNotes}
          />
        </Form>
      </PageContent>
    </ToolbarContainer>
  )
}

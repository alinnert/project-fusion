import { FolderAddIcon, FolderIcon } from '@heroicons/react/outline'
import { SaveIcon, XIcon } from '@heroicons/react/solid'
import React, { FC, useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'
import { useAppDispatch } from '../../redux'
import { addGroupToCategory, Category } from '../../redux/categories'
import { addGroup, ProjectGroup, updateGroup } from '../../redux/groups'
import { createId } from '../../utils/customNanoId'
import { useGlobalKeyDown } from '../../utils/events'
import { translationNamespaces } from '../../utils/i18next-namespaces'
import { useCtrlOrCmd } from '../../utils/keyboard'
import { useCategoryFromGroup } from '../categories/useCategoryFromGroup'
import { useOrderedCategories } from '../categories/useOrderedCategories'
import { ColorInput } from '../ui/forms/ColorInput'
import { Form } from '../ui/forms/Form'
import { Input } from '../ui/forms/Input'
import { Select } from '../ui/forms/Select'
import { Textarea } from '../ui/forms/Textarea'
import { PageContent } from '../ui/PageContent'
import { ToolbarContainer, ToolbarItem } from '../ui/toolbar/ToolbarContainer'

interface Props {
  init?: ProjectGroup | null
}

export const GroupEditForm: FC<Props> = ({ init = null }) => {
  const { t } = useTranslation(translationNamespaces)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { orderedCategories } = useOrderedCategories()
  const { categoryId: categoryIdFromGroup } = useCategoryFromGroup(init)

  const ctrlOrCmd = useCtrlOrCmd()

  const [name, setName] = useState(init?.name ?? '')
  const [color, setColor] = useState(init?.color ?? '')
  const [categoryId, setCategoryId] = useState<Category['id'] | null>(
    categoryIdFromGroup,
  )
  const [notes, setNotes] = useState(init?.notes ?? '')

  const isFormValid = useMemo<boolean>(() => {
    if (name.trim() === '') return false
    if (!color.match(/^#[0-9a-fA-F]{3,6}$/)) return false
    return true
  }, [color, name])

  const isEditForm = useMemo(() => init !== null, [init])

  const categorySelectItems = useMemo(() => {
    return orderedCategories.map((category) => ({
      value: category.id,
      label: category.name,
    }))
  }, [orderedCategories])

  const pageTitle = useMemo(() => {
    const groupName = name !== '' ? name : '-'

    return isEditForm
      ? `${t('groups:editForm.edit.pageTitle')}: ${groupName}`
      : `${t('groups:editForm.create.pageTitle')}: ${groupName}`
  }, [name, isEditForm, t])

  const createGroup = useCallback(() => {
    const id = createId()

    dispatch(addGroup({ id, name, color, notes, projects: [] }))

    if (categoryId !== null) {
      dispatch(addGroupToCategory({ categoryId: categoryId, groupId: id }))
    }

    navigate(`/groups/${id}`)
  }, [categoryId, color, dispatch, name, navigate, notes])

  const editGroup = useCallback(() => {
    if (init === null) return

    dispatch(
      updateGroup({
        id: init.id,
        changes: { name, color, notes, projects: init.projects },
      }),
    )

    if (categoryId !== null) {
      dispatch(addGroupToCategory({ groupId: init.id, categoryId }))
    }

    navigate(`/groups/${init.id}`)
  }, [init, dispatch, name, color, notes, categoryId, navigate])

  const saveGroup = useCallback(() => {
    if (isEditForm) {
      editGroup()
    } else {
      createGroup()
    }
  }, [createGroup, editGroup, isEditForm])

  const cancel = useCallback(() => {
    if (init !== null) {
      navigate(`/groups/${init.id}`)
      return
    }

    navigate(`/`)
  }, [init, navigate])

  const toolbarItems = useMemo<ToolbarItem[]>(
    () => [
      {
        type: 'button',
        buttonType: 'primary',
        label: t('common:buttons.save'),
        icon: <SaveIcon />,
        disabled: !isFormValid,
        action: saveGroup,
      },
      {
        type: 'button',
        buttonType: 'default',
        label: t('common:buttons.cancel'),
        icon: <XIcon />,
        action: cancel,
      },
    ],
    [cancel, isFormValid, saveGroup, t],
  )

  useGlobalKeyDown((event) => {
    if (ctrlOrCmd(event) && event.key === 's') {
      event.preventDefault()
      saveGroup()
    }
  })

  function handleSubmit() {
    saveGroup()
  }

  return (
    <ToolbarContainer toolbarItems={toolbarItems}>
      <PageContent
        title={pageTitle}
        icon={isEditForm ? <FolderIcon /> : <FolderAddIcon />}
        iconColor={color}
        iconType="outline"
        centered
      >
        <Form type="page" onSubmit={handleSubmit} submitOnCtrlEnter>
          <Input
            label={`${t('groups:labels.name')} *`}
            onChange={setName}
            value={name}
          />

          <ColorInput
            label={t('groups:labels.color')}
            value={color}
            onChange={setColor}
          />

          <Select
            items={[
              { value: '', label: t('groups:list.noCategory') },
              ...categorySelectItems,
            ]}
            label={t('groups:labels.category')}
            value={categoryId}
            nullValue={{ value: '', label: t('groups:list.noCategory') }}
            onChange={setCategoryId}
          />

          <Textarea
            label={t('groups:labels.notes')}
            value={notes}
            onChange={setNotes}
          />
        </Form>
      </PageContent>
    </ToolbarContainer>
  )
}

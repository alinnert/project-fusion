import { FolderAddIcon, FolderIcon } from '@heroicons/react/outline'
import { SaveIcon, XIcon } from '@heroicons/react/solid'
import React, { FC, useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'
import { useAppDispatch } from '../../redux'
import { addGroupToCategory, Category } from '../../redux/categories'
import { addGroup, ProjectGroup, updateGroup } from '../../redux/groups'
import { createId } from '../../utils/customNanoId'
import { translationNamespaces } from '../../utils/i18next-namespaces'
import { useCategoryFromGroup } from '../categories/useCategoryFromGroup'
import { useOrderedCategories } from '../categories/useOrderedCategories'
import { ColorInput } from '../ui/ColorInput'
import { Form } from '../ui/Form'
import { Input } from '../ui/Input'
import { PageContent } from '../ui/PageContent'
import { Select } from '../ui/Select'
import { Textarea } from '../ui/Textarea'
import { ToolbarContainer, ToolbarItem } from '../ui/ToolbarContainer'

interface Props {
  init?: ProjectGroup | null
}

export const GroupEditForm: FC<Props> = ({ init = null }) => {
  const { t } = useTranslation(translationNamespaces)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { orderedCategories } = useOrderedCategories()
  const { categoryId: categoryIdFromGroup } = useCategoryFromGroup(init)

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

  function handleSubmit() {
    saveGroup()
  }

  return (
    <ToolbarContainer toolbarItems={toolbarItems}>
      <PageContent
        title={pageTitle}
        titleIcon={isEditForm ? <FolderIcon /> : <FolderAddIcon />}
        titleIconColor={color}
        titleIconType="outline"
        centered={true}
      >
        <Form type="page" onSubmit={handleSubmit} submitOnCtrlEnter>
          <Input
            label={`${t('groups:editForm.labels.name')} *`}
            onChange={setName}
            value={name}
          />

          <ColorInput
            label={t('groups:editForm.labels.color')}
            value={color}
            onChange={setColor}
          />

          <Select
            items={[
              { value: '', label: t('groups:list.noCategory') },
              ...categorySelectItems,
            ]}
            label={t('groups:editForm.labels.category')}
            value={categoryId}
            nullValue={{ value: '', label: t('groups:list.noCategory') }}
            onChange={setCategoryId}
          />

          <Textarea
            label={t('groups:editForm.labels.notes')}
            value={notes}
            onChange={setNotes}
          />
        </Form>
      </PageContent>
    </ToolbarContainer>
  )
}

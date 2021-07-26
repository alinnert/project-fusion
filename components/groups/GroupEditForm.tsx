import {
  FolderAddIcon,
  FolderIcon,
  SaveIcon,
  XIcon,
} from '@heroicons/react/solid'
import { useTranslation } from 'next-i18next'
import router from 'next/router'
import React, { FC, FormEvent, useMemo, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux'
import { addGroupToCategory, Category } from '../../redux/categories'
import { selectIsFileOpen } from '../../redux/database'
import { addGroup, ProjectGroup, updateGroup } from '../../redux/groups'
import { createId } from '../../utils/customNanoId'
import { Layout } from '../app/Layout'
import { useCategoryFromGroup } from '../categories/useCategoryFromGroup'
import { useOrderedCategories } from '../categories/useOrderedCategories'
import { ColorInput } from '../ui/ColorInput'
import { Form } from '../ui/Form'
import { Input } from '../ui/Input'
import { PageContent } from '../ui/PageContent'
import { Select } from '../ui/Select'
import { Textarea } from '../ui/Textarea'
import { ToolbarContainer } from '../ui/ToolbarContainer'
import { GroupList } from './GroupList'

interface Props {
  init?: ProjectGroup | null
}

export const GroupEditForm: FC<Props> = ({ init = null }) => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const isFileOpen = useAppSelector(selectIsFileOpen)
  const { orderedCategories } = useOrderedCategories()
  const { categoryId: categoryIdFromGroup } = useCategoryFromGroup(init)

  const [groupName, setGroupName] = useState(init?.name ?? '')
  const [color, setColor] = useState(init?.color ?? '')
  const [categoryId, setCategoryId] = useState<Category['id'] | null>(
    categoryIdFromGroup,
  )
  const [notes, setNotes] = useState(init?.notes ?? '')

  const isValid = useMemo<boolean>(() => {
    if (groupName.trim() === '') return false
    if (!color.match(/^#[0-9a-fA-F]{3,6}$/)) return false
    return true
  }, [color, groupName])

  const isEditForm = useMemo(() => init !== null, [init])

  const categorySelectItems = useMemo(() => {
    return orderedCategories.map((category) => ({
      value: category.id,
      label: category.name,
    }))
  }, [orderedCategories])

  const pageTitle = useMemo(() => {
    const name = groupName !== '' ? groupName : '[kein Name]'
    return isEditForm
      ? `${name} ${t('groups:editForm.edit.titleHint')}`
      : `${name} ${t('groups:editForm.create.titleHint')}`
  }, [groupName, isEditForm, t])

  function createGroup() {
    const newGroup: ProjectGroup = {
      id: createId(),
      name: groupName,
      color,
      notes,
      projects: [],
    }

    dispatch(addGroup(newGroup))

    if (categoryId !== null) {
      dispatch(
        addGroupToCategory({ categoryId: categoryId, groupId: newGroup.id }),
      )
    }

    router.push(`/groups/${newGroup.id}`)
  }

  function editGroup() {
    if (init === null) return

    const updatedGroup: ProjectGroup = {
      id: init.id,
      name: groupName,
      color,
      notes,
      projects: init.projects,
    }

    updateGroup(updatedGroup, categoryId)

    router.push(`/groups/${updatedGroup.id}`)
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    isEditForm ? editGroup() : createGroup()
  }

  function handleCancel() {
    if (init !== null) {
      router.push(`/groups/${init.id}`)
      return
    }

    router.push(`/`)
  }

  return (
    <Layout left={isFileOpen ? <GroupList /> : null}>
      <ToolbarContainer
        toolbarItems={[
          {
            type: 'button',
            buttonType: 'primary',
            label: t('buttons.save'),
            icon: <SaveIcon />,
            action: isEditForm ? editGroup : createGroup,
          },
          {
            type: 'button',
            buttonType: 'default',
            label: t('buttons.cancel'),
            icon: <XIcon />,
            action: handleCancel,
          },
        ]}
      >
        <PageContent
          title={pageTitle}
          titleIcon={isEditForm ? <FolderIcon /> : <FolderAddIcon />}
          titleIconColor={color}
        >
          <Form onSubmit={handleSubmit}>
            <Input
              label={t('groups:editForm.labels.name')}
              onChange={setGroupName}
              value={groupName}
            />

            <ColorInput
              label={t('groups:editForm.labels.color')}
              value={color}
              onChange={setColor}
            />

            <Select
              items={[
                { value: '', label: '[ ohne Kategorie ]' },
                ...categorySelectItems,
              ]}
              label={t('groups:editForm.labels.category')}
              value={categoryId}
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
    </Layout>
  )
}

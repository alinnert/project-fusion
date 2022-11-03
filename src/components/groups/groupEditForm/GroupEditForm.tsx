import { FolderIcon, FolderPlusIcon } from '@heroicons/react/24/outline'
import React, { FC, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Category } from '../../../redux/categories'
import { ProjectGroup } from '../../../redux/groups'
import { useCategoryFromGroup } from '../../categories/useCategoryFromGroup'
import { useOrderedCategories } from '../../categories/useOrderedCategories'
import { ColorInput } from '../../ui/forms/ColorInput'
import { Form } from '../../ui/forms/Form'
import { Input } from '../../ui/forms/Input'
import { Select } from '../../ui/forms/Select'
import { Textarea } from '../../ui/forms/Textarea'
import { PageContent } from '../../ui/PageContent'
import { ToolbarContainer } from '../../ui/toolbar/ToolbarContainer'
import { useGroupEditFormActions } from './useGroupEditFormActions'
import { useGroupEditFormShortcuts } from './useGroupEditFormShortcuts'
import { useGroupEditFormToolbarItems } from './useGroupEditFormToolbarItems'

interface Props {
  init?: ProjectGroup | null
}

export const GroupEditForm: FC<Props> = ({ init = null }) => {
  const { t } = useTranslation()
  const { orderedCategories } = useOrderedCategories()
  const { categoryId: categoryIdFromGroup } = useCategoryFromGroup(init)

  const [name, setName] = useState<string>(init?.name ?? '')
  const [color, setColor] = useState<string>(init?.color ?? '')
  const [categoryId, setCategoryId] = useState<Category['id'] | null>(
    categoryIdFromGroup,
  )
  const [notes, setNotes] = useState<string>(init?.notes ?? '')

  const categorySelectItems = useMemo(() => {
    return orderedCategories.map((category) => ({
      value: category.id,
      label: category.name,
    }))
  }, [orderedCategories])

  const isEditForm = init !== null
  const pageTitle = isEditForm
    ? t('groups:editForm.edit.pageTitle')
    : t('groups:editForm.create.pageTitle')

  const { saveGroup } = useGroupEditFormActions({
    name,
    color,
    notes,
    categoryId,
    init,
  })
  const toolbarItems = useGroupEditFormToolbarItems({
    init,
    name,
    color,
    saveGroup,
  })
  useGroupEditFormShortcuts({ saveGroup })

  return (
    <ToolbarContainer
      title={pageTitle}
      toolbarItems={toolbarItems}
      toolbarPadding="lg"
    >
      <PageContent
        icon={isEditForm ? <FolderIcon /> : <FolderPlusIcon />}
        iconColor={color}
        iconType="outline"
        centered
      >
        <Form type="page" onSubmit={saveGroup} submitOnCtrlEnter>
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

import { TagIcon } from '@heroicons/react/outline'
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/solid'
import React, { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useOrderedCategories } from '../../components/categories/useOrderedCategories'
import { useSettings } from '../../components/settings/useSettings'
import { Button } from '../../components/ui/Button'
import { Headline } from '../../components/ui/Headline'
import { PageContent } from '../../components/ui/PageContent'
import { SortableList, SwapDirection } from '../../components/ui/SortableList'
import { useConfirmDialog } from '../../components/ui/useConfirmDialog'
import { useTextDialog } from '../../components/ui/useTextDialog'
import { useAppDispatch } from '../../redux'
import {
  addCategory,
  Category,
  removeCategory,
  updateCategory,
} from '../../redux/categories'
import { swapCategories } from '../../redux/settings'
import { createId } from '../../utils/customNanoId'
import { translationNamespaces } from '../../utils/i18next-namespaces'

export const ConfigCategories: FC = () => {
  const { t } = useTranslation(translationNamespaces)
  const dispatch = useAppDispatch()

  const { databaseSettings } = useSettings()
  const { categories, orderedCategoryIds } = useOrderedCategories()

  const [selectedId, setSelectedId] = useState<Category['id'] | null>(null)

  const { dialog: deleteDialog, openDialog: openDeleteDialog } =
    useConfirmDialog({
      onConfirm() {
        if (selectedId === null) return
        const previousIndex = orderedCategoryIds.indexOf(selectedId)
        dispatch(removeCategory(selectedId))

        const newSelectedId =
          orderedCategoryIds.length === 1
            ? null
            : previousIndex === orderedCategoryIds.length - 1
            ? orderedCategoryIds[orderedCategoryIds.length - 2]
            : orderedCategoryIds[previousIndex + 1]

        setSelectedId(newSelectedId ?? null)
      },
    })

  const { dialog: addDialog, openDialog: openAddDialog } = useTextDialog({
    onConfirm(name) {
      if (name.trim() === '') return
      dispatch(addCategory({ id: createId(), name, groups: [] }))
    },
  })

  const { dialog: renameDialog, openDialog: openRenameDialog } = useTextDialog({
    onConfirm(name) {
      if (selectedId === null) return
      dispatch(updateCategory({ id: selectedId, changes: { name } }))
    },
  })

  function handleSwap(categoryId: string, direction: SwapDirection): void {
    dispatch(swapCategories({ categoryId, direction }))
  }

  function handleAdd() {
    openAddDialog({
      title: t('settings:categories.createDialog.title'),
      inputLabel: t('settings:categories.createDialog.inputLabel'),
      value: '',
      primaryButtonLabel: t('buttons.create'),
    })
  }

  function handleRename() {
    if (selectedId === null) return
    const category = categories[selectedId]
    if (category === undefined) return

    openRenameDialog({
      title: t('settings:categories.renameDialog.title', {
        category: category.name,
      }),
      inputLabel: t('settings:categories.renameDialog.inputLabel'),
      primaryButtonLabel: t('buttons.rename'),
      value: category.name,
    })
  }

  function handleDelete() {
    if (selectedId === null) return
    const category = categories[selectedId]
    if (category === undefined) return

    openDeleteDialog({
      title: t('settings:categories.deleteDialog.title'),
      message: t('settings:categories.deleteDialog.message', {
        category: category.name,
      }),
      confirmButtonLabel: t('buttons.delete'),
      confirmButtonType: 'delete',
    })
  }

  return (
    <PageContent
      title={t('settings:categories.title')}
      titleIcon={<TagIcon />}
      titleIconType="outline"
      titleIconColor={databaseSettings.categories.iconColor}
      centered
    >
      {addDialog}
      {renameDialog}
      {deleteDialog}

      <div className="mb-4">
        <p>{t('settings:categories.description')}</p>
      </div>

      <Headline>{t('settings:categories.manageCategories')}</Headline>

      <div className="flex flex-col">
        <SortableList
          ids={orderedCategoryIds}
          selectedId={selectedId}
          onSelectedIdChange={setSelectedId}
          onSwap={handleSwap}
          additionalButtons={
            <>
              <Button type="default" icon={<PlusIcon />} onClick={handleAdd}>
                {t('buttons.new')}
              </Button>

              <Button
                type="default"
                icon={<PencilIcon />}
                disabled={selectedId === null}
                onClick={handleRename}
              >
                {t('buttons.rename')}
              </Button>

              <Button
                type="delete"
                icon={<TrashIcon />}
                disabled={selectedId === null}
                onClick={handleDelete}
              >
                {t('buttons.delete')}
              </Button>
            </>
          }
        >
          {(id) => (
            <div className="flex">
              <div className="flex-1">{categories[id]?.name}</div>
            </div>
          )}
        </SortableList>
      </div>
    </PageContent>
  )
}

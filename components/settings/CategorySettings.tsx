import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/solid'
import React, { FC, FormEvent, useState } from 'react'
import { useAppDispatch } from '../../redux'
import {
  addCategory,
  Category,
  removeCategory,
  updateCategory
} from '../../redux/categories'
import { swapCategories } from '../../redux/settings'
import { createId } from '../../utils/customNanoId'
import { useOrderedCategories } from '../categories/useOrderedCategories'
import { Button } from '../ui/Button'
import { Headline } from '../ui/Headline'
import { Input } from '../ui/Input'
import { PageContent } from '../ui/PageContent'
import { SortableList, SwapDirection } from '../ui/SortableList'
import { useTextDialog } from '../ui/useTextDialog'

interface Props {}

export const CategorySettings: FC<Props> = ({}) => {
  const [selectedId, setSelectedId] = useState<Category['id'] | null>(null)
  const dispatch = useAppDispatch()
  const { categories, orderedCategoryIds } = useOrderedCategories()

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

  function handleAdd2() {
    openAddDialog({
      title: 'Neue Kategorie anlegen',
      inputLabel: 'Name',
      value: '',
      primaryButtonLabel: 'Anlegen',
    })
  }

  function handleDelete() {
    if (selectedId === null) return
    const previousIndex = orderedCategoryIds.indexOf(selectedId)
    dispatch(removeCategory(selectedId))

    const newSelectedId =
      orderedCategoryIds.length === 1
        ? null
        : previousIndex === orderedCategoryIds.length - 1
        ? orderedCategoryIds[orderedCategoryIds.length - 2]
        : orderedCategoryIds[previousIndex + 1]

    setSelectedId(newSelectedId)
  }

  function handleRename() {
    if (selectedId === null) return
    const category = categories[selectedId]
    if (category === undefined) return

    openRenameDialog({
      title: `"${category.name}" umbenennen`,
      inputLabel: 'Neuer Name',
      primaryButtonLabel: 'Umbenennen',
      value: category.name,
    })
  }

  return (
    <PageContent title="Kategorien">
      {addDialog}
      {renameDialog}

      <div className="mb-4">
        <p>
          Hier können alle Kategorien konfiguriert werden. Mit Kategorien lassen
          sich Projektgruppen kategorisieren.
        </p>
      </div>

      <div>
        <Headline>Kategorien verwalten</Headline>

        <div className="flex flex-col">
          <SortableList
            ids={orderedCategoryIds}
            selectedId={selectedId}
            onSelectedIdChange={setSelectedId}
            onSwap={handleSwap}
            additionalButtons={
              <>
                <Button
                  buttonType="default"
                  icon={<PlusIcon />}
                  onClick={handleAdd2}
                >
                  Neu
                </Button>

                <Button
                  disabled={selectedId === null}
                  buttonType="default"
                  icon={<PencilIcon />}
                  onClick={handleRename}
                >
                  Umbenennen
                </Button>

                <Button
                  disabled={selectedId === null}
                  buttonType="delete"
                  icon={<TrashIcon />}
                  onClick={handleDelete}
                >
                  Löschen
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
      </div>
    </PageContent>
  )
}

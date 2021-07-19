import { TrashIcon } from '@heroicons/react/solid'
import React, { FC, useState } from 'react'
import { useAppDispatch } from '../../redux'
import { addCategory, Category, removeCategory } from '../../redux/categories'
import { swapCategories } from '../../redux/settings'
import { createId } from '../../tools/customNanoId'
import { useOrderedCategories } from '../categories/useOrderedCategories'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { PageContent } from '../ui/PageContent'
import { SortableList, SwapDirection } from '../ui/SortableList'

interface Props {}

export const CategorySettings: FC<Props> = ({}) => {
  const [newCategoryName, setNewCategoryName] = useState('')
  const [selectedId, setSelectedId] = useState<Category['id'] | null>(null)
  const dispatch = useAppDispatch()
  const { categories, orderedCategoryIds } = useOrderedCategories()

  function handleSwap(categoryId: string, direction: SwapDirection): void {
    dispatch(swapCategories({ categoryId, direction }))
  }

  function handleAdd() {
    dispatch(addCategory({ id: createId(), name: newCategoryName, groups: [] }))
    setNewCategoryName('')
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

  return (
    <PageContent title="Kategorien">
      <div className="mb-4">
        <p>
          Hier können alle Kategorien konfiguriert werden. Mit Kategorien lassen
          sich Projektgruppen kategorisieren.
        </p>
      </div>

      <div>
        <div className="text-lg font-semibold mb-4">Neue Kategorie anlegen</div>
        <div className="mb-8 flex flex-col gap-y-2">
          <Input
            label="Kategoriename"
            value={newCategoryName}
            onChange={setNewCategoryName}
          />

          <div className="flex">
            <Button buttonType="primary" onClick={handleAdd}>
              Hinzufügen
            </Button>
          </div>
        </div>

        <div className="flex flex-col">
          <SortableList
            ids={orderedCategoryIds}
            selectedId={selectedId}
            onSelectedIdChange={setSelectedId}
            onSwap={handleSwap}
            additionalButtons={
              <div className="flex gap-x-1">
                <Button
                  disabled={selectedId === null}
                  buttonType="delete"
                  icon={<TrashIcon />}
                  onClick={handleDelete}
                >
                  Löschen
                </Button>
              </div>
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

import { ArrowDownIcon, ArrowUpIcon, TrashIcon } from '@heroicons/react/solid'
import classNames from 'classnames'
import React, { FC, useState } from 'react'
import { useAppDispatch } from '../../redux'
import { Category, removeCategory } from '../../redux/categories'
import { swapCategories } from '../../redux/settings'
import { useOrderedCategories } from '../categories/useOrderedCategories'
import { Button } from '../ui/Button'
import { Heroicon } from '../ui/Heroicon'
import { Input } from '../ui/Input'
import { PageContent } from '../ui/PageContent'

interface Props {}

export const CategorySettings: FC<Props> = ({}) => {
  const [newCategoryName, setNewCategoryName] = useState('')
  const dispatch = useAppDispatch()
  const orderedCategories = useOrderedCategories()

  function handleSwapUp(categoryId: Category['id']) {
    dispatch(swapCategories({ categoryId, direction: 'down' }))
  }

  function handleSwapDown(categoryId: Category['id']) {
    dispatch(swapCategories({ categoryId, direction: 'up' }))
  }

  function handleAdd() {
    // TODO: implement me!
    setNewCategoryName('')
  }

  function handleDelete(categoryId: Category['id']) {
    dispatch(removeCategory(categoryId))
  }

  return (
    <PageContent title="Kategorien">
      <div className="mb-4">
        <p>
          Hier können alle Kategorien konfiguriert werden. Mit Kategorien lassen
          sich Projektgruppen kategorisieren.
        </p>
      </div>

      <div className="w-96">
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
          {orderedCategories.map((category, index) =>
            category !== undefined ? (
              <div
                key={category.id}
                className={classNames(
                  'flex',
                  'p-2 rounded-md',
                  'hover:bg-neutral-200',
                )}
              >
                <div className="flex-1">{category.name}</div>

                <div className="flex-0 flex gap-x-1">
                  <Button
                    buttonType="flat"
                    onClick={() => handleSwapDown(category.id)}
                    disabled={index >= orderedCategories.length - 1}
                  >
                    <Heroicon icon={<ArrowDownIcon />} />
                  </Button>

                  <Button
                    buttonType="flat"
                    onClick={() => handleSwapUp(category.id)}
                    disabled={index <= 0}
                  >
                    <Heroicon icon={<ArrowUpIcon />} />
                  </Button>

                  <Button
                    buttonType="flat"
                    onClick={() => handleDelete(category.id)}
                  >
                    <Heroicon icon={<TrashIcon />} />
                  </Button>
                </div>
              </div>
            ) : null,
          )}
        </div>
      </div>
    </PageContent>
  )
}

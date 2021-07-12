import { ArrowDownIcon, ArrowUpIcon, TrashIcon } from '@heroicons/react/solid'
import React, { FC } from 'react'
import { useAppSelector } from '../../redux'
import { Button } from '../ui/Button'
import { Heroicon } from '../ui/Heroicon'
import { Input } from '../ui/Input'
import { PageContent } from '../ui/PageContent'

interface Props {}

export const CategorySettings: FC<Props> = ({}) => {
  const categories = useAppSelector((state) => state.categories.entities)

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
          <Input label="Kategoriename" />
          <div className="flex">
            <Button buttonType="primary">Hinzufügen</Button>
          </div>
        </div>

        <div className="flex flex-col gap-y-2">
          {Object.values(categories).map((category) =>
            category !== undefined ? (
              <div key={category.id} className="flex">
                <div className="flex-1">{category.name}</div>

                <div className="flex-0 flex gap-x-1">
                  <div className="p-1">
                    <Heroicon icon={<ArrowDownIcon />} />
                  </div>
                  <div className="p-1">
                    <Heroicon icon={<ArrowUpIcon />} />
                  </div>
                  <div className="p-1">
                    <Heroicon icon={<TrashIcon />} />
                  </div>
                </div>
              </div>
            ) : null,
          )}
        </div>
      </div>
    </PageContent>
  )
}

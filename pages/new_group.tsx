import { SaveIcon } from '@heroicons/react/solid'
import router from 'next/router'
import React, { ChangeEvent, FormEvent, ReactElement, useState } from 'react'
import slugify from 'slugify'
import { Layout } from '../components/app/Layout'
import { GroupList } from '../components/groups/GroupList'
import { Input } from '../components/ui/Input'
import { ToolbarContainer } from '../components/ui/ToolbarContainer'
import { useAppDispatch, useAppSelector } from '../redux'
import { addGroupToCategory, Category } from '../redux/categories'
import { selectIsFileOpen } from '../redux/database'
import { addGroup, ProjectGroup } from '../redux/groups'

export default function NewGroup(): ReactElement | null {
  const dispatch = useAppDispatch()
  const isFileOpen = useAppSelector(selectIsFileOpen)
  const categories = useAppSelector((state) => state.categories.entities)
  const groupIds = useAppSelector((state) => state.groups.ids)
  const [groupId, setGroupId] = useState('')
  const [groupName, setGroupName] = useState('')
  const [color, setColor] = useState('')
  const [category, setCategory] = useState<Category['id'] | null>(null)

  function createUniqueGroupId(baseId: string): string {
    if (!groupIds.includes(baseId)) return baseId

    let counter = 0
    let newId = ''

    while (true) {
      counter += 1
      newId = `${baseId}-${counter}`
      if (!groupIds.includes(newId)) break
    }

    return newId
  }

  function saveGroup() {
    const newGroup: ProjectGroup = {
      id: createUniqueGroupId(groupId),
      name: groupName,
      color,
      notes: '',
      projects: [],
    }

    dispatch(addGroup(newGroup))

    if (category !== null) {
      dispatch(addGroupToCategory({ category, group: newGroup.id }))
    }

    router.push(`/groups/${newGroup.id}`)
  }

  function handleGroupNameChange(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value
    setGroupName(value)
    setGroupId(slugify(value))
  }

  function handleColorChange(event:ChangeEvent<HTMLInputElement>) {
    setColor(event.target.value)
  }

  function handleCategoryChange(event: ChangeEvent<HTMLSelectElement>) {
    setCategory(event.target.value)
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    saveGroup()
  }

  return (
    <Layout left={isFileOpen ? <GroupList /> : null}>
      <ToolbarContainer
        toolbarItems={[
          {
            type: 'button',
            buttonType: 'primary',
            label: 'Speichern',
            icon: <SaveIcon />,
            action: saveGroup,
          },
        ]}
      >
        <div className="p-4">
          <div className="mb-8 font-semibold text-xl">
            Neue Gruppe erstellen
          </div>
          <form onSubmit={handleSubmit} className="w-96 flex flex-col gap-y-4">
            <Input label="Gruppenname" onChange={handleGroupNameChange} />

            <div className="flex flex-col">
              <label htmlFor="color">Farbe</label>
              <input type="color" id="color" onChange={handleColorChange} />
            </div>

            <div className="flex flex-col">
              <label htmlFor="cat">Kategorie</label>
              <select onChange={handleCategoryChange} id="cat">
                <option value="">[Unkategorisiert]</option>
                {Object.values(categories).map((category) =>
                  category !== undefined ? (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ) : null,
                )}
              </select>
            </div>
          </form>
        </div>
      </ToolbarContainer>
    </Layout>
  )
}

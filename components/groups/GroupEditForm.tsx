import { FolderAddIcon, FolderIcon, SaveIcon } from '@heroicons/react/solid'
import router from 'next/router'
import React, { ChangeEvent, FC, FormEvent, useMemo, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux'
import { addGroupToCategory, Category } from '../../redux/categories'
import { selectIsFileOpen } from '../../redux/database'
import { addGroup, ProjectGroup, updateGroup } from '../../redux/groups'
import { createId } from '../../tools/customNanoId'
import { Layout } from '../app/Layout'
import { useCategoryFromGroup } from '../category/useCategoryFromGroup'
import { Input } from '../ui/Input'
import { PageContent } from '../ui/PageContent'
import { ToolbarContainer } from '../ui/ToolbarContainer'
import { GroupList } from './GroupList'

interface Props {
  init?: ProjectGroup | null
}

export const GroupEditForm: FC<Props> = ({ init = null }) => {
  const dispatch = useAppDispatch()
  const isFileOpen = useAppSelector(selectIsFileOpen)
  const categories = useAppSelector((state) => state.categories.entities)

  const { categoryId: categoryIdFromGroup } = useCategoryFromGroup(init)

  const [groupName, setGroupName] = useState(init?.name ?? '')
  const [color, setColor] = useState(init?.color ?? '')
  const [categoryId, setCategoryId] = useState<Category['id'] | null>(
    categoryIdFromGroup,
  )

  const isEditForm = useMemo(() => {
    return init !== null
  }, [init])

  function saveGroup() {
    const newGroup: ProjectGroup = {
      id: createId(),
      name: groupName,
      color,
      notes: '',
      projects: [],
    }

    dispatch(addGroup(newGroup))

    if (categoryId !== null) {
      dispatch(addGroupToCategory({ categoryId: categoryId, groupId: newGroup.id }))
    }

    router.push(`/groups/${newGroup.id}`)
  }

  function editGroup() {
    if (init === null) return

    const updatedGroup: ProjectGroup = {
      id: init.id,
      name: groupName,
      color,
      notes: '',
      projects: init.projects,
    }

    updateGroup(updatedGroup, categoryId)

    router.push(`/groups/${updatedGroup.id}`)
  }

  function handleGroupNameChange(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value
    setGroupName(value)
  }

  function handleColorChange(event: ChangeEvent<HTMLInputElement>) {
    setColor(event.target.value)
  }

  function handleCategoryChange(event: ChangeEvent<HTMLSelectElement>) {
    setCategoryId(event.target.value)
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    isEditForm ? editGroup() : saveGroup()
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
            action: isEditForm ? editGroup : saveGroup,
          },
        ]}
      >
        <PageContent
          title={isEditForm ? 'Gruppe bearbeiten' : 'Neue Gruppe erstellen'}
          titleIcon={isEditForm ? <FolderIcon /> : <FolderAddIcon />}
          titleIconColor={color}
        >
          <form onSubmit={handleSubmit} className="w-96 flex flex-col gap-y-4">
            <Input
              label="Gruppenname"
              onChange={handleGroupNameChange}
              value={groupName}
            />

            <div className="flex flex-col">
              <label htmlFor="color">Farbe</label>
              <input
                type="color"
                id="color"
                onChange={handleColorChange}
                value={color}
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="cat">Kategorie</label>
              <select
                onChange={handleCategoryChange}
                id="cat"
                value={categoryId ?? ''}
              >
                <option value="">[ Unsortiert ]</option>
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
        </PageContent>
      </ToolbarContainer>
    </Layout>
  )
}

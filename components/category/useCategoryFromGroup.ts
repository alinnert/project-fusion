import { useMemo } from 'react'
import { useAppSelector } from '../../redux'
import { Category } from '../../redux/categories'
import { ProjectGroup } from '../../redux/groups'

export function useCategoryFromGroup(group: ProjectGroup | null): {
  category: Category | null
  categoryId: Category['id'] | null
} {
  const categories = useAppSelector((state) => state.categories.entities)

  const categoryFromGroup = useMemo(() => {
    if (group === null) return null
    return (
      Object.values(categories).find((currentCategory) => {
        if (currentCategory === undefined) return false
        return currentCategory.groups.includes(group.id)
      }) ?? null
    )
  }, [categories, group])

  return {
    category: categoryFromGroup,
    categoryId: categoryFromGroup?.['id'] ?? null,
  }
}

import { useMemo } from 'react'
import { useAppSelector } from '../../redux'
import { Category } from '../../redux/categories'
import { resolveIds } from '../../tools/resolveIds'

export function useOrderedCategories(): Category[] {
  const orderedCategoryIds = useAppSelector(
    (state) => state.settings.categoryOrder,
  )

  const categories = useAppSelector((state) => state.categories.entities)

  const orderedCategories = useMemo(() => {
    return resolveIds(orderedCategoryIds, categories)
  }, [categories, orderedCategoryIds])

  return orderedCategories
}

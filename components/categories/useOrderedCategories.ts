import { Dictionary } from '@reduxjs/toolkit'
import { useMemo } from 'react'
import { useAppSelector } from '../../redux'
import { Category } from '../../redux/categories'
import { resolveIds } from '../../tools/resolveIds'

interface UseOrderedCategoriesResult {
  orderedCategories: Category[]
  orderedCategoryIds: Array<Category['id']>
  categories: Dictionary<Category>
}

export function useOrderedCategories(): UseOrderedCategoriesResult {
  const orderedCategoryIds = useAppSelector(
    (state) => state.settings.categoryOrder,
  )

  const categories = useAppSelector((state) => state.categories.entities)

  const orderedCategories = useMemo(() => {
    return resolveIds(orderedCategoryIds, categories)
  }, [categories, orderedCategoryIds])

  return { orderedCategoryIds, orderedCategories, categories }
}

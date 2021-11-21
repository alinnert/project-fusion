import React, { FC, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'

export const Search: FC = () => {
  const [searchParams] = useSearchParams()

  const searchTerm = useMemo((): string => {
    const searchTerm = searchParams.get('common:searchTerm')
    return (Array.isArray(searchTerm) ? searchTerm[0] : searchTerm) ?? ''
  }, [searchParams])

  return <div>Search term: {searchTerm}</div>
}

import { SearchIcon } from '@heroicons/react/solid'
import React, { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'
import { translationNamespaces } from '../../utils/i18next-namespaces'
import { Button } from './Button'
import { Form } from './Form'
import { Input } from './Input'

export const HeaderSearch: FC = ({}) => {
  const { t } = useTranslation(translationNamespaces)
  const navigate = useNavigate()

  const [searchTerm, setSearchTerm] = useState('')

  function handleSearch() {
    if (searchTerm.trim() === '') return
    navigate(`/search/${searchTerm}`)
  }

  return (
    <Form type="inline" onSubmit={handleSearch}>
      <Input
        placeholder={t('header.search.inputPlaceholder')}
        inputType="header"
        value={searchTerm}
        onChange={setSearchTerm}
      />

      <Button
        type="header"
        icon={<SearchIcon />}
        disabled={searchTerm.trim() === ''}
      />
    </Form>
  )
}

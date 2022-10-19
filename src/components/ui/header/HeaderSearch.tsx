import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import React, { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router'
import { translationNamespaces } from '../../../utils/i18next-namespaces'
import { Button } from '../forms/Button'
import { Form } from '../forms/Form'
import { Input } from '../forms/Input'

export const HeaderSearch: FC = ({}) => {
  const { t } = useTranslation(translationNamespaces)
  const navigate = useNavigate()
  const { searchTerm: urlSearchTerm } = useParams()

  const [searchTerm, setSearchTerm] = useState<string>(urlSearchTerm ?? '')

  function handleSearch() {
    if (searchTerm.trim() === '') return
    navigate(`/search/${searchTerm}`)
  }

  return (
    <Form type="inline" onSubmit={handleSearch}>
      <Input
        placeholder={t('common:header.search.inputPlaceholder')}
        inputType="header"
        value={searchTerm}
        onChange={setSearchTerm}
      />

      <Button
        type="header"
        icon={<MagnifyingGlassIcon />}
        disabled={searchTerm.trim() === ''}
      />
    </Form>
  )
}

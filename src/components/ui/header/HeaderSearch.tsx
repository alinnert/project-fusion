import { MagnifyingGlassIcon } from '@heroicons/react/16/solid'
import React, { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router'
import { Button } from '../forms/Button'
import { Form } from '../forms/Form'
import { Input } from '../forms/Input'

export const HeaderSearch: FC = ({}) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { searchTerm: urlSearchTerm } = useParams()

  const [searchTerm, setSearchTerm] = useState<string>(urlSearchTerm ?? '')

  function handleSearch() {
    if (searchTerm.trim() === '') return
    navigate(`/search/${searchTerm}`)
  }

  return (
    <Form type="inline" onSubmit={handleSearch} className="no-drag">
      <Input
        placeholder={t('common:header.search.inputPlaceholder') ?? undefined}
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

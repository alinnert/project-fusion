import { SearchIcon } from '@heroicons/react/solid'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import React, { FC, FormEvent, useState } from 'react'
import { tailwindConfig, useBreakpoint } from '../../utils/tailwindConfig'
import { Button } from './Button'
import { Form } from './Form'
import { Input } from './Input'

interface Props {}

export const HeaderSearch: FC<Props> = ({}) => {
  const { t } = useTranslation()
  const isXlScreen = useBreakpoint(tailwindConfig.theme.screens?.xl)
  const router = useRouter()

  const [searchTerm, setSearchTerm] = useState('')

  function handleSearch() {
    if (searchTerm.trim() === '') return
    router.push({ pathname: '/search/[searchTerm]', query: { searchTerm } })
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
      >
        {isXlScreen ? <span>{t('header.search.button')}</span> : null}
      </Button>
    </Form>
  )
}

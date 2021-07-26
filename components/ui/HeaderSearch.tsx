import { SearchIcon } from '@heroicons/react/solid'
import { useTranslation } from 'next-i18next'
import React, { FC } from 'react'
import { Button } from './Button'
import { Input } from './Input'

interface Props {}

export const HeaderSearch: FC<Props> = ({}) => {
  const {t } = useTranslation()
  
  return (
    <>
      <Input
        placeholder={t('header.search.inputPlaceholder')}
        inputType="header"
        className="ml-2"
      />
      <Button buttonType="header" icon={<SearchIcon />}>
        {t('header.search.button')}
      </Button>
    </>
  )
}

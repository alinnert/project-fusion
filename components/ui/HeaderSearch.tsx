import { SearchIcon } from '@heroicons/react/solid'
import { useTranslation } from 'next-i18next'
import React, { FC } from 'react'
import { tailwindConfig, useBreakpoint } from '../../utils/tailwindConfig'
import { Button } from './Button'
import { Input } from './Input'

interface Props {}

export const HeaderSearch: FC<Props> = ({}) => {
  const { t } = useTranslation()
  const isXlScreen = useBreakpoint(tailwindConfig.theme.screens?.xl)

  return (
    <div className="flex gap-x-2 items-center">
      <Input
        placeholder={t('header.search.inputPlaceholder')}
        inputType="header"
      />

      <Button type="header" icon={<SearchIcon />}>
        {isXlScreen ? <span>{t('header.search.button')}</span> : null}
      </Button>
    </div>
  )
}

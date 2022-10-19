import { Cog6ToothIcon } from '@heroicons/react/24/outline'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { EmptyText } from '../../components/ui/EmptyText'
import { translationNamespaces } from '../../utils/i18next-namespaces'

export const Config: FC = () => {
  const { t } = useTranslation(translationNamespaces)

  return (
    <EmptyText title={t('settings:index.title')} icon={<Cog6ToothIcon />}>
      {t('settings:index.body')}
    </EmptyText>
  )
}

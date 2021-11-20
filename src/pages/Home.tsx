import { SparklesIcon } from '@heroicons/react/outline'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { LanguageSelect } from '../components/settings/LanguageSelect'
import { EmptyText } from '../components/ui/EmptyText'
import { translationNamespaces } from '../utils/i18next-namespaces'

export const Home: FC = () => {
  const { t } = useTranslation(translationNamespaces)

  return (
    <EmptyText title={t('welcome:noFileOpen.title')} icon={<SparklesIcon />}>
      <p>{t('welcome:noFileOpen.body')}</p>

      <div className="text-left mt-8">
        <LanguageSelect />
      </div>
    </EmptyText>
  )
}

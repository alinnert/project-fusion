import { SparklesIcon } from '@heroicons/react/outline'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { LanguageSelect } from '../components/settings/LanguageSelect'
import { Alert } from '../components/ui/Alert'
import { EmptyText } from '../components/ui/EmptyText'
import { useFeatureCheck } from '../utils/featureCheck'
import { translationNamespaces } from '../utils/i18next-namespaces'

export const Home: FC = () => {
  const { t } = useTranslation(translationNamespaces)

  const featureOk = useFeatureCheck()

  return (
    <EmptyText title={t('welcome:noFileOpen.title')} icon={<SparklesIcon />}>
      <p>{t('welcome:noFileOpen.body')}</p>

      {!featureOk ? (
        <Alert>{t('common:alerts.apiRequirementsNotMet')}</Alert>
      ) : null}

      <div className="text-left">
        <LanguageSelect />
      </div>
    </EmptyText>
  )
}

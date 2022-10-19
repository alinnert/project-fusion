import { DocumentPlusIcon, FolderIcon } from '@heroicons/react/20/solid'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useCreateDatabase } from '../components/dataFile/useCreateDatabase'
import { useOpenDatabase } from '../components/dataFile/useOpenDatabase'
import { LanguageSelect } from '../components/settings/LanguageSelect'
import { Alert } from '../components/ui/Alert'
import { EmptyText } from '../components/ui/EmptyText'
import { Button } from '../components/ui/forms/Button'
import { useFeatureCheck } from '../utils/featureCheck'
import { translationNamespaces } from '../utils/i18next-namespaces'

export const Home: FC = () => {
  const { t } = useTranslation(translationNamespaces)

  const featureOk = useFeatureCheck()
  const handleCreateDatabaseClick = useCreateDatabase()
  const handleOpenDatabaseClick = useOpenDatabase()

  return (
    <EmptyText
      image={{
        src: '/icon-gradient.svg',
        alt: 'Project Fusion Logo',
        width: '100',
        height: '100',
      }}
      title={t('welcome:noFileOpen.title')}
    >
      <p>{t('welcome:noFileOpen.body')}</p>

      {!featureOk ? (
        <Alert>{t('common:alerts.apiRequirementsNotMet')}</Alert>
      ) : null}

      {featureOk ? (
        <div className="flex justify-center gap-x-2">
          <Button
            icon={<DocumentPlusIcon />}
            onClick={handleCreateDatabaseClick}
          >
            {t('common:header.menu.database.items.create')}
          </Button>

          <Button icon={<FolderIcon />} onClick={handleOpenDatabaseClick}>
            {t('common:header.menu.database.items.open')}
          </Button>
        </div>
      ) : null}

      <LanguageSelect />
    </EmptyText>
  )
}

import { LightBulbIcon } from '@heroicons/react/outline'
import { DocumentAddIcon, FolderIcon } from '@heroicons/react/solid'
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
    <EmptyText title={t('welcome:noFileOpen.title')} icon={<LightBulbIcon />}>
      <p>{t('welcome:noFileOpen.body')}</p>

      {!featureOk ? (
        <Alert>{t('common:alerts.apiRequirementsNotMet')}</Alert>
      ) : null}

      <div className="flex justify-center gap-x-2">
        <Button icon={<DocumentAddIcon />} onClick={handleCreateDatabaseClick}>
          {t('common:header.menu.database.items.create')}
        </Button>

        <Button icon={<FolderIcon />} onClick={handleOpenDatabaseClick}>
          {t('common:header.menu.database.items.open')}
        </Button>
      </div>

      <LanguageSelect />
    </EmptyText>
  )
}

import {
  DocumentPlusIcon,
  FolderIcon,
  XMarkIcon,
} from '@heroicons/react/20/solid'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useCloseDatabase } from '../components/dataFile/useCloseDatabase'
import { useCreateDatabase } from '../components/dataFile/useCreateDatabase'
import { useOpenDatabase } from '../components/dataFile/useOpenDatabase'
import { Alert } from '../components/ui/Alert'
import { Button } from '../components/ui/forms/Button'
import { selectIsFileOpen } from '../redux/database'
import { useFeatureCheck } from '../utils/featureCheck'

export const File: FC = () => {
  const { t } = useTranslation()

  const isFileOpen = useSelector(selectIsFileOpen)
  const featureOk = useFeatureCheck()
  const handleCreateDatabaseClick = useCreateDatabase()
  const handleOpenDatabaseClick = useOpenDatabase()
  const handleCloseDatabaseClick = useCloseDatabase()

  return (
    <div className="flex justify-center">
      <div className="mt-12 w-[600px]">
        {!featureOk ? (
          <Alert>{t('common:alerts.apiRequirementsNotMet')}</Alert>
        ) : (
          <div className="flex gap-x-2">
            <Button
              icon={<DocumentPlusIcon />}
              onClick={handleCreateDatabaseClick}
            >
              {t('common:header.menu.database.items.create')}
            </Button>

            <Button icon={<FolderIcon />} onClick={handleOpenDatabaseClick}>
              {t('common:header.menu.database.items.open')}
            </Button>

            {isFileOpen ? (
              <Button icon={<XMarkIcon />} onClick={handleCloseDatabaseClick}>
                {t('common:header.menu.database.items.close')}
              </Button>
            ) : null}
          </div>
        )}
      </div>
    </div>
  )
}

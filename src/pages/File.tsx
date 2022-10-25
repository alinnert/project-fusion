import {
  CircleStackIcon,
  DocumentPlusIcon,
  FolderIcon,
  XMarkIcon,
} from '@heroicons/react/20/solid'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Alert } from '../components/ui/Alert'
import { ContentSection } from '../components/ui/ContentSection'
import { EntryListItem } from '../components/ui/EntryListItem'
import { Button } from '../components/ui/forms/Button'
import { useCloseDatabase } from '../hooks/database/useCloseDatabase'
import { useCreateDatabase } from '../hooks/database/useCreateDatabase'
import { useOpenDatabase } from '../hooks/database/useOpenDatabase'
import { useReadDatabaseFile } from '../hooks/database/useReadDatabaseFile'
import { useRecentFiles } from '../hooks/database/useRecentFiles'
import { useAppSelector } from '../redux'
import { selectIsFileOpen } from '../redux/database'
import { useFeatureOk } from '../utils/featureOk'

export const File: FC = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const isFileOpen = useSelector(selectIsFileOpen)
  const currentFileName = useAppSelector((state) => state.database.filename)
  const featureOk = useFeatureOk()
  const [recentFiles, { clearRecentFiles, removeFromRecentFiles }] =
    useRecentFiles()
  const handleCreateDatabaseClick = useCreateDatabase()
  const handleOpenDatabaseClick = useOpenDatabase()
  const readDatabaseFile = useReadDatabaseFile()
  const handleCloseDatabaseClick = useCloseDatabase()

  function handleShowContentClick(): void {
    navigate('/groups')
  }

  return (
    <div className="flex justify-center self-stretch overflow-y-auto h-full">
      <div className="w-[600px]">
        {!featureOk ? (
          <Alert>{t('common:alerts.apiRequirementsNotMet')}</Alert>
        ) : (
          <div className="py-12">
            <div className="flex gap-x-2">
              <Button
                icon={<DocumentPlusIcon />}
                onClick={handleCreateDatabaseClick}
              >
                {t('common:buttons.create')}
              </Button>

              <Button icon={<FolderIcon />} onClick={handleOpenDatabaseClick}>
                {t('common:buttons.open')}
              </Button>
            </div>

            {isFileOpen ? (
              <ContentSection title={t('common:filePage.currentFile.title')}>
                <div className="flex items-center">
                  <div className="font-bold">{currentFileName}</div>

                  <div className="ml-auto flex items-center gap-x-2">
                    <Button
                      icon={<CircleStackIcon />}
                      onClick={handleShowContentClick}
                    >
                      {t('common:filePage.currentFile.showContent')}
                    </Button>

                    <Button
                      icon={<XMarkIcon />}
                      onClick={handleCloseDatabaseClick}
                    >
                      {t('common:buttons.close')}
                    </Button>
                  </div>
                </div>
              </ContentSection>
            ) : null}

            {recentFiles.length > 0 ? (
              <ContentSection title={t('common:filePage.recentFiles.title')}>
                <div className="my-2">
                  {recentFiles.map((handle) => (
                    <EntryListItem
                      key={handle.name}
                      label={handle.name}
                      onClick={() => readDatabaseFile(handle)}
                      buttons={[
                        {
                          icon: <XMarkIcon />,
                          onClick() {
                            removeFromRecentFiles(handle)
                          },
                        },
                      ]}
                    />
                  ))}
                </div>

                <div className="flex items-center">
                  <div className="ml-auto">
                    <Button
                      onClick={clearRecentFiles}
                      icon={<XMarkIcon />}
                      type="delete"
                    >
                      {t('common:buttons.clear')}
                    </Button>
                  </div>
                </div>
              </ContentSection>
            ) : null}
          </div>
        )}
      </div>
    </div>
  )
}

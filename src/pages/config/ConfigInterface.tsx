import { TemplateIcon } from '@heroicons/react/outline'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { LanguageSelect } from '../../components/settings/LanguageSelect'
import { useSettings } from '../../components/settings/useSettings'
import { PageContent } from '../../components/ui/PageContent'
import { translationNamespaces } from '../../utils/i18next-namespaces'

export const ConfigInterface: FC = ({}) => {
  const { t } = useTranslation(translationNamespaces)

  const { applicationSettings } = useSettings()

  return (
    <PageContent
      title={t('settings:interface.title')}
      icon={<TemplateIcon />}
      iconType="outline"
      iconColor={applicationSettings.interface.iconColor}
      centered
    >
      <p>{t('settings:interface.description')}</p>

      <LanguageSelect />
    </PageContent>
  )
}

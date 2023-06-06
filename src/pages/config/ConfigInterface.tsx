import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { LanguageSelect } from '../../components/settings/LanguageSelect'
import { useSettings } from '../../components/settings/useSettings'
import { Headline } from '../../components/ui/Headline'
import { PageContent } from '../../components/ui/PageContent'
import { ToolbarContainer } from '../../components/ui/toolbar/ToolbarContainer'

export const ConfigInterface: FC = ({}) => {
  const { t } = useTranslation()

  const { applicationSettings } = useSettings()

  return (
    <ToolbarContainer
      title={t('settings:interface.title') ?? undefined}
      icon={{
        element: applicationSettings.interface.icon,
        color: applicationSettings.interface.iconColor,
      }}
      toolbarPadding="lg"
    >
      <PageContent centered>
        <p>{t('settings:interface.description')}</p>
        <Headline>{t('settings:interface.commonSettings')}</Headline>
        <LanguageSelect />
      </PageContent>
    </ToolbarContainer>
  )
}

import { CheckIcon, TranslateIcon } from '@heroicons/react/solid'
import React, { FC, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { languages } from '../../i18n/i18next'
import { DropdownMenu, MenuItem } from '../ui/DropdownMenu'
import { PlaceholderIcon } from '../ui/PlaceholderIcon'

interface Props {}

export const LanguageChooser: FC<Props> = ({}) => {
  const { t, i18n } = useTranslation()

  const currentLanguageKey = useMemo(() => i18n.language, [i18n.language])

  const menuItems = useMemo<Array<MenuItem>>(() => {
    if (currentLanguageKey === null) return []
    return Object.entries(languages).map(([languageKey, language]) => ({
      label: language.nativeLanguage,
      icon:
        currentLanguageKey === languageKey ? (
          <CheckIcon />
        ) : (
          <PlaceholderIcon />
        ),
      action() {
        i18n.changeLanguage(languageKey)
      },
    }))
  }, [currentLanguageKey, i18n])

  return (
    <DropdownMenu
      icon={<TranslateIcon />}
      items={menuItems}
      buttonType="header"
      align="right"
    >
      {currentLanguageKey === 'en'
        ? t('common.language')
        : `${t('common.language')} / Language`}
    </DropdownMenu>
  )
}

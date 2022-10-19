import { CheckIcon, LanguageIcon } from '@heroicons/react/20/solid'
import React, { FC, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { languages } from '../../utils/languages'
import { DropdownMenu } from '../ui/dropdownMenu/DropdownMenu'
import { DropdownMenuItemButton } from '../ui/dropdownMenu/DropdownMenuButton'
import { PlaceholderIcon } from '../ui/PlaceholderIcon'

export const HeaderLanguageChooser: FC = ({}) => {
  const { t, i18n } = useTranslation()
  const currentLanguageKey = useMemo(() => i18n.language, [i18n.language])

  const menuItems = useMemo<Array<DropdownMenuItemButton>>(() => {
    if (currentLanguageKey === null) return []

    return Object.entries(languages).map(
      ([languageKey, language]): DropdownMenuItemButton => {
        const isCurrentLanguage = currentLanguageKey === languageKey

        return {
          type: 'button',
          label: language.nativeLanguage,
          icon: isCurrentLanguage ? <CheckIcon /> : <PlaceholderIcon />,
          action() {
            i18n.changeLanguage(languageKey)
          },
        }
      },
    )
  }, [currentLanguageKey, i18n])

  return (
    <DropdownMenu
      icon={<LanguageIcon />}
      items={menuItems}
      buttonType="header"
      align="right"
      secondaryLabel={
        languages[currentLanguageKey as keyof typeof languages]?.nativeLanguage
      }
    >
      {currentLanguageKey === 'en'
        ? t('common:language')
        : `${t('common:terms.language')}/Language`}
    </DropdownMenu>
  )
}

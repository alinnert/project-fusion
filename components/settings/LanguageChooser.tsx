import { CheckIcon, TranslateIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/router'
import React, { FC, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { translationNamespaces } from '../../utils/i18next-namespaces'
import { languages } from '../../utils/languages'
import { tailwindConfig, useBreakpoint } from '../../utils/tailwindConfig'
import { DropdownMenu } from '../ui/DropdownMenu'
import { DropdownMenuItemButton } from '../ui/DropdownMenuButton'
import { PlaceholderIcon } from '../ui/PlaceholderIcon'

interface Props {}

export const LanguageChooser: FC<Props> = ({}) => {
  const { t, i18n } = useTranslation(translationNamespaces)
  const router = useRouter()
  const isXlScreen = useBreakpoint(tailwindConfig.theme.screens?.xl)

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
      icon={<TranslateIcon />}
      items={menuItems}
      buttonType="header"
      align="right"
      secondaryLabel={
        languages[currentLanguageKey as keyof typeof languages]?.nativeLanguage
      }
    >
      {isXlScreen
        ? currentLanguageKey === 'en'
          ? t('language')
          : `${t('terms.language')}/Language`
        : null}
    </DropdownMenu>
  )
}

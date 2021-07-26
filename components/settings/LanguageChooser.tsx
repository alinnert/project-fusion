import { CheckIcon, TranslateIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/router'
import React, { FC, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { languages } from '../../utils/languages'
import { DropdownMenu, MenuItem } from '../ui/DropdownMenu'
import { PlaceholderIcon } from '../ui/PlaceholderIcon'

interface Props {}

export const LanguageChooser: FC<Props> = ({}) => {
  const { t, i18n } = useTranslation()
  const router = useRouter()

  const currentLanguageKey = useMemo(() => i18n.language, [i18n.language])

  const menuItems = useMemo<Array<MenuItem>>(() => {
    if (currentLanguageKey === null) return []

    return Object.entries(languages).map(([languageKey, language]) => {
      const isCurrentLanguage = currentLanguageKey === languageKey

      return {
        label: language.nativeLanguage,
        icon: isCurrentLanguage ? <CheckIcon /> : <PlaceholderIcon />,
        action() {
          router.push(router.asPath, undefined, { locale: languageKey })
        },
      }
    })
  }, [currentLanguageKey, router])

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

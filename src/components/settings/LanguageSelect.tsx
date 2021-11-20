import React, { FC, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { translationNamespaces } from '../../utils/i18next-namespaces'
import { languages } from '../../utils/languages'
import { Select, SelectItem } from '../ui/Select'

export const LanguageSelect: FC = ({}) => {
  const { t, i18n } = useTranslation(translationNamespaces)

  const [value, setValue] = useState(i18n.language)

  const items = useMemo<SelectItem[]>(() => {
    return Object.entries(languages).map(([languageId, language]) => ({
      value: languageId,
      label: language.nativeLanguage,
    }))
  }, [])

  function handleLanguageChange(languageKey: string | null): void {
    if (languageKey === null) return
    setValue(languageKey)
    i18n.changeLanguage(languageKey)
  }

  return (
    <Select
      items={items}
      label={t('common:terms.language')}
      value={value}
      onChange={handleLanguageChange}
    />
  )
}
